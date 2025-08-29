"use client";


import "@/app/css/globals.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import InputFloating from "./inputFoloating";

const listPertanyaan = [
  "Apa hal utama yang ingin Anda diskusikan bersama kami?",
  "Apakah diskusi ini berkaitan dengan project yang sedang berjalan atau inisiatif baru?",
  "Apa ide atau gagasan yang ingin Anda eksplorasi lebih lanjut?",
  "Masalah atau tantangan apa yang sedang Anda hadapi saat ini?",
  "Apa tujuan utama yang ingin Anda capai dari diskusi ini?",
  "Apakah ada hasil spesifik yang Anda harapkan setelah diskusi ini? (contoh: arahan strategi, solusi kreatif, masukan teknis, dsb)",
  "Apakah ada informasi pendukung yang perlu kami ketahui terlebih dahulu sebelum diskusi dimulai?",
  "Siapa saja pihak dari tim Anda yang akan terlibat dalam diskusi ini?",
  "Apakah diskusi ini berkaitan dengan tenggat waktu atau momen penting tertentu?",
  "Apakah Anda memiliki batasan atau preferensi tertentu yang perlu kami perhatikan selama proses diskusi?",
];

const FormDiskusi = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
    businessName: "",
  });

  const [popupMessage, setPopupMessage] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [currentQnaStep, setCurrentQnaStep] = useState(0);
  const [qnaAnswers, setQnaAnswers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [validateMessage, setValidateMessage] = useState("");
  const [qnaCompleted, setQnaCompleted] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const startShowBriefAssistant = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      setValidateMessage("Lengkapi terlebih dahulu form diatas!");
      setTimeout(() => setValidateMessage(""), 2000);
    } else {
      setShowChatbot(true);
      setCurrentQnaStep(0);
      setQnaAnswers([]);
      setQnaCompleted(false);
      setInputValue("");
    }
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditValue(qnaAnswers[index].answer);
    setInputValue("");
  };

  const saveEdit = () => {
    if (editValue.trim() === "") {
      setValidateMessage("Jawaban tidak boleh kosong!");
      setTimeout(() => setValidateMessage(""), 2000);
      return;
    }

    const updatedAnswers = [...qnaAnswers];
    updatedAnswers[editingIndex] = {
      ...updatedAnswers[editingIndex],
      answer: editValue,
    };
    setQnaAnswers(updatedAnswers);
    setEditingIndex(null);
    setEditValue("");
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditValue("");
  };

  const handleAnswerSubmit = async () => {
    if (isProcessing) return;

    if (inputValue.trim() === "") {
      setValidateMessage("Jawaban tidak boleh kosong!");
      setTimeout(() => setValidateMessage(""), 2000);
      return;
    }

    if (editingIndex !== null) {
      saveEdit();
      return;
    }

    let answer = inputValue;

    const newAnswers = [
      ...qnaAnswers,
      {
        type: "diskusi",
        question: listPertanyaan[currentQnaStep],
        answer,
      },
    ];

    setQnaAnswers(newAnswers);
    setInputValue("");

    // If last question, process the answers
    if (currentQnaStep === listPertanyaan.length - 1) {
      setIsProcessing(true);
      setShowChatbot(false);

      try {
        const response = await fetch("/api/modelAI/formAssistant", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answers: newAnswers,
            metadata: {
              name: formData.name,
              email: formData.email,
            },
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        setFormData((prev) => ({
          ...prev,
          description:
            result?.data?.analysis ||
            newAnswers
              .map((item) => `Q: ${item.question}\nA: ${item.answer}`)
              .join("\n\n"),
        }));

        setQnaCompleted(true);
      } catch (error) {
        console.error("Error processing answers:", error);

        setFormData((prev) => ({
          ...prev,
          description: newAnswers
            .map((item) => `Q: ${item.question}\nA: ${item.answer}`)
            .join("\n\n"),
        }));
        setQnaCompleted(true);
      } finally {
        setIsProcessing(false);
        setShowChatbot(false);
      }
      return;
    }

    // Move to next question if not last
    setCurrentQnaStep(currentQnaStep + 1);
  };

  const renderAnswer = (answer, index) => {
    if (editingIndex === index) {
      return (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="p-2 border border-gray-300 rounded text-black"
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={saveEdit}
              className="px-3 py-1 bg-[#262626] text-white rounded hover:bg-[#cfcfcf] hover:text-[#262626] border-none cursor-pointer"
            >
              Simpan
            </button>
            <button
              onClick={cancelEdit}
              className="px-3 py-1 bg-[#555353] text-white rounded hover:bg-[#cfcfcf] hover:text-[#262626] border-none cursor-pointer"
            >
              Batal
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex justify-between items-center w-full">
        <span>{answer}</span>
        <button
          onClick={() => startEditing(index)}
          className="ml-2 text-sm text-blue-500 hover:text-blue-700 cursor-pointer"
          aria-label="Edit answer"
        >
          ✏️ Edit
        </button>
      </div>
    );
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = value
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    if (name === "name" || name === "businessName") {
      setFormData({
        ...formData,
        [name]: formattedValue,
        businessName: formattedValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    return phone.length >= 10 && /^\d+$/.test(phone);
  };

  const canSubmit = () => {
    return (
      formData.name.trim() &&
      formData.email.trim() &&
      validateEmail(formData.email) &&
      formData.phone.trim() &&
      validatePhone(formData.phone) &&
      formData.description.trim() &&
      qnaCompleted
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = formData;

    setIsSubmitting(true)
    
    setPopupMessage("Pengajuan Diskusi Anda Sedang Diproses");

    try {
      const response = await fetch("/api/pengajuan/diskusiDB", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setPopupMessage(
          "Pengajuan Berhasil Dikirim, Cek Email Anda Untuk Info Lebih Lanjut!"
        );
        setFormData({
          name: "",
          email: "",
          phone: "",
          description: "",
        });

        setSubmitted(true);
      } else {
        const errorData = await response.json();
        setPopupMessage(errorData.error || "Terjadi kesalahan. Coba lagi.");
      }
    } catch (error) {
      console.error("Submit Error:", error);
      setPopupMessage("Gagal mengirim.");
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
    
  };

  if (!isClient) {
    return (
        <div className="fixed inset-0 flex items-center justify-center text-white skeleton z-50">
          Memuat formulir...
        </div>

    );
  }

  return (
    <div
      className="
        flex justify-between flex-col h-full overflow-auto
        lg:flex-row
        "
    >
      <div className="explain flex-1 w-auto p-10 min-h-[450px] md:min-h-[500px] lg:min-h-[300px] flex flex-col gap-6 lg:gap-24 overflow-hidden relative lg:w-[40%] lg:h-[100%] lg:px-17 lg:py-15 bg-[black] rounded-2xl">
        <Image
          src="/image/circle/elips.png"
          width={650}
          height={650}
          alt="Circle-background"
          className="absolute w-[400px] bottom-[-90px] left-[-80px] lg:bottom-[-190] lg:left-[-130]"
        />
        <Image
          src="/logo/logo.png"
          width={700}
          height={700}
          alt="logo"
          className="w-[clamp(6rem,12vw,16rem)]"
        />
        <div className="text z-1">
          <h2
            className="
                     text-[clamp(1.3rem,1.7vw,1.7rem)] font-bold text-white
                    "
          >
            Pengajuan Diskusi
          </h2>
          <p
            className="
                    text-[clamp(0.8rem,1.1vw,0.9rem)] text-[#cccccc]
                    "
          >
            Silahkan mengisi form ini untuk mengajukan diskusi pada tim kami,
            dengan rancangan brief yang dibantu oleh Asisten Digital Form kami!
          </p>
        </div>
      </div>

      {isSubmitting && (
        <div className="w-full lg:w-[60%] h-full flex gap-9 px-10 py-50 flex-col justify-center 
        lg:px-30">
          <h2 className="
          text-gradient font-bold text-[clamp(1.2rem,2vw,1.5rem)] leading-[clamp(1.4rem,3vw,2.4rem)] text-white
          ">Sedang Mengajukan Diskusi</h2>
          <div className="flex flex-col">
            <div className="text-[clamp(0.6rem,1vw,0.9rem)] text-white">
              <div className="status status-success animate-bounce"></div> Sistem Berjalan
            </div>
            <span className="loading loading-infinity text-success loading-xl"></span>
          </div>
        </div>
      )}

      {!submitted && !isSubmitting && (
        <div className="form w-full lg:w-[60%] h-full lg:max-h-screen lg:overflow-y-auto scrollbar-hide no-scrollbar"
        data-lenis-prevent>
          <form
            disabled={submitted}
            method="POST"
            onSubmit={handleSubmit}
            className="w-full px-4 py-20 lg:px-20 lg:py-10 flex flex-col gap-10 max-w-2xl space-y-6 z-[0]"
          >
            <InputFloating
              id="nama"
              label="Nama"
              type="text"
              name="name"
              disabled={submitted}
              value={formData.name}
              onChange={handleInputChange}
            />
            <InputFloating
              id="Email"
              label="Email"
              type="email"
              name="email"
              disabled={submitted}
              value={formData.email}
              onChange={handleInputChange}
            />
            <InputFloating
              id="number"
              label="No Whatsapp"
              type="number"
              name="phone"
              disabled={submitted}
              value={formData.phone}
              onChange={handleInputChange}
            />
            <div className="bg-[black] rounded-2xl px-[20px] py-[30px] h-fit">
              {!showChatbot && !qnaCompleted && !isProcessing && !submitted && (
                <div className="flex gap-6 lg:items-center flex-col lg:justify-between lg:flex-row">
                  <div className="text w-[70%] text-white">
                    <h1 className="font-semibold text-[clamp(1rem,1.3vw,2rem)]">
                      Buat Brief
                    </h1>
                    <p className="font-regular text-[clamp(0.7rem,0.9vw,0.9rem)]">
                      Kami akan mengarahkan anda untuk membuat brief yang
                      terstruktur
                    </p>
                    <br />
                    <span className="text-red-600 text-[2vw] md:text-[2vw] lg:text-[1vw]">
                      {validateMessage}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={startShowBriefAssistant}
                    className="rounded-3xl min-w-[100px] px-2 py-[5px] text-sm cursor-pointer border-transparent shadow-[0_0_15px_#00E5FF]  transition ease-in-out background-gradient text-black

       hover:translate-y-[-5px] hover:shadow-[#00E5FF] hover:shadow-lg
       "
                  >
                    Buat brief!
                  </button>
                </div>
              )}

              {/* Sedang Proses Penyusunan */}
              {!showChatbot && !qnaCompleted && isProcessing && !submitted && (
                <div>
                  <h3 className="text-gradient font-bold">
                    Data Sedang Disusun Oleh Asisten Digital!
                  </h3>
                  <p>
                    Mohon tunggu hingga data selesai disusun oleh Asisten
                    Digital!
                  </p>
                </div>
              )}

              {/* Sudah Berhasil Di susun */}
              {!showChatbot && qnaCompleted && !isProcessing && !submitted && (
                <div className="preview-container flex flex-col">
                  <h3 className="text-white font-semibold mb-4">
                    Data Berhasil Disimpan!
                  </h3>
                  <p>
                    Brief anda sudah tersimpan dalam sistem kami silahkan ajukan
                    untuk mengirim ke database agensi untuk dilakukan
                    pemeriksaan!{" "}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => setShowChatbot(true)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit Kembali
                    </button>
                  </div>
                </div>
              )}

              {!showChatbot && qnaCompleted && !isProcessing && submitted && (
                <div>
                  <span className="text-gradient font-bold">
                    Data Sudah Terkirim Kedalam Database Kami!
                  </span>
                  <p className="text-[#cccccc]">
                    Mohon untuk tidak mengirim ulang form yang sudah di kirim,
                    tunggu tim kami selesai meninjau ajuan anda dan menghubungi
                    anda lewat Chat Whatsapp, Terimakasih.
                  </p>
                </div>
              )}

              {showChatbot && (
                <div className="chatbot-container">
                  <div className="chat-messages">
                    <span className="text-loading text-transparent bg-clip-text">
                      Asisten digital Creativolve
                    </span>
                    <br />
                    <br />
                    <p className="text-[#cccccc]">
                      Hai
                      <strong className="text-white">
                        <i> {formData.name}</i>
                      </strong>
                      <br /> <br />
                      Saya Asisten Digital Creativolve yang akan membantu kamu
                      dalam membuat brief, silahkan jawab pertanyaan berikut
                      untuk membuat brief yang tepat untuk kamu
                    </p>
                    <br />

                    {/* Only show current question if not currently editing */}

                    {/* Display past questions and answers */}
                    {qnaAnswers.map((item, index) => (
                      <div key={index} className="message-group space-y-2">
                        <div className="bot-message rounded-lg">
                          <p>
                            <strong>{item.question}</strong>
                          </p>
                        </div>
                        <div className="user-message px-4 py-3 bg-[#ffffff] rounded-[10px] text-[#262626]">
                          {renderAnswer(item.answer, index)}
                        </div>
                        <br />
                      </div>
                    ))}

                    {editingIndex === null &&
                      currentQnaStep < listPertanyaan.length && (
                        <div className="bot-message rounded-lg">
                          <p>
                            <strong>{listPertanyaan[currentQnaStep]}</strong>
                          </p>
                        </div>
                      )}

                    {validateMessage && (
                      <div className="text-red-500 mb-2">{validateMessage}</div>
                    )}

                    {currentQnaStep < listPertanyaan.length && (
                      <div className="chat-input flex flex-col space-y-2 mt-4">
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleAnswerSubmit(e);
                            }
                          }}
                          placeholder="Ketik jawaban Anda..."
                          disabled={isProcessing || editingIndex !== null}
                          className="p-2 rounded text-[#cccccc] placeholder-white"
                        />

                        <button
                          type="button"
                          onClick={handleAnswerSubmit}
                          disabled={
                            isProcessing ||
                            editingIndex !== null ||
                            inputValue.trim() === ""
                          }
                          className={`px-4 py-2 bg-[#00ccff] text-white rounded hover:text-[black] hover:bg-[#ffffff] ${
                            inputValue.trim() === ""
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          {isProcessing
                            ? "Memproses..."
                            : editingIndex !== null
                            ? "Menyimpan..."
                            : "Kirim"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className={`px-4 py-2 rounded-full transition ${
                canSubmit()
                  ? "border-transparent background-gradient text-black"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!canSubmit() || isSubmitting}
            >
              {isSubmitting ? "Mengirim..." : "Ajukan!"}
            </button>
          </form>
        </div>
      )}

      {submitted && (
        <div
          className="w-full lg:w-[60%] h-full flex px-10 py-50 flex-col justify-center 
      lg:px-30"
        >
          <h1
            className="
        text-gradient font-bold text-[clamp(1.2rem,2vw,1.5rem)] leading-[clamp(1.4rem,3vw,2.4rem)] text-shadow-[0_0_20px_#00E5FF]
        "
          >
           {popupMessage}
          </h1>
          <p
            className="
         text-[clamp(0.7rem,2vw,0.9rem)] text-[#b6b6b6]
        "
          >
            Kami juga sudah mengirim email kepada anda, silahkan cek email
            apakah data sudah sesuai dan untuk memastikan apakah sudah kami
            terima atau belum.
          </p>
        </div>
      )}
    </div>
  );
};

export default FormDiskusi;
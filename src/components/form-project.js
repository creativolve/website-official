"use client";

import { useState, useEffect } from "react";
import InputFloating from "@/components/input";
import Image from "next/image";
import "@/css/load.css";
import "@/css/animate.css";
import Select from "react-select";

const pertanyaanUmum = [
  "Apa nama brand atau project ini?",
  "Apa jenis atau bidang industri dari brand/project ini?",
  "Platform digital apa saja yang saat ini digunakan oleh brand/project ini?",
  "Platform mana yang paling aktif digunakan?",
];

const pertanyaanKhususLayanan = {
  "Digital Branding": [
    "Jelaskan (produk/jasa) apa yang brand ini jual atau tawarkan",
    "Ceritakan asal-usul atau alasan didirikannya brand ini: (jika ada)",
    "Jelaskan Visi dan Misi dari Brand ini",
    "Siapa saja target pasar brand ini? (rentang usia, jenis kelamin, pekerjaan, gaya hidup, dsb)",
    "Apa yang membuat produk brand ini unggul dibanding kompetitor lainnya? (USP)",
    "Jika brand ini adalah manusia, dia akan seperti apa? (Tone of Voice; misalnya: hangat, ramah, elegan, tegas, kreatif, formal, dsb)",
    "Sebutkan beberapa keyword yang menggambarkan brand kamu: (minimal 3; contohnya klasik, minimalis, playful, profesional, mewah, rumahan, modern, tradisional, dsb)",
    "Apakah ada warna tertentu yang ingin digunakan atau dihindari?",
    "Apakah ada gaya tipografi/font yang ingin digunakan atau dihindari?",
    "Apakah ada simbol atau elemen visual yang ingin dimasukkan? (misalnya: daun, rumah, api, bunga, hewan, dsb)",
    "Apakah ada referensi brand lain yang mungkin kamu suka dan merasa cocok dengan visualnya (di bidang apa pun) dan jelaskan alasannya?",
    "Jika ada referensi visual lain yang sudah kamu siapkan, silakan untuk upload ke link gdrive lalu cantumkan link disini",
    "Apakah kamu punya preferensi logo dengan style tertentu? (lettermark, wordmark, simbol, emblem, abstrak, maskot)",
    "Apakah kamu punya target tanggal tertentu untuk deadline project branding ini?",
  ],
  "Digital Marketing": [
    "Apa tujuan utama campaign ini? (misalnya: Awareness, Engagement, Penjualan, dsb)",
    "Platform mana yang ingin difokuskan untuk campaign ini?",
    "Siapa target market utama dari brand ini? (Usia, lokasi, pekerjaan, minat, gaya hidup)",
    "pa pesan utama yang ingin disampaikan melalui campaign ini?",
    "Apakah kamu sudah memiliki konten atau akan dibuatkan?",
    "Berapa frekuensi posting konten yang diinginkan?(harian/mingguan)",
    "Gaya komunikasi seperti apa yang diinginkan?(Serius/friendly dll)",
    "Komponen apa saja yang sudah kamu miliki?(Logo,font,warna brand dll)",
    "Jika ada referensi campaign yang kamu suka, mohon lampirkan (cantumkan link)",
    "Berapa lama periode campaign ini akan berlangsung?",
    "Kapan deadline laporan performa atau hasil (jika ada)?",
  ],
  "Editing Video": [
    "Apa judul atau tema video ini?",
    "Deskripsikan isi video proyek ini secara singkat?",
    "Apa tujuan video ini dibuat? (misalnya: promosi, edukasi, awareness, internal)",
    "Jenis video apa yang akan dibuat? (misalnya: cinematic, interview, tutorial, kompilasi, dsb)",
    "Siapa target audiens utama dari video ini? (usia, minat, lokasi, gaya hidup, dll)",
    "Apa tone video yang diinginkan?",
    "Apakah ada referensi video yang kamu suka? (cantumkan link)",
    "Apakah ada elemen yang harus dimasukkan? (logo, subtitle, bumper, musik tertentu, footage wajib, dll)",
    "Durasi dan format file video yang diinginkan",
    "Apakah kamu punya target tanggal tertentu untuk deadline Project ini?",
  ],
  "Desain Grafis": [
    "Apa judul atau tema desain ini?",
    "Deskripsikan desain proyek ini secara singkat?",
    "Apa tujuan desain ini dibuat? (misalnya: promosi, edukasi, internal)",
    "Jenis video apa yang akan dibuat? (misalnya: poster, banner, spanduk, dsb)",
    "Siapa target audiens utama dari desain ini? (usia, minat, lokasi, gaya hidup, dll)",
    "Apa tone video yang diinginkan?",
    "Apakah ada referensi desain yang kamu suka? (cantumkan link)",
    "Apakah ada elemen yang harus dimasukkan? (logo, foto dll)",
    "format file video yang diinginkan",
    "Apakah kamu punya target tanggal tertentu untuk deadline Project ini?",
  ],
  Copywriting: [
    "Apa tujuan yang ingin kamu capai dari campaign ini?",
    "Campaign ini ingin disajikan dalam bentuk seperti apa? (Soft selling, Hard selling, Storytelling, Naratif, Informatif, dsb)",
    "Siapa target audiens campaign ini? (Umur, profesi, gaya hidup, minat, masalah yang dihadapi)",
    "Tone of Voice seperti apa yang ingin digunakan?",
    "Apakah kamu punya contoh campaign dari brand lain yang kamu suka?",
    "Poin penting apa saja yang wajib ada?",
    "Apakah ada kalimat tertentu yang harus digunakan?",
    "Apakah ada hal-hal tertentu yang harus dihindari?",
    "Apakah kamu punya target tanggal tertentu untuk deadline project ini?",
  ],
};

const layananOptions = [
  { value: "Digital Branding", label: "Digital Branding" },
  { value: "Digital Marketing", label: "Digital Marketing" },
  { value: "Editing Video", label: "Editing Video" },
  { value: "Desain Grafis", label: "Desain Grafis" },
  { value: "Copywriting", label: "Copywriting" },
];

const businessTypeOptions = [
  { value: "Umum", label: "Umum" },
  { value: "Bisnis", label: "Bisnis" },
  { value: "Organisasi", label: "Organisasi" },
];

export function PopupOverlay({ message, visible, logoAnimate, sendedIcon }) {
  if (!visible) return null;

  // Default image if none provided
  const imageSrc = sendedIcon || "/images/default-icon.png";

  return (
    <div className="fixed top-0 left-0 h-full w-full bg-[#171717] z-[999999] flex flex-col items-center justify-center">
      <div className="img w-fit m-auto">
        <Image
          src={imageSrc}
          alt="Status Icon"
          width={150}
          height={150}
          priority
          className={`w-[50%] ${logoAnimate} m-auto`}
        />
        <h2 className="text-[4vw] md:text-[3vw] lg:text-[1.5vw] w-[60%] text-center m-auto text-white">
          {message}
        </h2>
      </div>
    </div>
  );
}

const FormProject = () => {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    businessType: null,
    kategori: [],
    budget: "",
    description: "",
  });

  const [popupMessage, setPopupMessage] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [logoAnimate, setLogoAnimate] = useState("");
  const [popupImage, setPopupImage] = useState("/images/load-logo.png");
  const [isClient, setIsClient] = useState(false);

  const [showChatbot, setShowChatbot] = useState(false);
  const [currentQnaStep, setCurrentQnaStep] = useState(0);
  const [qnaAnswers, setQnaAnswers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [validateMessage, setValidateMessage] = useState("");
  const [qnaCompleted, setQnaCompleted] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
   const [submitted, setSubmitted] = useState(false)
  const [listPertanyaan, setListPertanyaan] = useState([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const startShowBriefAssistant = () => {
    if (
      !formData.name ||
      !formData.businessName ||
      !formData.email ||
      !formData.phone ||
      !formData.businessType ||
      !formData.kategori ||
      !formData.budget
    ) {
      setValidateMessage("Lengkapi terlebih dahulu form diatas!");
      setTimeout(() => setValidateMessage(""), 2000);
    } else {
      let pertanyaanKhusus = [];
      formData.kategori.forEach((layanan) => {
        const pertanyaan = pertanyaanKhususLayanan[layanan.value] || [];
        pertanyaanKhusus = [...pertanyaanKhusus, ...pertanyaan];
      });

      const semuaPertanyaan = [
        ...new Set([...pertanyaanUmum, ...pertanyaanKhusus]),
      ];

      setListPertanyaan(semuaPertanyaan);
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

    if (editingIndex !== null) {
      saveEdit();
      return;
    }

    let answer = inputValue;

    const newAnswers = [
      ...qnaAnswers,
      {
        type: "project",
        question: listPertanyaan[currentQnaStep],
        answer,
        category: getQuestionCategory(listPertanyaan[currentQnaStep]),
      },
    ];

    setQnaAnswers(newAnswers);
    setInputValue("");
    setSelectedService([]);

    // If last question, process the answers
    if (currentQnaStep === listPertanyaan.length - 1) {
      setIsProcessing(true);
      setShowChatbot(false);

      try {
        const response = await fetch("/api/modelAI/formAssistant", {
          // Fixed typo
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answers: newAnswers,
            metadata: {
              name: formData.name,
              businessName: formData.businessName,
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
        setPopupMessage("Membuat deskripsi versi sederhana...");

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

    // Move to next question
    setCurrentQnaStep(currentQnaStep + 1);
  };

  const getQuestionCategory = (question) => {
    // Cek apakah pertanyaan termasuk umum
    if (pertanyaanUmum.includes(question)) return "umum";

    // Cek pertanyaan khusus layanan
    for (const [service, questions] of Object.entries(
      pertanyaanKhususLayanan
    )) {
      if (questions.includes(question)) return service;
    }

    return "lainnya";
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Format name fields
    if (name === "name" || name === "businessName") {
      const formattedValue = value
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");

      setFormData({
        ...formData,
        [name]: formattedValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSelectChange = (selectedOption) => {
    setFormData({
      ...formData,
      businessType: selectedOption,
    });
  };

  const handleKategoriChange = (selectedOptions) => {
    setFormData({
      ...formData,
      kategori: selectedOptions,
    });
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

    if (!canSubmit()) {
      setPopupMessage(
        "Harap lengkapi semua field wajib dengan format yang benar!"
      );
      setPopupVisible(true);
      setTimeout(() => setPopupVisible(false), 3000);
      return;
    }

    setIsSubmitting(true);
    setLogoAnimate("animate-scale");
    setPopupImage("/images/load_logo.png");
    setPopupVisible(true);
    setPopupMessage("Mengirim formulir...");

    try {
      const response = await fetch("/api/pengajuan/projectDB", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          businessType: formData.businessType?.value,
          kategori: formData.kategori.map((k) => k.value),
          processed_at: new Date().toISOString(),
          source: "web-form",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal mengirim data.");
      }

      setPopupMessage("Formulir berhasil dikirim!");
      setLogoAnimate("animate-bounce");
      setPopupImage("/images/sended.png");

      // Reset form setelah submit berhasil
      setFormData({
        name: "",
        businessName: "",
        email: "",
        phone: "",
        businessType: null,
        kategori: [],
        budget: "",
        expectation: "",
        description: "",
      });
      setQnaAnswers([]);
      setSubmitted(true)  
    } catch (error) {
      console.error("Submit Error:", error);
      setPopupMessage("Terjadi kesalahan saat mengirim data.");
      setLogoAnimate("animate-shake");
      setPopupImage("/images/sended.png");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setPopupVisible(false), 5000);
    }
  };

  if (!isClient) {
    return (
      <div className="text-white text-center py-10">Memuat formulir...</div>
    );
  }

  return (
    <>
      <div className="text-white flex items-center justify-center py-30 px-0">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-10 max-w-2xl space-y-6 z-[0]"
          disabled={submitted}
        >
          <h1 className="text-xl font-semibold">Ajukan Project Kepada Tim</h1>

          <InputFloating
            id="nama"
            label="Nama"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            disabled={submitted}
          />

          <InputFloating
            id="namaBisnis"
            label="Nama Bisnis/Organisasi/Project"
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleInputChange}
            disabled={submitted}
          />

          <div className="flex flex-col space-y-15 lg:space-x-5 lg:space-y-0 lg:flex-row">
            <InputFloating
              id="email"
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={submitted}
            />

            <InputFloating
              id="number"
              label="No Whatsapp*"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              disabled={submitted}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label className="text-white mb-1 block">Jenis Kategori:</label>
              <Select
                options={businessTypeOptions}
                value={formData.businessType}
                onChange={handleSelectChange}
                placeholder="Pilih kategori"
                className="text-black"
                disabled={submitted}
                classNamePrefix="react-select"
              />
            </div>

            <div className="w-full">
              <label className="text-white mb-1 block">Pilih Layanan:</label>
              <Select
                isMulti
                options={layananOptions}
                value={formData.kategori}
                onChange={handleKategoriChange}
                disabled={submitted}
                placeholder="Pilih layanan"
                className="text-black"
                classNamePrefix="react-select"
              />
            </div>
          </div>

          <InputFloating
            id="budget"
            label="Budget (Rp)"
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            disabled={submitted}
          />

          <div className="bg-[#262626] rounded-2xl px-[20px] py-[30px]">
            {/* TAMPILAN AWAL DI BOX QNA */}
            {!showChatbot && !qnaCompleted && !isProcessing && (
              <div className="flex gap-6 lg:items-center flex-col lg:justify-between lg:flex-row">
                <div className="text w-[70%]">
                  <h1 className="font-semibold text-[5.4vw] md:text-[4vw] lg:text-[1.3vw]">
                    Buat Brief
                  </h1>
                  <p className="font-regular text-[2.9vw] md:text-[3vw] lg:text-[1.2vw]">
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
                  className="px-[20px] py-[5px] rounded-3xl text-[3.8vw] h-fit cursor-pointer border-2 border-transparent bg-[#ffffff] text-[#262626] 
                                  md:text-[3vw]
                                  lg:px-[25px] lg:py-[5px] lg:text-[1vw] transition-all duration-100 ease-in-out
                                  hover:bg-transparent hover:text-[#ffffff] hover:border-[#ffffff] hover:translate-y-[-5px]"
                >
                  Buat brief!
                </button>
              </div>
            )}

            {/* TAMPILAN BOX SAAT DI SUSUN OLEH ASISTEN DIGITAL */}
            {!showChatbot && !qnaCompleted && isProcessing && (
              <div>
                <h3 className="animated-gradient text-transparent bg-clip-text font-bold">
                  Data Sedang Disusun Oleh Asisten Digital!
                </h3>
                <p>
                  Mohon tunggu hingga data selesai disusun oleh Asisten Digital!
                </p>
              </div>
            )}

            {/* TAMPILAN BOX QNA SAAT QNA BERHASIL DISIMPAN*/}
            {!showChatbot && qnaCompleted && !isProcessing && (
              <div className="preview-container flex flex-col">
                <h3 className="text-white font-semibold mb-4">
                  Data Berhasil Disimpan!
                </h3>
                <p>
                  Brief anda sudah tersimpan dalam sistem kami silahkan ajukan
                  untuk mengirim ke database agensi untuk dilakukan pemeriksaan!{" "}
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
                    <span className="animated-gradient text-transparent bg-clip-text font-bold">
                    Data Sudah Terkirim Kedalam Database Kami!
                  </span>
                  <p className="text-[#cccccc]">
                    Mohon untuk tidak mengirim ulang form yang sudah di kirim, tunggu tim kami selesai meninjau ajuan anda dan menghubungi anda lewat Chat Whatsapp, Terimakasih.
                  </p>
              </div>
            )}



            {/* TAMPILAN QNA SAAT SEDANG DALAM SESI */}
            {showChatbot && (
              <div className="chatbot-container">
                <div className="chat-messages">
                  <span className="animated-gradient text-transparent bg-clip-text">
                    Asisten digital Creativolve
                  </span>
                  <br />
                  <br />
                  <p className="text-[#cccccc]">
                    Hai{" "}
                    <strong className="text-white">
                      {" "}
                      <i>
                        {formData.name} ( {formData.businessName} ){" "}
                      </i>
                    </strong>{" "}
                    Anda memilih layanan{" "}
                    <strong>
                      <i>
                        {" "}
                        {formData.kategori
                          .map((item) => item.label)
                          .join(", ")}{" "}
                      </i>
                    </strong>{" "}
                    <br /> <br />
                    Saya Asisten Digital Creativolve yang akan membantu kamu
                    dalam membuat brief, silahkan jawab pertanyaan berikut untuk
                    membuat brief yang tepat untuk kamu
                  </p>
                  <br />
                  <div className="bot-message rounded-lg">
                    <p>
                      <strong>{listPertanyaan[currentQnaStep]}</strong>
                    </p>
                  </div>

                  {qnaAnswers.map((item, index) => (
                    <div key={index} className="message-group space-y-2">
                      <div className="user-message px-4 py-3 bg-[#ffffff] rounded-[10px] text-[#262626]">
                        {renderAnswer(item.answer, index)}
                      </div>
                      <br />
                      {index + 1 < listPertanyaan.length && (
                        <div className="bot-mess">
                          <p>
                            <strong>{listPertanyaan[index + 1]}</strong>
                          </p>
                        </div>
                      )}
                    </div>
                  ))}

                  {currentQnaStep < listPertanyaan.length && (
                    <div className="chat-input flex flex-col space-y-2 mt-4">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleAnswerSubmit()
                        }
                        placeholder="Ketik jawaban Anda..."
                        disabled={isProcessing || editingIndex !== null}
                        className="p-2 rounded text-[#cccccc] placeholder-white"
                      />
                      <button
                        type="button"
                        onClick={handleAnswerSubmit}
                        className="px-4 py-2 bg-[#131313] text-white rounded hover:text-[black] hover:bg-[#ffffff] disabled:bg-[#939393]"
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
                ? "bg-white text-black hover:bg-gray-300"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!canSubmit() || isSubmitting}
          >
            {isSubmitting ? "Mengirim..." : "Ajukan!"}
          </button>
        </form>
      </div>

      <PopupOverlay
        message={popupMessage}
        visible={popupVisible}
        logoAnimate={logoAnimate}
        sendedIcon={popupImage}
      />
    </>
  );
};

export default FormProject;

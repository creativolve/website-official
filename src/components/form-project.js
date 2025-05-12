  "use client";

  import { useState, useEffect } from "react";
  import InputFloating from "@/components/input";
  import Image from "next/image";
  import "@/css/load.css";
  import "@/css/animate.css";
  import Select from "react-select";

  const listPertanyaan = [
    "Deskripsikan latar belakang proyek ini dan alasan utama Anda ingin memulainya.",
    "Apa tujuan utama yang ingin dicapai dengan proyek ini? (Misalnya: membangun brand awareness, meningkatkan engagement, memperkenalkan produk, dsb.)",
    "Layanan Yang Anda butuhkan",
    "Siapa target audiens atau market yang ingin Anda capai dengan proyek ini?",
    "Apa pesan atau nilai utama yang ingin Anda sampaikan melalui proyek ini?",
    "Apakah ada batasan teknis atau kendala yang perlu kami pertimbangkan dalam pengerjaan proyek ini?",
    "Apa saja tantangan atau risiko yang Anda prediksi dapat muncul selama proyek ini berjalan?",
    "Apakah Anda memiliki gambaran atau referensi tentang hasil akhir yang Anda harapkan dari proyek ini?",
    "Apakah ada aspek atau elemen khusus yang menurut Anda sangat penting untuk ada dalam proyek ini?",
    "Apa harapan Anda terkait dengan timeline proyek ini? Apakah ada deadline atau event penting yang perlu dipertimbangkan?",
    "Bagaimana Anda melihat proyek ini berkontribusi terhadap perkembangan bisnis atau tujuan perusahaan Anda?",
    "Apakah ada hal lain yang perlu kami ketahui untuk membantu kami memahami kebutuhan Anda dengan lebih baik? (Misalnya, kebutuhan teknis, target tertentu, dsb.)"
  ];

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
    // Form state initialization
    const [formData, setFormData] = useState({
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

    // UI state
    const [popupMessage, setPopupMessage] = useState("");
    const [popupVisible, setPopupVisible] = useState(false);
    const [logoAnimate, setLogoAnimate] = useState("");
    const [popupImage, setPopupImage] = useState("/images/default-icon.png");
    const [isClient, setIsClient] = useState(false);
    
    // Chatbot state
    const [showChatbot, setShowChatbot] = useState(false);
    const [currentQnaStep, setCurrentQnaStep] = useState(0);
    const [qnaAnswers, setQnaAnswers] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedService, setSelectedService] = useState([]);
    const [qnaCompleted, setQnaCompleted] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editValue, setEditValue] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    const startShowBriefAssistant = () => {
      setShowChatbot(true);
      setCurrentQnaStep(0);
      setQnaAnswers([]);
      setQnaCompleted(false);
      setInputValue("");
      setSelectedService([]);
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

        // Handle service selection differently
        if (currentQnaStep === 2) {
          if (selectedService.length === 0) {
            setPopupMessage("Pilih minimal satu layanan");
            setPopupVisible(true);
            setTimeout(() => setPopupVisible(false), 2000);
            return;
          }
          answer = selectedService.map((s) => s.label).join(", ");
        } else if (!answer.trim()) {
          setPopupMessage("Isi jawaban terlebih dahulu");
          setPopupVisible(true);
          setTimeout(() => setPopupVisible(false), 2000);
          return;
        }

        const newAnswers = [
          ...qnaAnswers,
          {
            question: listPertanyaan[currentQnaStep],
            answer,
          },
        ];

        setQnaAnswers(newAnswers);
        setInputValue("");
        setSelectedService([]);

        // If last question, process the answers
        if (currentQnaStep === listPertanyaan.length - 1) {
          setIsProcessing(true);
          setShowChatbot(false)
          
            try {
              const response = await fetch('/api/modelAI/formAssistant', {  // Fixed typo
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  answers: newAnswers,
                  metadata: {
                    name: formData.name,
                    businessName: formData.businessName,
                    email: formData.email
                  }
                })
              });
          
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
          
              const result = await response.json();
              
              setFormData(prev => ({
                ...prev,
                description: result?.data?.analysis || 
                  newAnswers.map(item => `Q: ${item.question}\nA: ${item.answer}`).join("\n\n")
              }));
              
        
            setPopupMessage("Deskripsi proyek berhasil dibuat!");
            setQnaCompleted(true);
          } catch (error) {
            console.error("Error processing answers:", error);
            setPopupMessage("Membuat deskripsi versi sederhana...");
            
            setFormData(prev => ({
              ...prev,
              description: newAnswers.map(item => `Q: ${item.question}\nA: ${item.answer}`).join("\n\n")
            }));
            setQnaCompleted(true);
          } finally {
            setIsProcessing(false);
            setShowChatbot(false);
            setTimeout(() => setPopupVisible(false), 3000);
          }
          return;
        }

      // Move to next question
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
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Simpan
              </button>
              <button
                onClick={cancelEdit}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
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
            className="ml-2 text-sm text-blue-500 hover:text-blue-700"
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
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
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
        setPopupMessage("Harap lengkapi semua field wajib dengan format yang benar!");
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
            kategori: formData.kategori.map(k => k.value),
            processed_at: new Date().toISOString(),
            source: "web-form"
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
        setQnaCompleted(false);

      } catch (error) {
        console.error("Submit Error:", error);
        setPopupMessage("Terjadi kesalahan saat mengirim data.");
        setLogoAnimate("animate-shake");
        setPopupImage("/images/sended.png");
      } finally {
        setIsSubmitting(false);
        setTimeout(() => setPopupVisible(false), 4000);
      }
    };


    if (!isClient) {
      return <div className="text-white text-center py-10">Memuat formulir...</div>;
    }

    return (
      <>
        <div className="text-white flex items-center justify-center py-30 px-1">
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-10 max-w-xl space-y-6 z-[0]"
          >
            <h1 className="text-xl font-semibold">Ajukan Project Kepada Tim</h1>

            <InputFloating
              id="nama"
              label="Nama*"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />

            <InputFloating
              id="namaBisnis"
              label="Nama Bisnis/Organisasi"
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleInputChange}
            />

            <div className="flex flex-col space-y-15 lg:space-x-5 lg:space-y-0 lg:flex-row">
              <InputFloating
                id="email"
                label="Email*"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />

              <InputFloating
                id="number"
                label="No Whatsapp*"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
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
            />

            <InputFloating
              id="ekspetasi"
              label="Ekspetasi Anda"
              type="text"
              name="expectation"
              value={formData.expectation}
              onChange={handleInputChange}
            />

            <div className="bg-[#262626] rounded-2xl px-[20px] py-[30px]">
              {!showChatbot && !qnaCompleted && !isProcessing && (
                <div className="flex gap-6 lg:items-center flex-col lg:justify-between lg:flex-row">
                  <div className="text w-[70%]">
                    <h1 className="font-semibold">Buat Brief</h1>
                    <p className="font-regular text-[3vw] md:text-[3.4vw] lg:text-[1.2vw]">
                      Kami akan mengarahkan anda untuk membuat brief yang terstruktur
                    </p>
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

              {!showChatbot && !qnaCompleted && isProcessing &&(
                <div>
                  <h3 className="animated-gradient text-transparent bg-clip-text font-bold">Data Sedang Disusun Oleh Asisten Digital!</h3>
                  <p>Mohon tunggu hingga data selesai disusun oleh Asisten Digital!</p>
                </div>
              )}

              

              {!showChatbot && qnaCompleted && !isProcessing && (
                <div className="preview-container flex flex-col">
                  <h3 className="text-white font-semibold mb-4">
                    Data Berhasil Disimpan!
                  </h3>
                  <p>Brief anda sudah tersimpan dalam sistem kami silahkan ajukan untuk mengirim ke database agensi untuk dilakukan pemeriksaan!  </p>
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

              {showChatbot && (
                <div className="chatbot-container">
                  <div className="chat-messages">
                    <span className="animated-gradient text-transparent bg-clip-text">
                      Asisten digital Creativolve
                    </span>
                    <br />
                    <div className="bot-message rounded-lg">
                      <p>{listPertanyaan[currentQnaStep]}</p>
                    </div>

                    {qnaAnswers.map((item, index) => (
                      <div key={index} className="message-group space-y-2">
                        <div className="user-message px-4 py-3 bg-[#ffffff] rounded-[10px] text-[#262626]">
                          {renderAnswer(item.answer, index)}
                        </div>
                        <br />
                        {index + 1 < listPertanyaan.length && (
                          <div className="bot-mess">
                            <p>{listPertanyaan[index + 1]}</p>
                          </div>
                        )}
                      </div>
                    ))}

                    {currentQnaStep < listPertanyaan.length && (
                      <div className="chat-input flex flex-col space-y-2 mt-4">
                        {currentQnaStep === 2 ? (
                          <Select
                            isMulti
                            options={layananOptions}
                            value={selectedService}
                            onChange={setSelectedService}
                            placeholder="Pilih layanan"
                            className="text-black"
                            classNamePrefix="react-select"
                          />
                        ) : (
                          <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleAnswerSubmit()}
                            placeholder="Ketik jawaban Anda..."
                            disabled={isProcessing || editingIndex !== null}
                            className="p-2 rounded text-white placeholder-white"
                          />
                        )}
                        <button
                          type="button"
                          onClick={handleAnswerSubmit}
                          disabled={
                            (currentQnaStep !== 2 && !inputValue.trim() && editingIndex === null) ||
                            (currentQnaStep === 2 && selectedService.length === 0) ||
                            isProcessing
                          }
                          className="px-4 py-2 bg-[#131313] text-white rounded hover:text-[black] hover:bg-[#ffffff] disabled:bg-[#939393]"
                        >
                          {isProcessing ? "Memproses..." : editingIndex !== null ? "Menyimpan..." : "Kirim"}
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
    "use client";

    import Button from "@/components/button";
    import InputFloating from "@/components/input";
    import Image from "next/image";
    import Link from "next/link";
    import { useState, useEffect } from "react";
    import "@/css/load.css";

    // components/PopupOverlay.js
    export function PopupOverlay({ message, visible, logoAnimate, sendedIcon }) {
      if (!visible) return null;

      return (
        <div className="fixed top-0 left-0 h-full w-full bg-[#171717]  z-[999999] flex  flex-col items-center justify-center">
          <div className="img w-fit m-auto">
            <Image
              src={sendedIcon}
              alt="Logo"
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

    const FormDiskusi = () => {
      const [formData, setFormData] = useState({
        name: "",
        businessName: "",
        email: "",
        phone: "",
        duration: "",
        topicTitle: "",
        description: "",
        businessType: "",
      });

      const [popupMessage, setPopupMessage] = useState("");
      const [popupVisible, setPopupVisible] = useState(false);
      const [logoAnimate, setLogoAnimate] = useState("")
      const [popupImage, setPopupImage] = useState("");



      const handleInputChange = (e) => {
        const { name, value } = e.target;
        const formattedValue = value
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
      
        if (name === 'name' || name === 'businessName') {
          // Kapitalisasi setiap kata pada name dan businessName
          setFormData({
            ...formData,
            [name]: formattedValue,
            businessName: formattedValue, // Pastikan businessName terformat
          });
        } else {
          setFormData({
            ...formData,
            [name]: value,
          });
        }
      };

      

      const handleSubmit = async (e) => {
        e.preventDefault();
        const data = formData;

        setLogoAnimate('animate-scale')
        setPopupImage("/images/load_logo.png");
        setPopupVisible(true);
        setPopupMessage("Mohon Tunggu Pengajuan Anda Sedang dikirim...");


        try {
          const response = await fetch("/api/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          if (response.ok) {
            setPopupImage("/images/sended.png");
            setLogoAnimate('')
            setPopupMessage(
              "Pengajuan Berhasil Dikirim, Cek Email Anda Untuk Info Lebih Lanjut!"
            );
            setFormData(() => ({
              name: "",
              businessName: "",
              email: "",
              phone: "",
              duration: "",
              topicTitle: "",
              description: "",
              businessType: "",
            }));

            setTimeout(() => {
              setPopupVisible(false);
            }, 5500);
          } else {
            const errorData = await response.json();
            setPopupImage("/images/sended.png");
            setLogoAnimate('')
            setPopupMessage(errorData.error || "Terjadi kesalahan. Coba lagi.");
            setTimeout(() => {
              setPopupVisible(false);
            }, 3000);
          }
        } catch (error) {
          setPopupMessage("Gagal mengirim.");
          setLogoAnimate('')
          setTimeout(() => {
            setPopupVisible(false);
          }, 5500);
        }
      };

      const [scrolled, setScrolled] = useState(false);

      useEffect(() => {
        const handleScroll = () => {
          setScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
      }, []);

      return (
        <>
                
          

          <div className="text-white flex items-center justify-center py-25 px-1">
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-10 max-w-xl space-y-6 z-[0]"
            >
              <h1 className="text-xl font-semibold">Ajukan Diskusi Bersama Tim</h1>

              <InputFloating
                id="nama"
                label="Nama"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <div className="flex gap-5">
                <InputFloating
                  id="Email"
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <InputFloating
                  id="number"
                  label="No Whatsapp"
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <InputFloating
                id="namaBisnis"
                label="Nama Bisnis"
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
              />

              <div className="flex space-x-4">
                <InputFloating
                  id="lamaBisnis"
                  label="Berapa lama bisnis dibangun"
                  className="flex-1"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                />

                <div className="flex gap-4">
                  <select
                    name="businessType"
                    className="bg-[#1F1F1F] text-white border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:border-white"
                    value={formData.businessType}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled hidden>
                      Jenis Bisnis
                    </option>
                    <option value="Produk">Produk</option>
                    <option value="Jasa">Jasa</option>
                    <option value="Startup">Startup</option>
                  </select>
                </div>
              </div>

              <InputFloating
                id="judulDiskusi"
                label="Judul Diskusi"
                name="topicTitle"
                value={formData.topicTitle}
                onChange={handleInputChange}
              />

              <div className="relative w-full">
                <textarea
                  id="deskripsiDiskusi"
                  name="description"
                  placeholder=" "
                  rows="4"
                  className="peer w-full border-b  bg-transparent py-2 text-white placeholder-transparent focus:outline-none"
                  value={formData.description}
                  onChange={handleInputChange}
                ></textarea>
                <label
                  htmlFor="deskripsiDiskusi"
                  className="absolute left-0 top-[-20] text-sm text-white transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-[-20] peer-focus:text-sm peer-focus:text-white"
                >
                  Deskripsi Diskusi
                </label>
                <p className="text-xs text-gray-400 mt-1">
                  Ceritakan masalah apa yang ingin anda diskusikan
                </p>
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-300 transition"
              >
                Ajukan!
              </button> 
            </form>
          </div>
          <PopupOverlay message={popupMessage} visible={popupVisible} logoAnimate={logoAnimate} sendedIcon={popupImage}/>

        </>
      );
    };

    export default FormDiskusi;

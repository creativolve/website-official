    "use client";

    import { useState, useEffect } from "react";
    import InputFloating from "@/components/input";
    import Image from "next/image";
    import "@/css/load.css";
    import Select from "react-select";

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

    const FormProject = () => {
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

    const [popupMessage, setPopupMessage] = useState("");
    const [popupVisible, setPopupVisible] = useState(false);
    const [logoAnimate, setLogoAnimate] = useState("");
    const [popupImage, setPopupImage] = useState("");

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // Set to true after component has mounted on the client
    }, []);

    if (!isClient) {
        return null; // Render nothing on the server
    }

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = formData;

        setLogoAnimate("animate-scale");
        setPopupImage("/images/load_logo.png");
        setPopupVisible(true);
        setPopupMessage("Mohon Tunggu Pengajuan Anda Sedang dikirim...");

        try {
        const response = await fetch("/api/formProject", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            setPopupImage("/images/sended.png");
            setLogoAnimate("");
            setPopupMessage(
            "Pengajuan Berhasil Dikirim, Cek Email Anda Untuk Info Lebih Lanjut!"
            );
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
              

            setTimeout(() => {
            setPopupVisible(false);
            }, 5500);
        } else {
            const errorData = await response.json();
            setPopupImage("/images/sended.png");
            setLogoAnimate("");
            setPopupMessage(errorData.error || "Terjadi kesalahan. Coba lagi.");
            setTimeout(() => {
            setPopupVisible(false);
            }, 3000);
        }
        } catch (error) {
        setPopupMessage("Gagal mengirim.");
        setLogoAnimate("");
        setTimeout(() => {
            setPopupVisible(false);
        }, 5500);
        }
    };

    return (
        <>
        <div className="text-white flex items-center justify-center py-30 px-1">
            <form
            method="POST"
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-10 max-w-xl space-y-6 z-[0]"
            >
            <h1 className="text-xl font-semibold">Ajukan Project Kepada Tim</h1>

            <InputFloating
                id="nama"
                label="Nama"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
            />

            <InputFloating
                id="namaBisnis"
                label="Nama Bisnis"
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
            />

            <div className="flex flex-col space-y-15 lg:space-x-5 lg:space-y-0 lg:flex-row">
                <InputFloating
                id="email"
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

            <div className="flex flex-col md:flex-row space-y-14 space-x-5">
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
                label="Budget"
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

            <div className="relative w-full">
                <textarea
                id="deskripsiDiskusi"
                name="description"
                placeholder=" "
                rows="4"
                className="peer w-full border-b bg-transparent py-2 text-white placeholder-transparent focus:outline-none"
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

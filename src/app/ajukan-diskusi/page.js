"use client"

import InputFloating from '@/components/input';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    duration: '',
    topicTitle: '',
    description: '',
    businessType: '',
  });

  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = formData;

  
    // Cek data yang dikirim sebelum fetch
    console.log(data);  // Tambahkan log untuk memeriksa data yang dikirim

    console.log('Data sebelum dikirim:', formData); 
  
        try {
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    
        if (response.ok) {
            setMessage('Data berhasil dikirim!');
            setFormData(() => ({
              name: '',
              businessName: '',
              email: '',
              phone: '',
              duration: '',
              topicTitle: '',
              description: '',
              businessType: '',
            }));
        } else {
            const errorData = await response.json();
            setMessage(errorData.error || 'Terjadi kesalahan. Coba lagi.');
        }

        } catch (error) {
        setMessage('Terjadi kesalahan. Coba lagi.');
        }
    };    




        const [scrolled, setScrolled] = useState(false)
    
        useEffect(() =>{
            const handleScroll = () => {
                setScrolled(window.scrollY > 0)
            }
    
            window.addEventListener('scroll', handleScroll)
    
            return () => window.removeEventListener('scroll', handleScroll)
        }, [])

  return (

    <>
    <nav
        className='
        w-fit pt-[60px] px-[50px]
        '>
            <div
            className='
            flex gap-5 items-center w-fit
            '>
                <Link 
                href="/"
                className={`
                rounded-full px-5 py-2 transition-all duration-200 ease-in-out flex gap-5 text-white justify-center items-center
                bg-[#262626]
                
                hover:shadow-md hover:bg-[#cfcfcf] hover:text-black group
                active:shadow-md active:bg-[#cfcfcf] active:text-black

                ${scrolled? 'fixed z-[100]' : ''}
                `}>
                    <Image
                    src="/images/Back Button.png"
                    alt="kembali"
                    width={100}
                    height={100}
                    className='
                    w-[8vw] transition-all duration-200 ease-in-out
                    lg:w-[2vw] object-cover select-none cursor-pointer invert
                    group-hover:invert-0
                    '
                    />
                    Kembali
                </Link>
            </div>
        </nav>

    <div className="text-white flex items-center justify-center py-20 px-10">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-10 max-w-xl space-y-6 z-[0]">
        <h1 className="text-xl font-semibold">Ajukan Diskusi Bersama Tim</h1>

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
            label="No Telepon"
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>

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
              <option value="" disabled hidden>Jenis Bisnis</option>
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
          <p className="text-xs text-gray-400 mt-1">Ceritakan masalah apa yang ingin anda diskusikan</p>
        </div>

        <button type="submit" className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-300 transition">
          Ajukan!
        </button>
        <p className="text-sm text-green-300">{message}</p>
      </form>
    </div>
    </>
  );
};

export default Form;

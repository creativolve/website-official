"use client";

import '@/css/globals.css'
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';


export default function ChatAI() {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const textareaRef = useRef(null);

  const handleInput = (e) => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto'; // reset dulu
    textarea.style.height = Math.min(textarea.scrollHeight, 24 * 5) + 'px'; // max 5 baris (24px per baris)
    setQuestion(e.target.value);
  };


  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);

    // Tambahkan pertanyaan user ke percakapan
    setMessages((prev) => [...prev, { role: 'user', content: question }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }), // cocok dengan API
      });

      const data = await res.json();

      if (res.ok) {
        setMessages((prev) => [...prev, { role: 'ai', content: data.reply }]);
      } else {
        setMessages((prev) => [...prev, { role: 'ai', content: 'Error: ' + data.error }]);
      }
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'ai', content: 'Terjadi kesalahan jaringan.' }]);
    }

    setQuestion('');
    setLoading(false);
  };

  const renderMessageContent = (content) => {
    const urlRegex = /(https?:\/\/[^\s]+)(?=\s|$|[^\w\s])/g;
    const contentWithLinks = content.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" class="text-blue-500 hover:underline">${url}</a>`;
    });

    return <div dangerouslySetInnerHTML={{ __html: contentWithLinks }} />;
  };

  return (
    <>
    <div>
<div className='mt-7'>
  <h2
  className='
  text-center text-[#cccccc] text-[2.5vw] md:text-[2vw] lg:text-[0.9vw] fixed top-[30px] left-[50%] translate-x-[-50%] lg:translate-x-[50%]
  '>
    <strong className='text-white'>Asisten Digital 1.0</strong> <br />
    Dibuat Oleh Creativolve <br />
    <Link href='/pusat-layanan/chatAI/informasi'
    className='text-blue-500'>
        Lihat Informasi
      </Link>
  </h2>
</div>
    </div>
      <div className="h-[95vh] flex flex-col overflow-hidden">
        {/* Area pesan, yang bisa di-scroll */}
        <div className="flex-1 overflow-y-auto p-4 scrollbar-hide no-scrollbar">
        {messages.length === 0 && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center text-white text-[4vw] lg:text-[1.3vw] mt-[50%] lg:mt-[25%]"
        >
          Tanyakan apapun kepada <strong>Asisten Digital Creativolve</strong> ✨
        </motion.div>
      )}

        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}       // Mulai dengan opacity 0 (sembunyi)
            animate={{ opacity: 1 }}       // Fade in ke opacity 1
            exit={{ opacity: 0 }}          // Fade out ketika pesan dihapus (bisa untuk animasi keluar)
            transition={{ duration: 0.5 }} // Durasi animasi
            className={`mt-5 flex flex-col ${
              msg.role === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <span className="text-[#cccccc] mb-1">
              {msg.role === 'user' ? 'Anda' : 'Asisten Digital Creativolve'}
            </span>
            <div
              className={`rounded-[10px] p-4 text-left text-[3.5vw] lg:text-[1.1vw] max-w-[90%] lg:max-w-[60%] whitespace-pre-line ${
                msg.role === 'user' ? 'bg-[#ffffff] text-[#000000]' : 'bg-[#3b3b3b] text-white'
              }`}
            >
              {renderMessageContent(msg.content)}
            </div>
          </motion.div>
        ))}

        {/* Tambahkan indikator loading AI */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-5 flex flex-col items-start"
          >
            <span className="text-[#cccccc] mb-1">Asisten Digital Creativolve</span>
            <div className="text-white rounded-[10px] p-4 text-left text-[3.5vw] lg:text-[1.1vw] max-w-[90%] lg:max-w-[60%] bg-[#3b3b3b]">
              <strong>Membalas...</strong>
            </div>
          </motion.div>
        )}

        {/* Auto scroll ref */}
        <div ref={bottomRef} />
        </div>

        {/* Form tetap di bawah */}
        <form onSubmit={handleSubmit} className="pb-17">
          <textarea
          ref={textareaRef}
            rows={1}
            value={question}
            onInput={handleInput}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Tanyakan sesuatu..."
            className="w-full p-2 rounded bg-white text-black focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-4 py-2 px-6 text-white border-white border rounded-full max-w-[400px] cursor-pointer w-fitt hover:bg-[white] hover:text-[#262626] active:bg-[white] active:text-[#262626]"
            style={{ lineHeight: '24px', maxHeight: `${24 * 5}px`, minHeight: `${24}px` }}
          >
            {loading ? 'Menjawab...' : 'Tanya'}
          </button>
        </form>
      </div>
    </>
  );
}

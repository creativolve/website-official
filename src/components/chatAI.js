"use client";

import '@/css/globals.css'
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ChatAI() {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

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
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Area pesan, yang bisa di-scroll */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-hide no-scrollbar">
        {messages.length === 0 ? (
          // Teks dengan transisi fade jika belum ada pesan
          <motion.h1
            className="text-center font-semibold text-[4vw] lg:text-[1.1vw] text-[#cccccc] mt-17"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Mulai percakapan baru dengan mengajukan pertanyaan!
          </motion.h1>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`mt-5 flex flex-col ${
                msg.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <span className="text-[#cccccc] mb-1">
                {msg.role === 'user' ? 'Anda' : 'Asisten Digital Creativolve'}
              </span>
              <div
                className={`text-white rounded-[10px] p-4 text-left  text-[3.5vw] lg:text-[1.1vw]  max-w-[90%] lg:max-w-[60%] whitespace-pre-line ${
                  msg.role === 'user' ? 'bg-[#262626]' : 'bg-[#3b3b3b]'
                }`}
              >
                {renderMessageContent(msg.content)}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Form tetap di bawah */}
      <form onSubmit={handleSubmit} className="pb-4">
        <textarea
          rows="4"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Tanyakan sesuatu..."
          className="w-full p-2 rounded bg-white text-black focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-4 py-2 px-6 text-white border-white border rounded-full w-[30%] cursor-pointer w-fitt"
        >
          {loading ? 'Menjawab...' : 'Tanya'}
        </button>
      </form>
    </div>
  );
}

"use client"

import DOMPurify from 'dompurify';
import { motion } from "framer-motion";
import Image from "next/image"
import Heading from "./heading"
import MinimCard from "./minimCard"
import "@/css/effect.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";

// Hook untuk efek mengetik dengan smart auto scroll
const useTypingEffect = (text, speed = 30, onTextUpdate = null, onTypingComplete = null) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!text) {
      setDisplayedText('');
      return;
    }

    setIsTyping(true);
    setDisplayedText('');
    
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex < text.length) {
        const newText = text.slice(0, currentIndex + 1);
        setDisplayedText(newText);
        
        // Trigger callback untuk auto scroll setiap beberapa karakter
        if (onTextUpdate && currentIndex % 10 === 0) {
          onTextUpdate(newText);
        }
        
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
        // Final callback saat selesai mengetik
        if (onTextUpdate) {
          onTextUpdate(text);
        }
        if (onTypingComplete) {
          onTypingComplete();
        }
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, onTextUpdate, onTypingComplete]);

  return { displayedText, isTyping };
};

// Hook untuk smart auto scroll
const useSmartAutoScroll = (containerRef) => {
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const scrollTimeoutRef = useRef(null);
  const lastScrollTop = useRef(0);

  // Fungsi untuk cek apakah user sedang scroll manual
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
    
    // Jika user scroll ke atas dari posisi terakhir, anggap sebagai manual scroll
    if (scrollTop < lastScrollTop.current && !isAtBottom) {
      setIsUserScrolling(true);
      setShouldAutoScroll(false);
    }
    
    // Jika user scroll kembali ke bawah, aktifkan auto scroll
    if (isAtBottom && isUserScrolling) {
      setIsUserScrolling(false);
      setShouldAutoScroll(true);
    }
    
    lastScrollTop.current = scrollTop;

    // Reset status user scrolling setelah 2 detik tidak ada aktivitas scroll
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      if (isAtBottom) {
        setIsUserScrolling(false);
        setShouldAutoScroll(true);
      }
    }, 2000);
  }, [isUserScrolling, containerRef]);

  // Fungsi untuk smooth scroll ke bawah
  const scrollToBottom = useCallback((behavior = 'smooth') => {
    const container = containerRef.current;
    if (!container || !shouldAutoScroll) return;

    const { scrollHeight, clientHeight } = container;
    container.scrollTo({
      top: scrollHeight - clientHeight,
      behavior: behavior
    });
  }, [shouldAutoScroll]);

  // Fungsi untuk force scroll (untuk pesan baru)
  const forceScrollToBottom = useCallback((behavior = 'smooth') => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollHeight, clientHeight } = container;
    container.scrollTo({
      top: scrollHeight - clientHeight,
      behavior: behavior
    });
    
    // Reset status untuk auto scroll
    setIsUserScrolling(false);
    setShouldAutoScroll(true);
  }, []);

  return {
    isUserScrolling,
    shouldAutoScroll,
    scrollToBottom,
    forceScrollToBottom,
    handleScroll
  };
};

// Komponen untuk menampilkan pesan AI dengan efek mengetik
const AIMessage = ({ content, timestamp, isLatest, onTextUpdate, hasTyped, onTypingComplete }) => {
  const { displayedText, isTyping } = useTypingEffect(
    (isLatest && !hasTyped) ? content : "", 
    30, 
    (isLatest && !hasTyped) ? onTextUpdate : null,
    (isLatest && !hasTyped) ? onTypingComplete : null
  );
  
  // Jika pesan sudah pernah di-type atau bukan pesan terbaru, tampilkan langsung
  const textToShow = (isLatest && !hasTyped) ? displayedText : content;

  // Function untuk parsing dan rendering yang sama seperti sebelumnya
  const escapeHtml = (unsafe) => {
    if (!unsafe || typeof unsafe !== 'string') return '';
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const isValidUrl = (string) => {
    try {
      const url = new URL(string);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
      return false;
    }
  };

  const validateLength = (text, maxLength = 200) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
  };

  const parseCodeBlocks = (text) => {
    const codeBlockRegex = /```(\w*)\n?([\s\S]*?)```/g;
    return text.replace(codeBlockRegex, (match, language, code) => {
      const safeLang = escapeHtml((language || 'text').substring(0, 20));
      const safeCode = escapeHtml(code.trim());
      return `<pre class="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code class="language-${safeLang}">${safeCode}</code></pre>`;
    });
  };

  const parseInlineCode = (text) => {
    return text.replace(/`([^`]+)`/g, (match, code) => {
      const safeCode = escapeHtml(code);
      return `<code class="bg-gray-200 text-gray-800 px-1 py-0.5 rounded text-sm">${safeCode}</code>`;
    });
  };

  const parseHeaders = (text) => {
    if (!text || typeof text !== 'string') return '';

    const lines = text.split('\n');
    const result = [];

    lines.forEach(line => {
      const trimmedLine = line.trim();
      
      if (!trimmedLine) {
        result.push('');
        return;
      }

      let headerMatch = null;
      let headerLevel = 0;
      let headerText = '';
      let headerClass = '';

      if (trimmedLine.match(/^#{6}\s+(.+)$/)) {
        headerMatch = trimmedLine.match(/^#{6}\s+(.+)$/);
        headerLevel = 6;
        headerClass = 'text-sm font-bold text-white mb-1 mt-2';
      } else if (trimmedLine.match(/^#{5}\s+(.+)$/)) {
        headerMatch = trimmedLine.match(/^#{5}\s+(.+)$/);
        headerLevel = 5;
        headerClass = 'text-base font-bold text-white mb-1 mt-2';
      } else if (trimmedLine.match(/^#{4}\s+(.+)$/)) {
        headerMatch = trimmedLine.match(/^#{4}\s+(.+)$/);
        headerLevel = 4;
        headerClass = 'text-lg font-bold text-white mb-1 mt-2';
      } else if (trimmedLine.match(/^#{3}\s+(.+)$/)) {
        headerMatch = trimmedLine.match(/^#{3}\s+(.+)$/);
        headerLevel = 3;
        headerClass = 'text-xl font-bold text-white mb-2 mt-3';
      } else if (trimmedLine.match(/^#{2}\s+(.+)$/)) {
        headerMatch = trimmedLine.match(/^#{2}\s+(.+)$/);
        headerLevel = 2;
        headerClass = 'text-2xl font-bold text-white mb-2 mt-3';
      } else if (trimmedLine.match(/^#{1}\s+(.+)$/)) {
        headerMatch = trimmedLine.match(/^#{1}\s+(.+)$/);
        headerLevel = 1;
        headerClass = 'text-3xl font-bold text-white mb-3 mt-4';
      }

      if (headerMatch && headerLevel > 0) {
        headerText = validateLength(headerMatch[1].trim(), 200);
        const safeHeaderText = escapeHtml(headerText);
        result.push(`<h${headerLevel} class="${headerClass}">${safeHeaderText}</h${headerLevel}>`);
      } else {
        result.push(line);
      }
    });

    return result.join('\n');
  };

  const parseTextFormatting = (text) => {
    text = text.replace(/\*\*(.*?)\*\*/g, (match, content) => {
      const safeContent = escapeHtml(content);
      return `<strong class="font-bold text-white">${safeContent}</strong>`;
    });
    
    text = text.replace(/\*(.*?)\*/g, (match, content) => {
      const safeContent = escapeHtml(content);
      return `<em class="italic text-gray-300">${safeContent}</em>`;
    });
    
    text = text.replace(/~~(.*?)~~/g, (match, content) => {
      const safeContent = escapeHtml(content);
      return `<del class="line-through text-gray-400">${safeContent}</del>`;
    });
    
    return text;
  };

  const formatTextWithLinks = (text) => {
    if (!text || typeof text !== 'string') return '';

    let formatted = text;

    formatted = formatted.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      (match, label, url) => {
        if (!isValidUrl(url) || url.length > 500) {
          return escapeHtml(match);
        }
        
        const cleanLabel = validateLength(label, 100);
        const safeLabel = escapeHtml(cleanLabel);
        const safeUrl = escapeHtml(url);
        
        return `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">${safeLabel}</a>`;
      }
    );

    formatted = formatted.replace(
      /(?<!href=["'])(https?:\/\/[^\s<>&"']+[^\s<>&"'.,;!?])/g,
      (url) => {
        if (!isValidUrl(url) || url.length > 500) {
          return escapeHtml(url);
        }
        
        try {
          const urlObj = new URL(url);
          let displayText = urlObj.hostname + urlObj.pathname;
          displayText = displayText.replace(/\/$/, '');
          displayText = validateLength(displayText, 50);
          
          const safeDisplayText = escapeHtml(displayText);
          const safeUrl = escapeHtml(url);
          
          return `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">${safeDisplayText}</a>`;
        } catch (_) {
          return escapeHtml(url);
        }
      }
    );

    return formatted;
  };

  const parseMessageContent = (content) => {
    if (!content || typeof content !== 'string') return '';

    let formatted = content;

    formatted = parseCodeBlocks(formatted);
    formatted = parseInlineCode(formatted);
    formatted = parseHeaders(formatted);
    formatted = parseTextFormatting(formatted);
    formatted = formatTextWithLinks(formatted);
    formatted = formatted.replace(/\n/g, '<br>');

    return formatted;
  };

  const renderMessageContent = (content) => {
    if (!content) return null;
  
    try {
      const parsed = parseMessageContent(content);
      const safe = DOMPurify.sanitize(parsed, {
        ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'strong', 'em', 'del', 'code', 'pre', 'a', 'ul', 'ol', 'li', 'blockquote', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'div', 'hr'],
        ALLOWED_ATTR: ['class', 'href', 'target', 'rel']
      });
      return <div dangerouslySetInnerHTML={{ __html: safe }} />;
    } catch (error) {
      console.error('Error rendering message:', error);
      return <div className="text-red-400">Error menampilkan pesan</div>;
    }
  };

  return (
    <div className="bg-[transparent] text-[#cccccc] max-w-[100%]">
      {renderMessageContent(textToShow)}
      {isTyping && (
        <span className="inline-block w-2 h-5 ml-1 bg-white animate-pulse">|</span>
      )}
    </div>
  );
};

export default function ChatAI() {
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const [typedMessages, setTypedMessages] = useState(new Set()); // Track pesan yang sudah selesai typing

    const textareaRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const topRef = useRef(null);

    // Gunakan smart auto scroll hook
    const { 
      isUserScrolling, 
      shouldAutoScroll, 
      scrollToBottom, 
      forceScrollToBottom, 
      handleScroll 
    } = useSmartAutoScroll(messagesContainerRef);

    const handleInput = (e) => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = Math.min(textarea.scrollHeight, 24 * 5) + "px";
      }
      setQuestion(e.target.value);
    };

    // Callback untuk typing update dengan throttling
    const handleTypingUpdate = useCallback((text) => {
      // Auto scroll terus jalan tanpa memperhatikan user scroll saat typing
      scrollToBottom();
    }, [scrollToBottom]);

    // Callback saat typing selesai
    const handleTypingComplete = useCallback((messageIndex) => {
      setTypedMessages(prev => new Set([...prev, messageIndex]));
    }, []);

    // Auto scroll saat ada pesan baru
    useEffect(() => {
      if (messages.length > 0) {
        // Delay sedikit untuk memastikan DOM ter-render
        setTimeout(() => {
          forceScrollToBottom();
        }, 100);
      }
    }, [messages.length, forceScrollToBottom]);

    // Scroll to top saat pertama kali load
    useEffect(() => {
      if (messages.length === 0) {
        topRef.current?.scrollIntoView({ behavior: "auto" });
      }
    }, [messages.length]);
    
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea && question === "") {
            textarea.style.height = "auto";
        }
    }, [question]);

    const sanitizeInput = (input) => {
      if (!input || typeof input !== 'string') return '';
      
      const maxLength = 5000;
      const sanitized = input.trim();
      
      if (sanitized.length > maxLength) {
        return sanitized.substring(0, maxLength);
      }
      
      return sanitized;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const sanitizedQuestion = sanitizeInput(question);
        if (!sanitizedQuestion) return;

        const userTimestamp = new Date().toISOString();
        setLoading(true);

        const newMessage = {
            role: "user",
            content: sanitizedQuestion,
            timestamp: userTimestamp,
        };

        const textarea = textareaRef.current;
        if (textarea) {
          textarea.style.height = "auto";
        }

        setQuestion("");
        setMessages((prev) => [...prev, newMessage]);

        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 30000);

          const res = await fetch("/api/modelAI/asistenDigital", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ question: sanitizedQuestion }),
            signal: controller.signal
          });

          clearTimeout(timeoutId);
          const data = await res.json();

          if (res.ok && data) {
                const aiTimestamp = data.timestamp || new Date().toISOString();
                
                setMessages(prev => [...prev, {
                    role: "ai",
                    content: sanitizeAIResponse(data.reply),
                    timestamp: aiTimestamp,
                    modelUsed: data.modelUsed
                }]);
          } else {
            setMessages(prev => [...prev, {
                role: "ai",
                content: "Maaf, terjadi kesalahan dalam memproses permintaan Anda.",
                timestamp: new Date().toISOString()
            }]);        
          }
        } catch (err) {
            console.error('Chat error:', err);
            setMessages(prev => [...prev, {
                role: "ai",
                content: "Koneksi terputus atau terjadi kesalahan jaringan.",
                timestamp: new Date().toISOString()
            }]);
        }

        setLoading(false);
    };

    const sanitizeAIResponse = (content) => {
      if (!content || typeof content !== 'string') return 'Response tidak valid';
      
      const maxLength = 20000;
      if (content.length > maxLength) {
        return content.substring(0, maxLength) + '\n\n[Response dipotong karena terlalu panjang]';
      }
      
      return content;
    };

    return(
        <>
             <div className="flex mt-[-65px] py-10 h-[77vh] overflow-hidden flex-col lg:px-4">
         <div 
          ref={messagesContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto lg:p-4 scrollbar-hide no-scrollbar scroll-smooth"
        >

            <div className="flex flex-col justify-center items-center gap-7">
                {messages.length === 0 && !loading && (
                    <>
                    <div ref={topRef}></div>
                    <Image
                        src="/images/ChatAI/avatars.png"
                        alt="avatars"
                        width={600}
                        height={600}
                        quality={100}
                        className="w-[clamp(7rem,9vw,10rem)]"
                    />
                    <div className="lg:w-[70%]">
                        <Heading index={8} paragraft="center" />
                    </div>
                    <MinimCard />
                    </>
                )}
            </div>

                {messages.map((msg, i) => (
                    <motion.div
                    key={`${msg.timestamp}-${i}`}
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.3, ease: "easeOut" }} 
                    className={`mt-10 w-full flex flex-col overflow-hidden ${
                        msg.role === "user" ? "chat chat-end" : "items-start"
                    }`}
                    >
                    <span className="text-[clamp(0.8rem,1vw,1.4rem)] text-[white] mb-1">
                    {msg.role !== 'user' && (
                          <div className="text-[clamp(0.6rem,1vw,0.9rem)] text-[#c5c5c5]">
                            <div className="inline-grid *:[grid-area:1/1]">
                              <div className="status status-info animate-ping"></div>
                              <div className="status status-info"></div>
                            </div> AI Aktif Dengan Baik
                          </div>
                        )}

                        {msg.role === "user" ? "Anda - " : "Asisten Digital - "}
                        <time className="text-white opacity-40">
                         {new Date(msg.timestamp).toLocaleString("id-ID", {
                            weekday: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                        </time>
                    </span>
                    
                    <div
                        className={`rounded-[10px] text-left text-[clamp(0.9rem,1vw,1rem)] ${
                        msg.role === "user"
                            ? "chat-bubble bg-[#ffffff] w-fit text-[#414141]"
                            : ""
                        }`}
                    >
                        {msg.role === "ai" ? (
                          <AIMessage 
                            content={msg.content} 
                            timestamp={msg.timestamp}
                            isLatest={i === messages.length - 1}
                            onTextUpdate={i === messages.length - 1 ? handleTypingUpdate : undefined}
                            hasTyped={typedMessages.has(i)}
                            onTypingComplete={() => handleTypingComplete(i)}
                          />
                        ) : (
                          msg.content
                        )}
                    </div>
                    </motion.div>
                ))}

        {loading && (
                    <motion.div
                    key="loading-indicator"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="mt-5 flex flex-col items-start"
                    >
                    <div className="text-white rounded-[10px] p-4 text-left text-[3.5vw] lg:text-[1.1vw] max-w-[90%] lg:max-w-[60%] bg-transparent">
                    <div className="flex flex-col">
                        <div className="text-[clamp(0.6rem,1vw,0.9rem)]">
                          <div className="status status-success animate-bounce"></div> Sedang Membalas
                        </div>
                        <span className="loading loading-infinity text-success loading-xl"></span>
                      </div>
                    </div>
                    </motion.div>
                )}
                </div>

                {/* Scroll to bottom button (muncul saat user scroll up) */}
                {isUserScrolling && (
                  <motion.button
                    key="scroll-to-bottom"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    onClick={() => forceScrollToBottom()}
                    className="fixed bottom-32 right-8 background-gradient text-white p-3 rounded-full shadow-lg transition-all duration-200 z-10"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </motion.button>
                )}
         </div>

        <div className="fixed w-[80%] left-[50%] translate-x-[-50%] bottom-10">
        <form onSubmit={handleSubmit} className="relative">
          <div className="bg-white rounded-xl flex items-center overflow-hidden">
            <textarea
            ref={textareaRef}
            rows={1}
            value={question}
            onInput={handleInput}
            onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            onChange={(e) => setQuestion(e.target.value)}
              placeholder="Tulis Sesuatu"
              maxLength={5000}
              className="flex-1 p-4 text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none resize-none text-base min-h-[60px]"
            />
            
            <button
            type="submit"
            disabled={loading || !question.trim()}
              className="flex items-center justify-center w-12 h-12 m-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <FontAwesomeIcon icon={faPaperPlane} className="w-4 h-4" />
            </button>
          </div>
      </form>
        </div>
        </>
    )
}
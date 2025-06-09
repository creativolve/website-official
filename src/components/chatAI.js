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
import { useState, useRef, useEffect } from "react";

export default function ChatAI() {
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);

    const textareaRef = useRef(null);

    const handleInput = (e) => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = Math.min(textarea.scrollHeight, 24 * 5) + "px";
      }
      setQuestion(e.target.value);
    };
  
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea && question === "") {
            textarea.style.height = "auto";
        }
    }, [question]);

    // Sanitasi input untuk mencegah injection
    const sanitizeInput = (input) => {
      if (!input || typeof input !== 'string') return '';
      
      // Batasi panjang input
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
          textarea.style.height = "auto"; // Reset
        }

        setQuestion("");
        setMessages((prev) => [...prev, newMessage]);

        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 detik timeout

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

    // Sanitasi response AI
    const sanitizeAIResponse = (content) => {
      if (!content || typeof content !== 'string') return 'Response tidak valid';
      
      // Batasi panjang response
      const maxLength = 20000;
      if (content.length > maxLength) {
        return content.substring(0, maxLength) + '\n\n[Response dipotong karena terlalu panjang]';
      }
      
      return content;
    };

    // Helper function untuk escape HTML entities
    const escapeHtml = (unsafe) => {
        if (!unsafe || typeof unsafe !== 'string') return '';
        return unsafe
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
    };

    // Helper function untuk validasi URL
    const isValidUrl = (string) => {
      try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
      } catch (_) {
        return false;
      }
    };

    // Helper function untuk validasi panjang teks
    const validateLength = (text, maxLength = 200) => {
      if (!text) return '';
      return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
    };

    // 1. Code Blocks - AMAN
    const parseCodeBlocks = (text) => {
      const codeBlockRegex = /```(\w*)\n?([\s\S]*?)```/g;
      return text.replace(codeBlockRegex, (match, language, code) => {
        const safeLang = escapeHtml((language || 'text').substring(0, 20));
        const safeCode = escapeHtml(code.trim());
        return `<pre class="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code class="language-${safeLang}">${safeCode}</code></pre>`;
      });
    };

    // 2. Inline Code - AMAN
    const parseInlineCode = (text) => {
      return text.replace(/`([^`]+)`/g, (match, code) => {
        const safeCode = escapeHtml(code);
        return `<code class="bg-gray-200 text-gray-800 px-1 py-0.5 rounded text-sm">${safeCode}</code>`;
      });
    };

    // 3. Headers - DIPERBAIKI
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

        // Header patterns dengan escape yang benar
        let headerMatch = null;
        let headerLevel = 0;
        let headerText = '';
        let headerClass = '';

        // Check untuk setiap level header
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

    // 4. Horizontal Rules - AMAN
    const parseHorizontalRules = (text) => {
      return text.replace(/^---+$/gm, '<hr class="my-4 border-gray-500">');
    };

    // 5. Blockquotes - AMAN
    const parseBlockquotes = (text) => {
      const lines = text.split('\n');
      const result = [];
      let blockquoteContent = [];

      const flushBlockquote = () => {
        if (blockquoteContent.length > 0) {
          const safeContent = blockquoteContent.map(line => escapeHtml(line)).join('<br>');
          result.push(`<blockquote class="border-l-4 border-gray-500 pl-4 py-2 my-4 bg-gray-800 text-gray-300 italic">${safeContent}</blockquote>`);
          blockquoteContent = [];
        }
      };

      lines.forEach(line => {
        const match = line.match(/^>\s*(.*)$/);
        if (match) {
          blockquoteContent.push(match[1]);
        } else {
          flushBlockquote();
          result.push(line);
        }
      });

      flushBlockquote();
      return result.join('\n');
    };

    // 6. Tables - AMAN
    const parseMarkdownTables = (text) => {
      const lines = text.split('\n');
      const tableRegex = /^\s*\|(.+)\|\s*$/;
      const separatorRegex = /^\s*\|([:-\s|]+)\|\s*$/;

      let inTable = false;
      let tableHtml = '';
      const output = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (tableRegex.test(line)) {
          const cells = line.split('|').slice(1, -1).map(cell => escapeHtml(cell.trim()));

          if (!inTable) {
            inTable = true;
            tableHtml += '<div class="overflow-x-auto my-4"><table class="min-w-full border border-gray-600 rounded-lg"><thead class="bg-gray-700">';
            tableHtml += '<tr>' + cells.map(c => `<th class="border border-gray-600 px-4 py-2 text-left text-white font-semibold">${c}</th>`).join('') + '</tr>';
            tableHtml += '</thead><tbody>';
          } else if (separatorRegex.test(line)) {
            continue;
          } else {
            tableHtml += '<tr class="hover:bg-gray-800">' + cells.map(c => `<td class="border border-gray-600 px-4 py-2 text-gray-300">${c}</td>`).join('') + '</tr>';
          }
        } else {
          if (inTable) {
            tableHtml += '</tbody></table></div>';
            output.push(tableHtml);
            tableHtml = '';
            inTable = false;
          }
          output.push(line);
        }
      }

      if (inTable) {
        tableHtml += '</tbody></table></div>';
        output.push(tableHtml);
      }

      return output.join('\n');
    };

    // 7. Lists - AMAN
    const parseLists = (text) => {
      const lines = text.split('\n');
      const result = [];
      let inOrderedList = false;
      let inUnorderedList = false;
      let listItems = [];

      const flushOrderedList = () => {
        if (listItems.length > 0) {
          result.push(`<ol class="list-decimal list-inside mb-10 ml-4 space-y-1">${listItems.join('')}</ol>`);
          listItems = [];
        }
      };

      const flushUnorderedList = () => {
        if (listItems.length > 0) {
          result.push(`<ul class="list-disc list-inside mb-8 ml-4 space-y-1">${listItems.join('')}</ul>`);
          listItems = [];
        }
      };

      lines.forEach(line => {
        const numbered = line.match(/^\s*(\d+)\.\s+(.+)$/);
        const bullet = line.match(/^\s*[-*+]\s+(.+)$/);

        if (numbered) {
          if (inUnorderedList) flushUnorderedList();
          inUnorderedList = false;
          inOrderedList = true;
          const safeContent = escapeHtml(numbered[2]);
          listItems.push(`<li class="text-gray-300 mb-1">${safeContent}</li>`);
        } else if (bullet) {
          if (inOrderedList) flushOrderedList();
          inOrderedList = false;
          inUnorderedList = true;
          const safeContent = escapeHtml(bullet[1]);
          listItems.push(`<li class="text-gray-300 mb-1">${safeContent}</li>`);
        } else {
          if (inOrderedList) flushOrderedList();
          if (inUnorderedList) flushUnorderedList();
          inOrderedList = inUnorderedList = false;
          result.push(line);
        }
      });

      if (inOrderedList) flushOrderedList();
      if (inUnorderedList) flushUnorderedList();

      return result.join('\n');
    };

    // 8. Text Formatting - AMAN
    const parseTextFormatting = (text) => {
      // Bold
      text = text.replace(/\*\*(.*?)\*\*/g, (match, content) => {
        const safeContent = escapeHtml(content);
        return `<strong class="font-bold text-white">${safeContent}</strong>`;
      });
      
      // Italic
      text = text.replace(/\*(.*?)\*/g, (match, content) => {
        const safeContent = escapeHtml(content);
        return `<em class="italic text-gray-300">${safeContent}</em>`;
      });
      
      // Strikethrough
      text = text.replace(/~~(.*?)~~/g, (match, content) => {
        const safeContent = escapeHtml(content);
        return `<del class="line-through text-gray-400">${safeContent}</del>`;
      });
      
      return text;
    };

    // 9. Links - AMAN dengan validasi ketat
    const formatTextWithLinks = (text) => {
      if (!text || typeof text !== 'string') return '';

      let formatted = text;

      // 1. Proses markdown-style links: [label](url)
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

      // 2. Proses plain URLs
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

    // 10. Paragraphs - AMAN
    const isBlockElement = (line) => /^<(h[1-6]|ul|ol|li|pre|blockquote|table|div|hr)/.test(line);

    const parseParagraphs = (text) => {
      const lines = text.split('\n');
      const result = [];
      let paragraphBuffer = [];

      const flushParagraph = () => {
        if (paragraphBuffer.length > 0) {
          const content = paragraphBuffer.join(' ').trim();
          if (content && !isBlockElement(content)) {
            result.push(`<p class="mb-2">${content}</p>`);
          } else {
            result.push(content);
          }
          paragraphBuffer = [];
        }
      };

      lines.forEach((line) => {
        if (line.trim() === '') {
          flushParagraph();
        } else {
          paragraphBuffer.push(line);
        }
      });

      flushParagraph();
      return result.join('\n');
    };

    // PARSER UTAMA - DIPERBAIKI
    const parseMessageContent = (content) => {
      if (!content || typeof content !== 'string') return '';

      let formatted = content;

      // Parsing sequence yang benar - TANPA double escape/unescape
      formatted = parseCodeBlocks(formatted);
      formatted = parseInlineCode(formatted);
      formatted = parseHeaders(formatted); // Headers di-parse sebelum escape
      formatted = parseHorizontalRules(formatted);
      formatted = parseBlockquotes(formatted);
      formatted = parseMarkdownTables(formatted);
      formatted = parseLists(formatted);
      formatted = parseTextFormatting(formatted);
      formatted = formatTextWithLinks(formatted);
      formatted = parseParagraphs(formatted);

      // Replace newlines terakhir
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
    

    return(
        <>
             <div
      className="flex mt-[-65px] py-10 h-[77vh] overflow-hidden flex-col lg:px-4"
    >
         <div className="flex-1 overflow-y-auto p-4 scrollbar-hide no-scrollbar">

            {/* TAMPILAN AWAL */}
            <div className="flex flex-col justify-center items-center gap-7">
                {messages.length === 0 && !loading && (
                    <>
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
                    key={i}
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }} 
                    transition={{ duration: 0.5 }} 
                    className={`mt-10 w-full flex flex-col overflow-hidden ${
                        msg.role === "user" ? "chat chat-end" : "items-start"
                    }`}
                    >
                    <span className="text-[clamp(0.8rem,1vw,1.4rem)] text-white mb-1">
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
                            ? "chat-bubble bg-[#ffffff] text-black min-w-[100px]"
                            : "bg-[transparent] text-[#cccccc] max-w-[100%]"
                        }`}
                    >
                        {renderMessageContent(msg.content)}
                    </div>
                    </motion.div>
                ))}

        {loading && (
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mt-5 flex flex-col items-start"
                    >
                    <div className="text-white rounded-[10px] p-4 text-left text-[3.5vw] lg:text-[1.1vw] max-w-[90%] lg:max-w-[60%] bg-[#171717]">
                        <strong className="text-loading">
                        Membalas...
                        </strong>
                    </div>
                    </motion.div>
                )}

                <div ref={bottomRef} />
                </div>
         </div>

      {/* INPUT */}
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
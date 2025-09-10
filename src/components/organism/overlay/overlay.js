"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

// Helper function untuk render notion blocks
// Helper function untuk render Notion blocks
function renderNotionBlock(block) {
  if (!block || !block.type) return null;

  // Reusable rich text renderer
  const renderRichText = (richTextArray) =>
    richTextArray?.map((text, i) => (
      <span
        key={i}
        className={`
          ${text.annotations?.bold ? "font-bold" : ""}
          ${text.annotations?.italic ? "italic" : ""}
          ${text.annotations?.underline ? "underline" : ""}
          ${text.annotations?.strikethrough ? "line-through" : ""}
          ${text.annotations?.code ? "bg-gray-700 px-1 rounded font-mono text-sm" : ""}
        `}
      >
        {text.plain_text}
      </span>
    ));

  switch (block.type) {
    // 📝 Paragraph
    case "paragraph":
      if (!block.paragraph?.rich_text || block.paragraph.rich_text.length === 0) {
        return <div className="mb-2"></div>; // empty paragraph
      }
      return (
        <p className="mb-4 text-gray-300 leading-relaxed">
          {renderRichText(block.paragraph.rich_text)}
        </p>
      );

    // 🔠 Heading 1
    case "heading_1":
      return (
        <h1 className="text-2xl font-bold mb-4 text-white">
          {renderRichText(block.heading_1?.rich_text || [])}
        </h1>
      );

    // 🔠 Heading 2
    case "heading_2":
      return (
        <h2 className="text-xl font-semibold mb-3 text-white">
          {renderRichText(block.heading_2?.rich_text || [])}
        </h2>
      );

    // 🔠 Heading 3
    case "heading_3":
      return (
        <h3 className="text-lg font-semibold mb-2 text-white">
          {renderRichText(block.heading_3?.rich_text || [])}
        </h3>
      );

    // 📌 Bulleted List
    case "bulleted_list_item":
      return (
        <div className="mb-2 text-gray-300 flex">
          <span className="mr-2">•</span>
          <span>{renderRichText(block.bulleted_list_item?.rich_text || [])}</span>
        </div>
      );

    // 🔢 Numbered List
    case "numbered_list_item":
      return (
        <div className="mb-2 text-gray-300 ml-4">
          {renderRichText(block.numbered_list_item?.rich_text || [])}
        </div>
      );

    // ──────────────── Special Blocks ────────────────

    // ➖ Divider
    case "divider":
      return <hr className="my-6 border-gray-600" />;

    // 💬 Quote
    case "quote":
      return (
        <blockquote className="border-l-4 border-blue-500 pl-4 my-4 text-gray-300 italic">
          {renderRichText(block.quote?.rich_text || [])}
        </blockquote>
      );

    // 📊 Table
    case "table":
      if (!block.rows || block.rows.length === 0) {
        return <p className="text-yellow-400 text-sm">Tabel kosong</p>;
      }
      return (
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border border-gray-700 text-gray-300 text-sm">
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={row.id || rowIndex} className="border-b border-gray-700">
                  {row.table_row?.cells?.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-3 py-2 align-top">
                      {cell.map((c, i) => (
                        <span
                          key={i}
                          className={`
                            ${c.annotations?.bold ? "font-bold" : ""}
                            ${c.annotations?.italic ? "italic" : ""}
                            ${c.annotations?.underline ? "underline" : ""}
                            ${c.annotations?.strikethrough ? "line-through" : ""}
                            ${c.annotations?.code ? "bg-gray-700 px-1 rounded font-mono text-sm" : ""}
                          `}
                        >
                          {c.plain_text}
                        </span>
                      ))}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    // 💻 Code block
    case "code":
      return (
        <pre className="bg-gray-800 p-4 rounded-lg mb-4 overflow-x-auto">
          <code className="text-green-400 text-sm">
            {renderRichText(block.code?.rich_text || [])}
          </code>
        </pre>
      );

    // 📣 Callout
    case "callout":
      return (
        <div className="mb-4 p-4 bg-blue-900/20 border-l-4 border-blue-500 rounded">
          <div className="flex items-start gap-2">
            {block.callout?.icon && (
              <span className="text-lg">{block.callout.icon.emoji || "💡"}</span>
            )}
            <div>{renderRichText(block.callout?.rich_text || [])}</div>
          </div>
        </div>
      );

    // 🔽 Toggle
    case "toggle":
      return (
        <details className="mb-4 bg-gray-800 rounded p-3">
          <summary className="cursor-pointer text-white font-medium">
            {renderRichText(block.toggle?.rich_text || [])}
          </summary>
          <div className="mt-2 text-gray-300">Content available when expanded</div>
        </details>
      );

    // 🖼 Image
    case "image":
      const imageUrl = block.image?.file?.url || block.image?.external?.url;
      if (imageUrl) {
        return (
          <div className="mb-4">
            <img
              src={imageUrl}
              alt={block.image?.caption?.map((c) => c.plain_text).join("") || "Image"}
              className="max-w-full h-auto rounded-lg"
            />
            {block.image?.caption && block.image.caption.length > 0 && (
              <p className="text-sm text-gray-400 mt-2 text-center">
                {block.image.caption.map((c) => c.plain_text).join("")}
              </p>
            )}
          </div>
        );
      }
      return (
        <div className="mb-4 p-4 bg-gray-800 rounded text-gray-400">Image not available</div>
      );

    // 🎥 Video
    case "video":
      return (
        <div className="mb-4 p-4 bg-gray-800 rounded">
          <p className="text-gray-300">
            📹 Video: {block.video?.caption?.map((c) => c.plain_text).join("") || "Video content"}
          </p>
        </div>
      );

    // 📎 File
    case "file":
      return (
        <div className="mb-4 p-3 bg-gray-800 rounded flex items-center gap-2">
          <span>📄</span>
          <span className="text-gray-300">{block.file?.name || "File attachment"}</span>
        </div>
      );

    // 🔗 Bookmark
    case "bookmark":
      return (
        <div className="mb-4 p-4 bg-gray-800 rounded border border-gray-600">
          <p className="text-blue-400">🔗 {block.bookmark?.url || "Bookmark"}</p>
          {block.bookmark?.caption && (
            <p className="text-gray-300 text-sm mt-1">
              {block.bookmark.caption.map((c) => c.plain_text).join("")}
            </p>
          )}
        </div>
      );

    // 📥 Embed
    case "embed":
      return (
        <div className="mb-4 p-4 bg-gray-800 rounded border border-gray-600">
          <p className="text-purple-400">
            🎬 Embedded content: {block.embed?.url || "Embed"}
          </p>
        </div>
      );

    // ❓ Default / Unknown block
    default:
      return (
        <div className="mb-2 p-3 bg-gray-800 rounded text-gray-400 text-sm">
          <p>
            Block type: <span className="text-yellow-400">{block.type}</span>
          </p>
          {block.id && <p className="text-xs text-gray-500 mt-1">ID: {block.id}</p>}
        </div>
      );
  }
}


export default function LayananOverlay({ services }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  // Listen untuk click pada button dengan data-service menggunakan event delegation
  useEffect(() => {
    const handleDocumentClick = (e) => {
      // Cari element yang memiliki data-service, termasuk parent elements
      let target = e.target;
      let serviceCategory = null;
      
      // Traverse up sampai ketemu data-service atau sampai document
      while (target && target !== document) {
        serviceCategory = target.getAttribute('data-service');
        if (serviceCategory) break;
        target = target.parentElement;
      }
      
      if (serviceCategory) {
        console.log('🎯 Button clicked with service:', serviceCategory);
        console.log('📋 Available services:', services.map(s => s.category));
        
        const service = services.find(s => 
          s.category?.toLowerCase() === serviceCategory.toLowerCase()
        );
        
        if (service) {
  console.log('✅ Service found:', service);

  const idx = services.findIndex(
    (s) => s.category?.toLowerCase() === serviceCategory.toLowerCase()
  );

  if (idx !== -1) {
    setCurrentService(service);
    setCurrentServiceIndex(idx);
    setIsOpen(true);
  } else {
    console.log("⚠️ Service ditemukan tapi index tidak valid");
  }

} else {
  console.log('❌ Service not found for category:', serviceCategory);
}

      }
    };

    // Event delegation - listen di document level
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [services]);

  const nextService = () => {
    const nextIndex = (currentServiceIndex + 1) % services.length;
    setCurrentService(services[nextIndex]);
    setCurrentServiceIndex(nextIndex);
  };

  const prevService = () => {
    const prevIndex = currentServiceIndex === 0 ? services.length - 1 : currentServiceIndex - 1;
    setCurrentService(services[prevIndex]);
    setCurrentServiceIndex(prevIndex);
  };

  if (!isOpen || !currentService) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4">
      {/* BACKDROP CLICK */}
      <div
        onClick={() => setIsOpen(false)}
        className="absolute inset-0"
      />

      {/* POPUP CARD */}
      <div className="relative bg-[#202125] rounded-2xl shadow-2xl w-[90%] max-w-4xl max-h-[85vh] animate-fadeIn text-white overflow-hidden">
        {/* HEADER */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <div className="flex items-center gap-4">
            
            <div>
              <h2 className="text-2xl font-bold">
                {currentService.name}
              </h2>
            </div>

          </div>

          {/* CLOSE BUTTON */}
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-300 hover:text-white p-2"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* BASIC INFO */}  

          {/* NOTION BLOCKS CONTENT */}
          {currentService.blocks && currentService.blocks.length > 0 && (
            <div className="border-t border-gray-700 pt-6">
              <div className="space-y-2">
                {currentService.blocks.map((block, index) => (
                  <div key={index}>
                    {renderNotionBlock(block)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {(!currentService.blocks || currentService.blocks.length === 0) && (
            <div className="text-center text-gray-500 py-8">
              <p>Detail layanan akan segera ditambahkan...</p>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-4 bg-[#202125]">
          <div className="flex justify-center gap-4">
            <span className="text-sm text-gray-400">
                Skema Harga Creativolve Agency 2025
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
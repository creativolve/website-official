"use client";

const FormAssistant = ({
  formData,
  currentQuestion,
  answers,
  inputValue,
  onInputChange,
  onSubmit,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  editValue,
  onEditValueChange,
  editingIndex,
  isProcessing,
  onCancel,
}) => {
  return (
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
            <i>
              {formData.name} ({formData.businessName})
            </i>
          </strong>{" "}
          Anda memilih layanan{" "}
          <strong>
            <i>{formData.kategori.map((item) => item.label).join(", ")}</i>
          </strong>{" "}
          <br /> <br />
          Saya Asisten Digital Creativolve yang akan membantu kamu dalam membuat
          brief, silahkan jawab pertanyaan berikut untuk membuat brief yang tepat
          untuk kamu
        </p>
        <br />
        
        {/* Pertanyaan saat ini */}
        <div className="bot-message rounded-lg">
          <p>
            <strong>{currentQuestion}</strong>
          </p>
        </div>

        {/* Jawaban yang sudah diberikan */}
        {answers.map((item, index) => (
          <div key={index} className="message-group space-y-2">
            <div className="user-message px-4 py-3 bg-[#ffffff] rounded-[10px] text-[#262626]">
              {editingIndex === index ? (
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => onEditValueChange(e.target.value)}
                    className="p-2 border border-gray-300 rounded text-black"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={onSaveEdit}
                      className="px-3 py-1 bg-[#262626] text-white rounded hover:bg-[#cfcfcf] hover:text-[#262626] border-none"
                    >
                      Simpan
                    </button>
                    <button
                      onClick={onCancelEdit}
                      className="px-3 py-1 bg-[#555353] text-white rounded hover:bg-[#cfcfcf] hover:text-[#262626] border-none"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center w-full">
                  <span>{item.answer}</span>
                  <button
                    onClick={() => onEdit(index, item.answer)}
                    className="ml-2 text-sm text-blue-500 hover:text-blue-700"
                    aria-label="Edit answer"
                  >
                    ✏️ Edit
                  </button>
                </div>
              )}
            </div>
            <br />
          </div>
        ))}

        {/* Input untuk jawaban */}
        <div className="chat-input flex flex-col space-y-2 mt-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && onSubmit()}
            placeholder="Ketik jawaban Anda..."
            disabled={isProcessing || editingIndex !== null}
            className="p-2 rounded text-[#cccccc] placeholder-white"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onSubmit}
              className="px-4 py-2 bg-[#131313] text-white rounded hover:text-[black] hover:bg-[#ffffff] disabled:bg-[#939393] flex-1"
              disabled={isProcessing || (!inputValue.trim() && editingIndex === null)}
            >
              {isProcessing
                ? "Memproses..."
                : editingIndex !== null
                ? "Menyimpan..."
                : "Kirim"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAssistant;
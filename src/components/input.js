// components/InputFloating.js
const InputFloating = ({ id, label, type, name, value, onChange, disabled, className = "" }) => (
    <div className={`relative w-full ${className}`}>
      <input
      name={name}
        type={type}
        id={id}
        value={value}
        onChange={onChange} 
        placeholder=" "
        className="peer w-full border-b border-[#ffffff] bg-transparent py-2 text-white placeholder-transparent focus:outline-none"
        required
        disabled={disabled}
      />
      <label
        htmlFor={id}
        className="absolute left-0 top-[-30] text-sm text-white transition-all
          peer-placeholder-shown:top-[-7] peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
          peer-focus:top-[-30] peer-focus:text-sm peer-focus:text-white"
      >
        {label}
      </label>
    </div>
  );
  
  export default InputFloating;
  
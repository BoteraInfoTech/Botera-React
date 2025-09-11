export default function TextBox({
  type = "text",
  placeholder,
  label,
  className = "",
  required = false,
  onChange,
  error,
  handleOnBlur,
  isFullWidth,
  value,
  isReadOnly,
}) {
  return (
    <div className={`space-y-1 ${!isFullWidth ? "md:w-[48%]" : ""} w-full`}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className={`border ${
          error ? "border-red-500" : "border-gray-300"
        } p-3 pr-10 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 ${
          error ? "focus:ring-red-500" : "focus:ring-primary"
        } ${className}`}
        onChange={onChange}
        onBlur={handleOnBlur}
        value={value}
        readOnly={isReadOnly}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

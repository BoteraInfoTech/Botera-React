export default function Button({
  text,
  onClick,
  className = "",
  disabled = false,
  isCustomButton = false,
  startIcon = null,
  endIcon = null,
  specialButton = false,
  key = "",
}) {
  if (specialButton) {
    return (
      <button onClick={onClick} className={`${className}`} disabled={disabled}>
        {text}
      </button>
    );
  }
  if (isCustomButton) {
    return (
      <button
        onClick={onClick}
        className={`rounded-lg ${className}`}
        disabled={disabled}
        key={key}
      >
        {startIcon ? startIcon : ""}
        {text}
        {endIcon ? endIcon : ""}
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-navyBlueLight transition font-medium shadow-md ${className} disabled:bg-gray-400 disabled:cursor-not-allowed`}
      disabled={disabled}
    >
      {startIcon ? startIcon : text}
    </button>
  );
}

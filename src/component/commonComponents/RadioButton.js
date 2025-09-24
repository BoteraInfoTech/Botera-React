export default function RadioButton({
  label,
  checkedValue,
  className = "",
  handleChange,
  groupData = [],
}) {
  return (
    <div className={`${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex gap-6 mt-2">
        {groupData.map((item, i) => {
          return (
            <label
              className="flex items-center gap-2"
              key={`Radio${item.value}`}
            >
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name={label}
                  value={item.value}
                  checked={item.value === checkedValue}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded-full"
                />
                <span className="text-base">{item.label}</span>
              </label>
            </label>
          );
        })}
      </div>
    </div>
  );
}

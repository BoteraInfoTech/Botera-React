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
              <input
                type="radio"
                name={item.value}
                value={item.value}
                checked={item.value === checkedValue}
                onChange={handleChange}
              />{" "}
              {item.label}
            </label>
          );
        })}
      </div>
    </div>
  );
}

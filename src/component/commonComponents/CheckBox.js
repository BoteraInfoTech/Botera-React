import { Switch } from "@mui/material";

export default function CheckBox({
  label,
  checked,
  className = "",
  handleChange,
  isSwitch = false,
  color,
}) {
  if (isSwitch) {
    return (
      <div className="flex items-center justify-between border rounded-xl p-4">
        <span className="text-gray-700 font-medium">{label}</span>
        <Switch checked={checked} onChange={handleChange} color={color} />
      </div>
    );
  }
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        id="remember"
      />
      <label htmlFor="remember" className="text-sm text-gray-700">
        {label}
      </label>
    </div>
  );
}

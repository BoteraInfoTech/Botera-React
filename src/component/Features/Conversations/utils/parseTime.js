export function parseTimeToMinutes(t) {
  if (!t || typeof t !== "string") return 0;
  const parts = t.split(":");
  if (parts.length < 2) return 0;

  const h = parseInt(parts[0], 10);
  const rest = parts.slice(1).join(":");
  const [minStr, ap] = rest.split(" ");
  const m = parseInt(minStr, 10) || 0;

  let hour = isNaN(h) ? 0 : h;
  if (ap === "PM" && hour !== 12) hour += 12;
  if (ap === "AM" && hour === 12) hour = 0;

  return hour * 60 + m;
}

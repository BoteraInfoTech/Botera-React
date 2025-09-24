const today = new Date();

const dateFormats = [
  { format: "DD-MM-YYYY" },
  { format: "MM-DD-YYYY" },
  { format: "YYYY-MM-DD" },
  { format: "DD MMM YYYY" },
  { format: "MMM DD, YYYY" },
];

const dateFormatOptions = dateFormats.map(({ format }) => {
  let example;
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  switch (format) {
    case "MM-DD-YYYY":
      example = `${month}-${day}-${year}`;
      break;
    case "DD-MM-YYYY":
      example = `${day}-${month}-${year}`;
      break;
    case "YYYY-MM-DD":
      example = `${year}-${month}-${day}`;
      break;
    case "DD MMM YYYY":
      example = `${day} ${today.toLocaleString("en-US", {
        month: "short",
      })} ${year}`;
      break;
    case "MMM DD, YYYY":
      example = `${today.toLocaleString("en-US", {
        month: "short",
      })} ${day}, ${year}`;
      break;
    default:
      example = format;
  }

  return {
    label: `${format} (${example})`,
    value: format,
  };
});

export default dateFormatOptions;

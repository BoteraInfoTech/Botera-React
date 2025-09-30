import { useEffect } from "react";
import Button from "../commonComponents/Button";

export default function CalendlyWidget({ onClose }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 flex-col">
      <div
        className="calendly-inline-widget w-full mx-4 mb-0"
        data-url="https://calendly.com/botera-team/botera-demo-call"
        style={{ minWidth: "320px", height: "100%" }}
      />
      <Button
        text={"Close"}
        onClick={onClose}
        className="w-full rounded-none md:w-32 md:mb-10 md:rounded-md"
      />
    </div>
  );
}

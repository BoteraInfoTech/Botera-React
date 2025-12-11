import React from "react";
import Button from "../../../../commonComponents/Button";

export default function SuggestionsBar({ suggestedReplies = [], onSelect }) {
  return (
    <div className="px-0 py-0  bg-neutral-50">
      <div className="flex gap-2 flex-wrap">
        {suggestedReplies.map((s) => (
          <Button
            text={s}
            key={s}
            onClick={() => onSelect(s)}
            className="px-3 py-1 rounded-full bg-white border text-sm hover:shadow transition"
            isCustomButton
          />
        ))}
      </div>
    </div>
  );
}

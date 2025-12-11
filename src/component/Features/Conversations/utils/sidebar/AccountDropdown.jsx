import React from "react";
import { ArrowDropDown } from "@mui/icons-material";
import Button from "../../../../commonComponents/Button";

export default function AccountDropdown({
  accounts,
  selectedAccount,
  showAccount,
  setShowAccount,
  setSelectedAccount,
}) {
  return (
    <div className="relative">
      <Button
        onClick={() => setShowAccount((prev) => !prev)}
        className="flex items-center gap-2 border px-3 py-1 rounded-lg text-sm shadow-sm hover:shadow-md transition"
        endIcon={<ArrowDropDown />}
        text={selectedAccount}
        isCustomButton
      />

      {showAccount && (
        <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-xl z-50 animate-fadeIn">
          {accounts.map((acc) => (
            <Button
              key={acc}
              onClick={() => {
                setSelectedAccount(acc);
                setShowAccount(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-neutral-50 ${
                selectedAccount === acc
                  ? "font-semibold text-blue-600"
                  : "text-neutral-700"
              }`}
              text={acc}
              isCustomButton
            />
          ))}
          <div className="border-t px-4 py-2 text-sm text-neutral-500">
            Manage accounts
          </div>
        </div>
      )}
    </div>
  );
}

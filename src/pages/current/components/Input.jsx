import React from "react";

export default function Input({ value, setValue, label }) {
  return (
    <div className="rounded-xl">
      <input
        type="text"
        placeholder={label}
        value={value}
        className="input w-full max-w-xs shadow-md"
        onChange={(e) => setValue(e.target.value ? e.target.value : value)}
      />
    </div>
  );
}

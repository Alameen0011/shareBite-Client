// components/OtpInput.tsx
import React, { useRef } from "react";

interface OtpInputProps {
  length?: number;
  onChange: (otp: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ length = 6, onChange }) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Only allow digits

    const nextInputs = inputsRef.current;
    if (nextInputs[index]) {
      nextInputs[index]!.value = value;
    }

    const otp = nextInputs.map((input) => input?.value ?? "").join("");
    onChange(otp);

    if (value && index < length - 1) {
      nextInputs[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !inputsRef.current[index]?.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-2 md:gap-3">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          type="text"
          inputMode="numeric"
          maxLength={1}
          ref={(el) => (inputsRef.current[i] = el)}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className="w-10 h-12 md:w-12 md:h-14 text-center text-xl md:text-2xl border border-gray-300 rounded-md focus:outline-blue-500"
        />
      ))}
    </div>
  );
};

export default OtpInput;

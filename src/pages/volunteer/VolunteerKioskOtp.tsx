import { useVolunteer } from "@/hooks/useVolunteer";
import { AxiosError } from "axios";
import { Utensils } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import React from "react";

const VolunteerKioskOtp = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { verifyAndDeliver } = useVolunteer();
  const { mutateAsync } = verifyAndDeliver;

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const isOtpComplete = otp.every((digit) => digit !== "");

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move to previous input on backspace if current input is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp([...digits, ...Array(6 - digits.length).fill("")]);
      inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
    }
  };

  const handleVerify = async () => {
    const derivedOtp = otp.join("");
    if (!id) {
      toast.error("Missing ID in URL");
      return;
    }
    const apiData:{id:string,otp:string} = {id,otp:derivedOtp}


    try {
      const res = await mutateAsync(apiData);;
      if (res.success) {
        toast.success("Delivered successfully");
        navigate("/volunteer/deliverySuccess");
      }
    } catch (error) {
       const axiosError = error as AxiosError<{ message?: string }>;
         const message = axiosError.response?.data?.message || axiosError.message ||"Something went wrong. Please try again.";
         toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  flex items-center justify-center p-4 font-tertiary">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Utensils className="w-10 h-10 text-green-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">ShareBite</h1>
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
          Verify OTP
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Please enter the 6-digit code shared with the donor
        </p>

        <div className="flex justify-between mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(index, e.target.value)
              }
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-12 h-12 border-2 rounded-lg text-center text-xl font-semibold
                     focus:border-green-500 focus:outline-none transition-colors
                     mx-1 bg-gray-50"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          disabled={!isOtpComplete}
          className={`w-full py-3 rounded-lg text-white font-semibold
                   transition-all duration-200 ${
                     isOtpComplete
                       ? "bg-green-600 hover:bg-green-700"
                       : "bg-gray-300 cursor-not-allowed"
                   }`}
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default VolunteerKioskOtp;

// components/ControlledSelect.tsx
import { Controller, FieldErrors } from "react-hook-form";
import { ChevronDown } from "lucide-react";

interface ControlledSelectProps {
  name: string;
  control: any;
  label?: string;
  options: { label: string; value: string }[];
  placeholder?: string;
  errors?: FieldErrors;
}

export const ControlledSelect = ({
  name,
  control,
  label,
  options,
  placeholder = "Select an option",
  errors,
}: ControlledSelectProps) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="relative">
            <select
              {...field}
              className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pr-8 text-sm shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="" disabled>
                {placeholder}
              </option>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
        )}
      />
      {errors?.[name]?.message && (
        <p className="text-red-600 text-sm">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

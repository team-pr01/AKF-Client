/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from "react";
import { useTheme } from "../../../contexts/ThemeContext";

interface TextareaProps {
  label?: string;
  name: string;
  placeholder?: string;
  rows?: number;
  error?: any;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isRequired?: boolean;
  isDisabled?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      name,
      placeholder = "",
      rows = 4,
      error,
      isRequired = true,
      isDisabled = false,
      ...rest
    },
    ref
  ) => {
    const { theme } = useTheme();
    return (
      <div className="flex flex-col gap-2 font-Inter">
        {label && (
          <label htmlFor={name} className="text-neutral-65">
            {label}
            <span className="text-red-600">
              {" "}
              {isRequired && <span className="text-red-600"> *</span>}
            </span>
          </label>
        )}
        <textarea
          id={name}
          name={name}
          required={isRequired}
          placeholder={placeholder}
          rows={rows}
          ref={ref}
          disabled={isDisabled}
          className={`px-[18px] py-[14px] rounded-lg border focus:outline-none focus:border-brand-orange transition duration-300 ${
          theme === "light"
            ? "text-gray-600"
            : "text-gray-800"
        } ${
            isDisabled ? "bg-neutral-200/50" : "bg-neutral-50"
          } ${error ? "border-red-500" : "border-neutral-400"}`}
          {...rest}
        ></textarea>
        {error && <span className="text-red-500 text-sm">{error.message}</span>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;

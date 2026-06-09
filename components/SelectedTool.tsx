import { ChevronDown, Check } from "lucide-react";
import { useState } from "react";
import { ToolInput } from "@/auditEngine/auditEngineV1";

type Option = {
  label: string;
  value: string;
};

type CustomSelectProps = {
  value: string;
  onChange: (value: string ) => void;
  options: Option[];
  placeholder: string;
};

export function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          flex w-full items-center justify-between
          rounded-2xl border border-zinc-800
          bg-zinc-900/80 px-4 py-4 text-white
          transition-all duration-300
          hover:border-red-500/30
        "
      >
        <span className={selectedOption ? "text-white" : "text-zinc-500"}>
          {selectedOption?.label || placeholder}
        </span>

        <ChevronDown
          size={18}
          className={`transition duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className="
            absolute z-50 mt-2 w-full
            overflow-hidden rounded-2xl
            border border-zinc-800
            bg-zinc-950
            shadow-[0_0_40px_rgba(239,68,68,0.08)]
          "
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={()=>{onChange(option.value)
                setOpen(false)
              }}
              className="
                flex w-full items-center justify-between
                px-4 py-3 text-left
                text-zinc-300
                transition-all duration-200
                hover:bg-red-500/10
                hover:text-white
              "
            >
              {option.label}

              {value === option.value && (
                <Check size={16} className="text-red-500" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

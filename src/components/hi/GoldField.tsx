import { InputHTMLAttributes } from "react";

type GoldFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const GoldField = ({ label, className = "", ...props }: GoldFieldProps) => (
  <label className="block">
    <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2 block">
      {label}
    </span>
    <input
      className={`w-full bg-input border border-gold/20 focus:border-gold outline-none px-4 py-3 text-sm transition-colors ${className}`}
      {...props}
    />
  </label>
);

export default GoldField;

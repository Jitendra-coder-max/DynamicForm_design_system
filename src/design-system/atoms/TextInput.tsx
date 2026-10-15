import type { ChangeEvent, FocusEvent } from "react";

type TextInputProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  type?: "text" | "email";
  placeholder?: string;
  invalid?: boolean;
  describedBy?: string;
  onChange: (value: string) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
};

export function TextInput({
  id, name, label, value, type = "text", placeholder, invalid, describedBy, onChange, onBlur,
}: TextInputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value);

  return (
    <input
      className="control"
      id={id}
      name={name}
      aria-label={label}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      onBlur={onBlur}
    />
  );
}

import type { FocusEvent } from "react";

type TextareaProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  placeholder?: string;
  maxLength?: number;
  invalid?: boolean;
  describedBy?: string;
  onChange: (value: string) => void;
  onBlur: (event: FocusEvent<HTMLTextAreaElement>) => void;
};

export function Textarea({
  id, name, label, value, placeholder, maxLength, invalid, describedBy, onChange, onBlur,
}: TextareaProps) {
  return (
    <textarea
      className="control control--textarea"
      id={id}
      name={name}
      aria-label={label}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      value={value}
      placeholder={placeholder}
      maxLength={maxLength}
      onChange={(event) => onChange(event.target.value)}
      onBlur={onBlur}
      rows={4}
    />
  );
}

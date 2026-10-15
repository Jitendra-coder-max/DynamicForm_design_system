import type { FocusEvent } from "react";

type SelectProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  options: { label: string; value: string }[];
  invalid?: boolean;
  describedBy?: string;
  onChange: (value: string) => void;
  onBlur: (event: FocusEvent<HTMLSelectElement>) => void;
};

export function Select({ id, name, label, value, options, invalid, describedBy, onChange, onBlur }: SelectProps) {
  return (
    <select
      className="control"
      id={id}
      name={name}
      aria-label={label}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onBlur={onBlur}
    >
      <option value="">Choose an option</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
}

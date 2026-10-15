import type { FocusEvent } from "react";

type CheckboxProps = {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  invalid?: boolean;
  describedBy?: string;
  onChange: (checked: boolean) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
};

export function Checkbox({ id, name, label, checked, invalid, describedBy, onChange, onBlur }: CheckboxProps) {
  return (
    <input
      className="checkbox-control"
      id={id}
      name={name}
      aria-label={label}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      type="checkbox"
      checked={checked}
      onChange={(event) => onChange(event.target.checked)}
      onBlur={onBlur}
    />
  );
}

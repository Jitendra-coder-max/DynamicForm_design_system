import type { ReactNode } from "react";

type FieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
};

export function Field({ id, label, hint, error, required, fullWidth, children }: FieldProps) {
  return (
    <div className={`field${fullWidth ? " field--full" : ""}${error ? " field--invalid" : ""}`}>
      <label className="field__label" htmlFor={id}>
        {label}{required && <span className="field__required" aria-hidden="true"> *</span>}
      </label>
      {children}
      {hint && <p className="field__hint" id={`${id}-hint`}>{hint}</p>}
      {error && <p className="field__error" id={`${id}-error`} role="alert">{error}</p>}
    </div>
  );
}

import { useState } from "react";
import type { FocusEvent, FormEvent, ReactNode } from "react";
import { Button } from "../../design-system/atoms/Button";
import { Checkbox } from "../../design-system/atoms/Checkbox";
import { Select } from "../../design-system/atoms/Select";
import { Textarea } from "../../design-system/atoms/Textarea";
import { TextInput } from "../../design-system/atoms/TextInput";
import { Field } from "../../design-system/molecules/Field";
import type { LeadField } from "./leadForm.config";
import { isFieldVisible, validateLeadForm } from "./leadValidation";
import type { LeadErrors, LeadValues } from "./leadValidation";

type DynamicFieldProps = {
  field: LeadField;
  value: string | boolean;
  error?: string;
  onValueChange: (name: string, value: string | boolean) => void;
  onBlur: (name: string) => void;
};

function DynamicField({ field, value, error, onValueChange, onBlur }: DynamicFieldProps) {
  const id = `lead-${field.name}`;
  const describedBy = [
    field.hint ? `${id}-hint` : "",
    error ? `${id}-error` : "",
  ].filter(Boolean).join(" ") || undefined;
  const common = {
    id,
    name: field.name,
    label: field.label,
    invalid: Boolean(error),
    describedBy,
  };
  const handleBlur = (_event: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    onBlur(field.name);
  };

  let control: ReactNode;
  switch (field.type) {
    case "text":
    case "email":
      control = (
        <TextInput
          {...common}
          type={field.type}
          value={typeof value === "string" ? value : ""}
          placeholder={field.placeholder}
          onChange={(next) => onValueChange(field.name, next)}
          onBlur={handleBlur}
        />
      );
      break;
    case "select":
      control = (
        <Select
          {...common}
          value={typeof value === "string" ? value : ""}
          options={field.options ?? []}
          onChange={(next) => onValueChange(field.name, next)}
          onBlur={handleBlur}
        />
      );
      break;
    case "textarea":
      control = (
        <Textarea
          {...common}
          value={typeof value === "string" ? value : ""}
          placeholder={field.placeholder}
          maxLength={field.validations?.maxLength}
          onChange={(next) => onValueChange(field.name, next)}
          onBlur={handleBlur}
        />
      );
      break;
    case "checkbox":
      control = (
        <div className="checkbox-row">
          <Checkbox
            {...common}
            checked={value === true}
            onChange={(next) => onValueChange(field.name, next)}
            onBlur={handleBlur}
          />
        </div>
      );
      break;
  }

  return (
    <Field
      id={id}
      label={field.label}
      required={field.validations?.required}
      hint={field.hint}
      error={error}
      fullWidth={field.fullWidth}
    >
      {control}
      {field.type === "textarea" && (
        <div className="character-count">
          {typeof value === "string" ? value.length : 0}/{field.validations?.maxLength}
        </div>
      )}
    </Field>
  );
}

export function LeadForm({ config }: { config: LeadField[] }) {
  const [values, setValues] = useState<LeadValues>(() => config.reduce<LeadValues>((initial, field) => {
    initial[field.name] = field.type === "checkbox" ? false : "";
    return initial;
  }, {}));
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [submitted, setSubmitted] = useState<LeadValues | null>(null);

  const visibleFields = config.filter((field) => isFieldVisible(field, values));
  const validationErrors = validateLeadForm(config, values);
  const errors: LeadErrors = {};

  for (const field of visibleFields) {
    if ((hasAttemptedSubmit || touched[field.name]) && validationErrors[field.name]) {
      errors[field.name] = validationErrors[field.name];
    }
  }

  function updateValue(name: string, value: string | boolean) {
    setValues((current) => ({ ...current, [name]: value }));
    setSubmitted(null);
  }

  function handleBlur(name: string) {
    setTouched((current) => ({ ...current, [name]: true }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHasAttemptedSubmit(true);

    if (Object.keys(validationErrors).length > 0) {
      setSubmitted(null);
      const firstInvalid = visibleFields.find((field) => validationErrors[field.name]);
      if (firstInvalid) document.getElementById(`lead-${firstInvalid.name}`)?.focus();
      return;
    }

    setSubmitted(Object.fromEntries(
      visibleFields.map((field) => [field.name, values[field.name]]),
    ));
  }

  return (
    <>
      <form className="lead-form" onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          {visibleFields.map((field) => (
            <DynamicField
              key={field.name}
              field={field}
              value={values[field.name]}
              error={errors[field.name]}
              onValueChange={updateValue}
              onBlur={handleBlur}
            />
          ))}
        </div>

        <div className="form-footer">
          <p className="required-note"><span aria-hidden="true">*</span> Required fields</p>
          <Button type="submit">Submit enquiry <span aria-hidden="true">→</span></Button>
        </div>
      </form>

      {submitted && (
        <section className="success-panel" aria-live="polite">
          <div className="success-icon" aria-hidden="true">✓</div>
          <div>
            <h2>Enquiry submitted</h2>
            <p>Your form is valid. Here are the submitted values:</p>
            <pre>{JSON.stringify(submitted, null, 2)}</pre>
          </div>
        </section>
      )}
    </>
  );
}

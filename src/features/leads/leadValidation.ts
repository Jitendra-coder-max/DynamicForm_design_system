import type { LeadField } from "./leadForm.config";

export type LeadValues = Record<string, string | boolean>;
export type LeadErrors = Record<string, string>;

export function isFieldVisible(field: LeadField, values: LeadValues): boolean {
  if (!field.showWhen) return true;
  return values[field.showWhen.field] === field.showWhen.equals;
}

/**
 * Pure validation: output depends only on config and values.
 * Hidden conditional fields are ignored.
 */
export function validateLeadForm(config: LeadField[], values: LeadValues): LeadErrors {
  const errors: LeadErrors = {};

  for (const field of config) {
    if (!isFieldVisible(field, values)) continue;

    const validations = field.validations ?? {};
    const rawValue = values[field.name];
    const value = typeof rawValue === "string" ? rawValue.trim() : rawValue;

    if (validations.required && (field.type === "checkbox" ? value !== true : !value)) {
      errors[field.name] = field.type === "checkbox"
        ? "Please provide your consent to continue."
        : `${field.label} is required.`;
      continue;
    }

    if (!value) continue;

    if (validations.pattern === "email" && typeof value === "string") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) errors[field.name] = "Enter a valid email address.";
    }

    if (validations.pattern === "phone" && typeof value === "string" && !/^\d{10}$/.test(value)) {
      errors[field.name] = "Enter a valid 10-digit phone number.";
    }

    if (validations.maxLength && typeof value === "string" && value.length > validations.maxLength) {
      errors[field.name] = `${field.label} must be ${validations.maxLength} characters or fewer.`;
    }
  }

  return errors;
}

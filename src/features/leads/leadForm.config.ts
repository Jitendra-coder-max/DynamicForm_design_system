export type FieldType = "text" | "email" | "select" | "textarea" | "checkbox";

export type LeadField = {
  name: string;
  type: FieldType;
  label: string;
  validations?: {
    required?: boolean;
    pattern?: "email" | "phone";
    maxLength?: number;
  };
  hint?: string;
  placeholder?: string;
  options?: { label: string; value: string }[];
  showWhen?: { field: string; equals: string };
  fullWidth?: boolean;
};

export const leadFormConfig: LeadField[] = [
  {
    name: "fullName",
    type: "text",
    label: "Full name",
    validations: { required: true },
    placeholder: "Enter your full name",
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    validations: { required: true, pattern: "email" },
    placeholder: "you@example.com",
  },
  {
    name: "leadType",
    type: "select",
    label: "Lead type",
    validations: { required: true },
    options: [
      { label: "Individual", value: "Individual" },
      { label: "Company", value: "Company" },
    ],
  },
  {
    name: "companyName",
    type: "text",
    label: "Company name",
    validations: { required: true },
    placeholder: "Enter your company name",
    showWhen: { field: "leadType", equals: "Company" },
  },
  {
    name: "phone",
    type: "text",
    label: "Phone",
    validations: { required: true, pattern: "phone" },
    placeholder: "10-digit phone number",
  },
  {
    name: "notes",
    type: "textarea",
    label: "Notes",
    validations: { maxLength: 200 },
    placeholder: "Anything else we should know?",
    fullWidth: true,
  },
  {
    name: "consent",
    type: "checkbox",
    label: "Consent",
    validations: { required: true },
    hint: "I agree to be contacted about my enquiry.",
    fullWidth: true,
  },
];

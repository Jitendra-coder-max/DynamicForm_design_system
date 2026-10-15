# Lead Capture Design System

A small React + TypeScript + Vite project for a responsive lead capture form. The form is built using a design-system layer and a config-driven field model so fields, validation, and conditional visibility can be updated without rewriting the form logic.

## Features

- Responsive lead form layout
- Reusable design-system components for inputs, selects, checkbox, and button
- Config-based form definition with conditional fields
- Inline validation for required fields, email, phone, and character limits
- Clean styling using CSS tokens and feature-specific CSS

## Quick start

```bash
npm install
npm run dev
```

To create a production build:

```bash
npm run build
```

## Project structure

```text
src/
├── App.tsx
├── index.css
├── main.tsx
├── design-system/
│   ├── atoms/
│   │   ├── Button.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Select.tsx
│   │   ├── Textarea.tsx
│   │   └── TextInput.tsx
│   ├── molecules/
│   │   └── Field.tsx
│   └── tokens/
│       └── tokens.css
├── features/
│   └── leads/
│       ├── LeadForm.tsx
│       ├── LeadPage.tsx
│       ├── lead-form.css
│       ├── leadForm.config.ts
│       └── leadValidation.ts
└── README.md
```

## Main customization points

- `src/design-system/tokens/tokens.css` — color, spacing, typography, and breakpoint tokens
- `src/design-system/atoms/` — basic reusable UI controls
- `src/features/leads/leadForm.config.ts` — typed form fields, validations, and conditional visibility
- `src/features/leads/leadValidation.ts` — config-driven validation logic
- `src/features/leads/LeadForm.tsx` — form state and submission behavior
- `src/features/leads/lead-form.css` — page and form styling

## Notes

This project does not include a backend; successful submission currently displays the submitted values locally in the UI.

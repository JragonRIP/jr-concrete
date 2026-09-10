import { contactMethods, projectTypes, type ContactMethod, type ProjectType } from "./site";

export type EstimatePayload = {
  name: string;
  phone: string;
  email: string;
  location: string;
  projectType: string;
  size: string;
  message: string;
  contactMethod: string;
  website?: string;
};

export type EstimateErrors = Partial<Record<keyof EstimatePayload, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function digits(value: string) {
  return value.replace(/\D/g, "");
}

export function validateEstimate(input: EstimatePayload): EstimateErrors {
  const errors: EstimateErrors = {};

  if (input.website) {
    errors.website = "Unable to submit this request.";
    return errors;
  }

  if (input.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }

  const phoneDigits = digits(input.phone);
  if (phoneDigits.length < 10 || phoneDigits.length > 11) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!emailPattern.test(input.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (input.location.trim().length < 2) {
    errors.location = "Tell us where the project is located.";
  }

  if (!projectTypes.includes(input.projectType as ProjectType)) {
    errors.projectType = "Select a project type.";
  }

  if (input.message.trim().length < 8) {
    errors.message = "Please share a few details about the project.";
  }

  if (!contactMethods.includes(input.contactMethod as ContactMethod)) {
    errors.contactMethod = "Choose how you’d like us to reach you.";
  }

  return errors;
}

export function formatPhone(value: string) {
  const d = digits(value).slice(0, 11);
  const local = d.length === 11 && d.startsWith("1") ? d.slice(1) : d;

  if (local.length < 4) return local;
  if (local.length < 7) return `(${local.slice(0, 3)}) ${local.slice(3)}`;
  return `(${local.slice(0, 3)}) ${local.slice(3, 6)}-${local.slice(6, 10)}`;
}

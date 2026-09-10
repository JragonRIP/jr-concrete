"use client";

import { useMemo, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { CheckCircle2, Phone, Upload } from "lucide-react";
import { Button, ButtonLink } from "./Button";
import { formatPhone, validateEstimate, type EstimatePayload } from "@/lib/estimate";
import { contactMethods, projectTypes, site } from "@/lib/site";

const initial: EstimatePayload = {
  name: "",
  phone: "",
  email: "",
  location: "",
  projectType: "",
  size: "",
  message: "",
  contactMethod: "Call",
  website: "",
};

const MAX_FILES = 3;
const MAX_FILE_SIZE = 4 * 1024 * 1024;

export function ContactForm() {
  const [values, setValues] = useState<EstimatePayload>(initial);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fileError, setFileError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const fileLabel = useMemo(() => {
    if (files.length === 0) return "Optional — add a few project photos";
    return files.map((file) => file.name).join(", ");
  }, [files]);

  function update<K extends keyof EstimatePayload>(key: K, value: EstimatePayload[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function onFiles(event: ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.target.files ?? []);
    if (selected.length > MAX_FILES) {
      setFileError(`Please upload up to ${MAX_FILES} photos.`);
      return;
    }
    if (selected.some((file) => !file.type.startsWith("image/"))) {
      setFileError("Photos must be image files.");
      return;
    }
    if (selected.some((file) => file.size > MAX_FILE_SIZE)) {
      setFileError("Each photo needs to be under 4 MB.");
      return;
    }
    setFileError("");
    setFiles(selected);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateEstimate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const data = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        data.append(key, value ?? "");
      });
      files.forEach((file) => data.append("photos", file));

      const response = await fetch("/api/estimate", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { errors?: Record<string, string> } | null;
        setErrors(body?.errors ?? { message: "Something went wrong. Please call us instead." });
        return;
      }

      setSuccess(true);
    } catch {
      setErrors({ message: "Something went wrong. Please call us instead." });
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="border border-mist bg-white px-6 py-12 text-center md:px-10">
        <CheckCircle2 className="mx-auto h-10 w-10 text-accent" aria-hidden="true" />
        <h3 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-ink">
          Thanks! Your request has been received. JR’s Concrete will be in touch.
        </h3>
        <p className="mx-auto mt-4 max-w-md text-concrete">
          If you’d rather talk it through now, give us a call.
        </p>
        <ButtonLink href={`tel:${site.phoneTel}`} className="mt-6">
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call {site.phone}
        </ButtonLink>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="border border-mist bg-white p-5 sm:p-8 md:p-10" noValidate>
      <input
        type="text"
        name="website"
        value={values.website}
        onChange={(event) => update("website", event.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name" error={errors.name} htmlFor="name">
          <input
            id="name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            className={inputClass(errors.name)}
          />
        </Field>
        <Field label="Phone" error={errors.phone} htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={values.phone}
            onChange={(event) => update("phone", formatPhone(event.target.value))}
            className={inputClass(errors.phone)}
          />
        </Field>
        <Field label="Email" error={errors.email} htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            className={inputClass(errors.email)}
          />
        </Field>
        <Field label="Project Location" error={errors.location} htmlFor="location">
          <input
            id="location"
            name="location"
            value={values.location}
            onChange={(event) => update("location", event.target.value)}
            placeholder="City or township"
            className={inputClass(errors.location)}
          />
        </Field>
        <Field label="Project Type" error={errors.projectType} htmlFor="projectType">
          <select
            id="projectType"
            name="projectType"
            value={values.projectType}
            onChange={(event) => update("projectType", event.target.value)}
            className={inputClass(errors.projectType)}
          >
            <option value="">Select a project type</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Approximate Project Size" htmlFor="size">
          <input
            id="size"
            name="size"
            value={values.size}
            onChange={(event) => update("size", event.target.value)}
            placeholder="e.g. 20 x 24 patio"
            className={inputClass()}
          />
        </Field>
      </div>

      <Field label="Message / Project Details" error={errors.message} htmlFor="message" className="mt-5">
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          className={`${inputClass(errors.message)} min-h-32 py-3`}
        />
      </Field>

      <fieldset className="mt-6">
        <legend className="mb-3 text-sm font-semibold text-ink">Preferred Contact Method</legend>
        <div className="flex flex-wrap gap-2">
          {contactMethods.map((method) => {
            const selected = values.contactMethod === method;
            return (
              <label
                key={method}
                className={`inline-flex min-h-11 cursor-pointer items-center border px-4 text-sm font-semibold ${
                  selected ? "border-accent bg-accent text-white" : "border-mist bg-paper text-ink"
                }`}
              >
                <input
                  type="radio"
                  name="contactMethod"
                  value={method}
                  checked={selected}
                  onChange={() => update("contactMethod", method)}
                  className="sr-only"
                />
                {method}
              </label>
            );
          })}
        </div>
        {errors.contactMethod && <p className="mt-2 text-sm text-accent">{errors.contactMethod}</p>}
      </fieldset>

      <div className="mt-6">
        <label htmlFor="photos" className="text-sm font-semibold text-ink">
          Upload Project Photos
        </label>
        <label className="mt-2 flex min-h-28 cursor-pointer flex-col items-center justify-center border border-dashed border-stone/50 bg-paper px-4 text-center">
          <Upload className="mb-2 h-5 w-5 text-accent" aria-hidden="true" />
          <span className="text-sm text-concrete">{fileLabel}</span>
          <input
            id="photos"
            name="photos"
            type="file"
            accept="image/*"
            multiple
            onChange={onFiles}
            className="sr-only"
          />
        </label>
        {fileError && <p className="mt-2 text-sm text-accent">{fileError}</p>}
      </div>

      <Button type="submit" size="lg" className="mt-8 w-full sm:w-auto" disabled={submitting}>
        {submitting ? "Sending…" : "Request Estimate"}
      </Button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
  className = "",
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-2 text-sm text-accent" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(error?: string) {
  return [
    "w-full rounded-sm border bg-cream px-4 text-base text-ink min-h-12",
    error ? "border-accent" : "border-mist focus:border-accent",
  ].join(" ");
}

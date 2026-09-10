"use client";

import { useMemo, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Phone, Upload } from "lucide-react";
import { Button, ButtonLink } from "./Button";
import { formatPhone, validateEstimate, type EstimatePayload } from "@/lib/estimate";
import { contactMethods, projectTypes, site, siteUrl } from "@/lib/site";

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
  const searchParams = useSearchParams();
  const [values, setValues] = useState<EstimatePayload>(initial);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fileError, setFileError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(searchParams.get("sent") === "1");

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
    if (fileError) return;

    setSubmitting(true);
    try {
      const data = new FormData();
      data.append("name", values.name);
      data.append("phone", values.phone);
      data.append("email", values.email);
      if (values.email) data.append("_replyto", values.email);
      data.append("project_location", values.location);
      data.append("project_type", values.projectType);
      data.append("approximate_size", values.size);
      data.append("preferred_contact", values.contactMethod);
      data.append("message", values.message);
      data.append(
        "_subject",
        `JR’s Concrete estimate: ${values.projectType}${values.location ? ` — ${values.location}` : ""}`,
      );
      data.append("_template", "table");
      data.append("_captcha", "false");
      files.forEach((file, index) => {
        data.append(index === 0 ? "attachment" : `attachment${index + 1}`, file);
      });

      const response = await fetch(site.formSubmitUrl, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      const body = (await response.json().catch(() => null)) as
        | { success?: string | boolean; message?: string }
        | null;
      const message = body?.message ?? "";
      const activated =
        body?.success === true || body?.success === "true" || /thank you|submitted/i.test(message);

      if (activated) {
        setSuccess(true);
        return;
      }

      if (/activat/i.test(message)) {
        setErrors({
          form: "Check johnraab1@gmail.com for a FormSubmit activation email, click the link, then send the form once more.",
        });
        return;
      }

      setErrors({
        form: "Something went wrong. Please call us instead.",
      });
    } catch {
        setErrors({ form: "Something went wrong. Please call us instead." });
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="border border-mist bg-white px-6 py-12 text-center md:px-10" role="status" aria-live="polite">
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
    <form
      method="post"
      action={site.formSubmitAction}
      encType="multipart/form-data"
      onSubmit={onSubmit}
      className="border border-mist bg-white p-5 sm:p-8 md:p-10"
    >
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_next" value={`${siteUrl}/contact?sent=1`} />
      <input type="hidden" name="_subject" value="JR’s Concrete estimate request" />
      {searchParams.get("error") === "1" && (
        <p className="mb-5 text-sm text-accent" role="alert">
          That request could not be sent. Check the required fields or call {site.phone}.
        </p>
      )}
      {errors.form && (
        <p className="mb-5 text-sm text-accent" role="alert">
          {errors.form}
        </p>
      )}

      <input
        type="text"
        name="_honey"
        value={values.website}
        onChange={(event) => update("website", event.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name" error={errors.name} htmlFor="name" required>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
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
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : "contact-hint"}
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
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : "contact-hint"}
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            className={inputClass(errors.email)}
          />
        </Field>
        <Field label="Project Location" htmlFor="location">
          <input
            id="location"
            name="location"
            value={values.location}
            onChange={(event) => update("location", event.target.value)}
            placeholder="City or township"
            className={inputClass()}
          />
        </Field>
        <p id="contact-hint" className="md:col-span-2 -mt-2 text-sm text-concrete">
          Phone or email is required.
        </p>
        <Field label="Project Type" error={errors.projectType} htmlFor="projectType" required>
          <select
            id="projectType"
            name="projectType"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.projectType)}
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

      <Field label="Project Details" error={errors.message} htmlFor="message" required className="mt-5">
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          aria-required="true"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
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
          Upload Project Photos <span className="font-normal text-concrete">(optional)</span>
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
        {fileError && (
          <p className="mt-2 text-sm text-accent" role="alert">
            {fileError}
          </p>
        )}
      </div>

      <p className="mt-6 text-sm leading-relaxed text-concrete">
        We use your name, contact information, project details, and any photos only to
        respond to this estimate request. See our{" "}
        <a href="/privacy" className="underline underline-offset-2 hover:text-ink">
          privacy notice
        </a>
        .
      </p>

      <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto" disabled={submitting}>
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
  required = false,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
  className?: string;
  required?: boolean;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-ink">
        {label}
        {required ? <span className="text-accent"> *</span> : null}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="mt-2 text-sm text-accent" role="alert">
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

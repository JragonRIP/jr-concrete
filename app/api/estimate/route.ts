import { NextResponse } from "next/server";
import { payloadFromFormData, validateEstimate } from "@/lib/estimate";
import { site } from "@/lib/site";

const MAX_FILES = 3;
const MAX_FILE_SIZE = 4 * 1024 * 1024;

function wantsJson(request: Request) {
  return (request.headers.get("accept") ?? "").includes("application/json");
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const payload = payloadFromFormData(formData);
  const errors = validateEstimate(payload);

  if (Object.keys(errors).length > 0) {
    if (wantsJson(request)) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }
    return NextResponse.redirect(new URL("/contact?error=1", request.url), 303);
  }

  const photos = formData
    .getAll("photos")
    .filter((item): item is File => item instanceof File && item.size > 0);

  if (photos.length > MAX_FILES || photos.some((file) => file.size > MAX_FILE_SIZE)) {
    const fileErrors = { form: "Please upload up to 3 photos under 4 MB each." };
    if (wantsJson(request)) {
      return NextResponse.json({ ok: false, errors: fileErrors }, { status: 400 });
    }
    return NextResponse.redirect(new URL("/contact?error=1", request.url), 303);
  }

  const outbound = new FormData();
  outbound.append("name", payload.name);
  outbound.append("phone", payload.phone);
  outbound.append("email", payload.email);
  outbound.append("_replyto", payload.email || payload.phone);
  outbound.append("project_location", payload.location);
  outbound.append("project_type", payload.projectType);
  outbound.append("approximate_size", payload.size);
  outbound.append("preferred_contact", payload.contactMethod);
  outbound.append("message", payload.message);
  outbound.append(
    "_subject",
    `JR’s Concrete estimate: ${payload.projectType}${payload.location ? ` — ${payload.location}` : ""}`,
  );
  outbound.append("_template", "table");
  outbound.append("_captcha", "false");
  outbound.append("_honey", payload.website ?? "");
  photos.forEach((file, index) => {
    outbound.append(index === 0 ? "attachment" : `attachment${index + 1}`, file);
  });

  const response = await fetch(site.formSubmitUrl, {
    method: "POST",
    body: outbound,
    headers: { Accept: "application/json" },
  });
  const body = (await response.json().catch(() => null)) as
    | { success?: string | boolean }
    | null;

  const ok = response.ok && body?.success !== false && body?.success !== "false";

  if (!ok) {
    if (wantsJson(request)) {
      return NextResponse.json(
        { ok: false, errors: { form: "Something went wrong. Please call us instead." } },
        { status: 502 },
      );
    }
    return NextResponse.redirect(new URL("/contact?error=1", request.url), 303);
  }

  if (wantsJson(request)) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.redirect(new URL("/contact?sent=1", request.url), 303);
}

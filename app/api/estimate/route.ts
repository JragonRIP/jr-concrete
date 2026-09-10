import { NextResponse } from "next/server";
import { validateEstimate, type EstimatePayload } from "@/lib/estimate";

export async function POST(request: Request) {
  const formData = await request.formData();

  const payload: EstimatePayload = {
    name: String(formData.get("name") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    location: String(formData.get("location") ?? ""),
    projectType: String(formData.get("projectType") ?? ""),
    size: String(formData.get("size") ?? ""),
    message: String(formData.get("message") ?? ""),
    contactMethod: String(formData.get("contactMethod") ?? ""),
    website: String(formData.get("website") ?? ""),
  };

  const errors = validateEstimate(payload);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const photos = formData.getAll("photos").filter((item) => item instanceof File);

  // Ready for a form service, email provider, or CRM.
  // Keep the request shape stable when connecting a backend.
  void photos;

  return NextResponse.json({ ok: true });
}

import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How JR’s Concrete uses information submitted through the estimate form.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Privacy Notice"
        description="How we use the information you send through the website."
      />
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-6 px-5 text-base leading-relaxed text-concrete md:px-8">
          <p>
            JR’s Concrete uses the estimate form to collect your name, phone number
            or email, project location, project type, and any details or photos you
            choose to send.
          </p>
          <p>
            That information is used only to respond to your request and talk
            through the work. We do not sell it. Photos are used to understand the
            job, not for marketing, unless you later tell us we may share them.
          </p>
          <p>
            Form submissions are delivered by email. Do not send information you
            would not want in an email.
          </p>
          <p>
            Questions:{" "}
            <a href={`mailto:${site.email}`} className="text-ink underline underline-offset-2">
              {site.email}
            </a>{" "}
            or{" "}
            <a href={`tel:${site.phoneTel}`} className="text-ink underline underline-offset-2">
              {site.phone}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}

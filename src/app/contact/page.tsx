import { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { ContactPage } from "@/components/sections/ContactPage";

export const metadata: Metadata = {
  title: "Contact | House of Software",
  description: "Start your digital transformation. Contact House of Software for enterprise software engineering.",
};

export default function Contact() {
  return (
    <PageShell>
      <ContactPage />
    </PageShell>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import BreadCrumbs from "@/components/breadCrumbs";
import ContactForm from "@/components/ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Furnia team.",
};

const details = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@ecomm.store",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 014-2200",
  },
  {
    icon: MapPin,
    label: "Studio",
    value: "120 Market Street, Suite 4",
  },
];

export default function ContactPage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="page-shell grid items-center gap-10 py-12 md:grid-cols-2 md:py-16">
          <div>
            <BreadCrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Contact", href: "/contact" },
              ]}
            />
            <p className="font-heading mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Contact
            </p>
            <h1 className="font-heading mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Let’s talk.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              Questions about an order, a product, or a partnership? Send a note
              and we’ll reply within one business day.
            </p>

            <div className="mt-8 space-y-4">
              {details.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-accent p-2 text-accent-foreground">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-72 overflow-hidden rounded-3xl border border-border/70 bg-muted shadow-sm md:min-h-96">
            <Image
              src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&q=80"
              alt="Envelopes and stationery"
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </section>

      <section className="page-shell grid gap-8 py-14 md:grid-cols-[0.9fr_1.1fr] sm:py-16">
        <div>
          <h2 className="font-heading text-2xl font-bold tracking-tight">
            Send a message
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Share as much detail as you can — order IDs help us move faster.
          </p>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}

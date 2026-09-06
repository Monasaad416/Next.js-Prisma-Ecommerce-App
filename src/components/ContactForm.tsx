"use client";

import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function ContactForm() {
  const [pending, setPending] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setPending(true);

    window.setTimeout(() => {
      setPending(false);
      form.reset();
      toast.success("Message sent — we’ll get back to you soon.");
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="surface-card space-y-4 p-6 sm:p-8">
      <div>
        <label className="mb-1.5 block text-sm font-medium" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none ring-primary/30 focus:ring-2"
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none ring-primary/30 focus:ring-2"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none ring-primary/30 focus:ring-2"
          placeholder="How can we help?"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}

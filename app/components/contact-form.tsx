"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [message, setMessage] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const institution = String(form.get("institution") ?? "");
    const email = String(form.get("email") ?? "");
    const topic = String(form.get("topic") ?? "");
    const proposal = String(form.get("proposal") ?? "");
    const subject = `Research collaboration enquiry · ${topic || institution}`;
    const body = [
      `Name: ${name}`,
      `Institution: ${institution}`,
      `Reply email: ${email}`,
      `Research topic: ${topic}`,
      "",
      "Proposed collaboration:",
      proposal,
    ].join("\n");
    setMessage(
      "Your email application will open with the collaboration details pre-filled. No form data is stored by this website.",
    );
    window.location.href = `mailto:mkhan@theory.issp.ac.cn?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-grid">
        <label>
          Name
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          Institution
          <input name="institution" autoComplete="organization" required />
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          Research topic
          <input
            name="topic"
            placeholder="e.g. radiation-tolerant alloys"
            required
          />
        </label>
      </div>
      <label>
        Collaboration proposal
        <textarea
          name="proposal"
          rows={7}
          placeholder="Briefly describe the scientific question, available data or tools, and intended outcome."
          required
        />
      </label>
      <button className="button button-primary" type="submit">
        Prepare collaboration email
      </button>
      <p className="form-note" aria-live="polite">
        {message ||
          "This form prepares an email to the institutional research address. No data is stored."}
      </p>
    </form>
  );
}


"use client";

import { useRef, useState, type FormEvent } from "react";
import "./GetInTouch.css";
import Section from "../Section/Section";
import BtnPrimary from "../ui/BtnPrimary/BtnPrimary";

export default function GetInTouch() {
  const [notice, setNotice] = useState("");

  const [sending, setSending] = useState(false);
  const pending = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    pending.current = true;
    setSending(true);
    setNotice("");
    await new Promise(resolve => setTimeout(resolve, 650));
    form.reset();
    setNotice("Demo success: Thank you! Your message has been sent successfully. I’ll get back to you within 24 hours. This is a simulation; no email was sent.");
    pending.current = false;
    setSending(false);
  }

  return (
    <Section id="contact" title="Get in touch">
      <form className="contact-form glass" onSubmit={submit} aria-labelledby="contact-form-title" aria-busy={sending}>
        <h3 id="contact-form-title">Let&apos;s collaborate</h3>
        <p className="contact-demo-note">Demo form: submissions are simulated and no email is sent.</p>
        <div className="contact-honeypot" aria-hidden="true"><label htmlFor="contact-website">Leave this field empty</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></div>
        <div className="contact-fields">
          <div className="contact-field">
            <input id="contact-name" name="name" autoComplete="name" required maxLength={120} placeholder=" " />
            <label htmlFor="contact-name">Your Name <span aria-hidden="true">*</span></label>
          </div>
          <div className="contact-field">
            <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder=" " />
            <label htmlFor="contact-email">Email <span aria-hidden="true">*</span></label>
          </div>
          <div className="contact-field">
            <input id="contact-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder=" " />
            <label htmlFor="contact-phone">Phone</label>
          </div>
          <div className="contact-field contact-message">
            <textarea id="contact-message" name="message" required rows={5} maxLength={5000} placeholder=" " />
            <label htmlFor="contact-message">Your Message <span aria-hidden="true">*</span></label>
          </div>
        </div>
        <BtnPrimary type="submit" className="contact-submit" disabled={sending}>{sending ? "Sending..." : "Submit"}</BtnPrimary>
        {notice && <p className="contact-notice" role="status">{notice}</p>}
      </form>
    </Section>
  );
}

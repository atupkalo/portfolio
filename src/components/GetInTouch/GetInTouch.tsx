"use client";

import { useState, type FormEvent } from "react";
import "./GetInTouch.css";
import Section from "../Section/Section";
import BtnPrimary from "../ui/BtnPrimary/BtnPrimary";

export default function GetInTouch() {
  const [notice, setNotice] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("Message delivery is not available yet. Your message has not been sent.");
  }

  return (
    <Section id="contact" title="Get in touch">
      <form className="contact-form glass" onSubmit={submit} aria-labelledby="contact-form-title">
        <h3 id="contact-form-title">Let&apos;s collaborate</h3>
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
            <textarea id="contact-message" name="message" rows={5} maxLength={5000} placeholder=" " />
            <label htmlFor="contact-message">Your Message</label>
          </div>
        </div>
        <BtnPrimary type="submit" className="contact-submit">Submit</BtnPrimary>
        {notice && <p className="contact-notice" role="status">{notice}</p>}
      </form>
    </Section>
  );
}

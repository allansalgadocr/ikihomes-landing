"use client";

import { useActionState, useCallback, useEffect, useRef, useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { submitLead, SubmitLeadState } from "@/actions/submitLead";

const FORM_URL = process.env.NEXT_PUBLIC_EARLY_ACCESS_FORM_URL || "";

interface FormModalProps {
  closeLabel: string;
  formDict: {
    name_placeholder: string;
    email_placeholder: string;
    zones_label: string;
    zones_placeholder: string;
    button: string;
    button_pending: string;
    footer: string;
    success_title: string;
    success_msg: string;
  };
}

const initialState: SubmitLeadState = { ok: false };

export function FormModal({ closeLabel, formDict }: FormModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const [state, formAction, isPending] = useActionState(submitLead, initialState);

  const open = useCallback(() => {
    setIsOpen(true);
    sendGAEvent("event", "form_modal_opened", { category: "landing" });
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Intercept CTA link clicks to open modal
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";
      const isFormLink =
        (FORM_URL && href === FORM_URL) ||
        href.includes("forms.gle") ||
        href.includes("docs.google.com/forms");

      if (!isFormLink) return;
      e.preventDefault();
      open();
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [open]);

  // Escape key + body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, close]);

  // GA tracking on form result
  useEffect(() => {
    if (state.ok) {
      sendGAEvent("event", "lead_form_success", { category: "lead", source: "modal" });
    } else if (state.error) {
      sendGAEvent("event", "lead_form_error", { category: "lead", error: state.error, source: "modal" });
    }
  }, [state]);

  const handleSubmit = () => {
    sendGAEvent("event", "agent_signup_started", {
      category: "landing",
      source: "modal_form",
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-midnight/60 backdrop-blur-sm"
        onClick={close}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in"
      >
        {/* Close button */}
        <div className="flex justify-end p-4 pb-0">
          <button
            onClick={close}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors rounded-lg hover:bg-gray-100"
            aria-label={closeLabel}
          >
            <span className="hidden sm:inline">{closeLabel}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form content */}
        <div className="px-6 sm:px-8 pb-8 pt-2">
          {state.ok ? (
            /* ── Success state ── */
            <div className="text-center py-6 animate-fade-in">
              <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h3 className="type-heading text-xl text-gray-900 mb-2">
                {formDict.success_title}
              </h3>
              <p className="type-body text-sm text-gray-500 mb-6">
                {formDict.success_msg}
              </p>

              <button
                onClick={close}
                className="px-6 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors text-sm"
              >
                {closeLabel}
              </button>
            </div>
          ) : (
            /* ── Form state ── */
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <img
                  src="/logo.svg"
                  alt="IkiHomes"
                  className="h-8 mx-auto mb-4"
                />
                <h3 className="type-heading text-xl text-gray-900 mb-1">
                  {formDict.button}
                </h3>
              </div>

              <form action={formAction} onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="modal-name" className="sr-only">
                    {formDict.name_placeholder}
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="modal-name"
                    required
                    autoFocus
                    placeholder={formDict.name_placeholder}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-white text-base"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="modal-email" className="sr-only">
                    {formDict.email_placeholder}
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="modal-email"
                    required
                    placeholder={formDict.email_placeholder}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-white text-base"
                  />
                </div>

                {/* Zones */}
                <div>
                  <label htmlFor="modal-zones" className="block text-sm text-gray-500 mb-1.5 font-medium">
                    {formDict.zones_label}
                  </label>
                  <input
                    type="text"
                    name="zones"
                    id="modal-zones"
                    required
                    placeholder={formDict.zones_placeholder}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-white text-base"
                  />
                </div>

                {/* Honeypot */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                />

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full px-8 py-3.5 bg-primary text-white font-bold rounded-lg shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed text-base"
                >
                  {isPending ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {formDict.button_pending}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      {formDict.button}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  )}
                </button>

                {/* Error */}
                {state.error && (
                  <p className="text-red-500 text-sm text-center">{state.error}</p>
                )}

                {/* Footer text */}
                <p className="text-xs text-center text-gray-400 pt-1">
                  {formDict.footer}
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

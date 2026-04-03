"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";

const FORM_URL = process.env.NEXT_PUBLIC_EARLY_ACCESS_FORM_URL || "";
const EMBED_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSevBAr9lrgEUAxoGrrAzmYjrufesVmxQ4C-eRD_b-i_8VCLew/viewform?embedded=true";

interface FormModalProps {
  closeLabel: string;
}

export function FormModal({ closeLabel }: FormModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const open = useCallback(() => {
    setIsOpen(true);
    sendGAEvent("event", "form_modal_opened", { category: "landing" });
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

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
        className="relative w-full max-w-[680px] max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in"
      >
        {/* Close button */}
        <div className="flex justify-end p-3 pb-0">
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

        {/* Google Form iframe */}
        <div className="px-3 pb-3 overflow-y-auto" style={{ maxHeight: "calc(90vh - 52px)" }}>
          <iframe
            src={EMBED_URL}
            width="100%"
            height="744"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="IkiHomes Early Access Form"
            className="w-full rounded-lg"
          >
            Loading...
          </iframe>
        </div>
      </div>
    </div>
  );
}

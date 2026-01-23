"use client";

import { useActionState } from "react";
import { submitLead, SubmitLeadState } from "@/actions/submitLead";
import { sendGAEvent } from "@next/third-parties/google";
import { useEffect } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

interface FooterFormProps {
  placeholder: string;
  buttonText: string;
  successMessage: string;
}

const initialState: SubmitLeadState = {
  ok: false,
};

export function FooterForm({ placeholder, buttonText, successMessage }: FooterFormProps) {
  const [state, formAction, isPending] = useActionState(submitLead, initialState);

  useEffect(() => {
     if (state.ok) {
       sendGAEvent("event", "footer_form_success", { category: "lead" });
     } else if (state.error) {
       sendGAEvent("event", "footer_form_error", { category: "lead", error: state.error });
     }
   }, [state]);

  if (state.ok) {
    return (
      <div className="bg-primary/10 rounded-lg p-3 text-center border border-primary/20 text-sm text-primary font-medium">
        {successMessage}
      </div>
    );
  }

  return (
    <form action={formAction} className="relative w-full max-w-xs">
        <div className="flex bg-gray-50 rounded-lg border border-gray-200 focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary transition-all overflow-hidden">
             <input
                type="email"
                name="email"
                required
                placeholder={placeholder}
                className="w-full px-4 py-3 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 text-sm"
            />
            <button
                type="submit"
                disabled={isPending}
                className="px-4 py-2 bg-transparent text-primary hover:text-primary/80 disabled:opacity-50 transition-colors flex items-center justify-center"
                aria-label={buttonText}
             >
                {isPending ? (
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                ) : (
                    <PaperAirplaneIcon className="w-5 h-5" />
                )}
            </button>
        </div>
        
        {/* Hidden Fields */}
        <input type="hidden" name="role" value="Footer Entry" />
        <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

        {state.error && (
            <p className="text-red-500 text-xs mt-2 absolute -bottom-6 left-0">{state.error}</p>
        )}
    </form>
  );
}

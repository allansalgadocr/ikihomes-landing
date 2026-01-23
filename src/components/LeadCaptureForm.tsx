"use client";

import { useActionState, useEffect } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { submitLead, SubmitLeadState } from "@/actions/submitLead";

interface LeadCaptureFormProps {
  dict: {
    email_placeholder: string;
    role_label: string;
    roles: {
      agent: string;
      agency_owner: string;
      developer: string;
      buyer: string;
    };
    button: string;
    button_pending: string;
    footer: string;
    success_title: string;
    success_msg: string;
    add_another: string;
  };
}

const initialState: SubmitLeadState = {
  ok: false,
};

export function LeadCaptureForm({ dict }: LeadCaptureFormProps) {
  const [state, formAction, isPending] = useActionState(submitLead, initialState);

  useEffect(() => {
    if (state.ok) {
      sendGAEvent("event", "lead_form_success", { category: "lead" });
    } else if (state.error) {
      sendGAEvent("event", "lead_form_error", { category: "lead", error: state.error });
    }
  }, [state]);

  const handleSubmit = () => {
    sendGAEvent("event", "lead_form_submit", { category: "lead" });
  };

  if (state.ok) {
    return (
      <div className="bg-primary/10 rounded-lg p-6 text-center border border-primary/20 animate-fade-in">
        <h3 className="text-xl font-semibold text-primary mb-2 font-urbanist">{dict.success_title}</h3>
        <p className="text-gray-600">{dict.success_msg}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 text-sm text-primary underline hover:text-primary/80"
        >
          {dict.add_another}
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-grow">
          <label htmlFor="email" className="sr-only">Email address</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder={dict.email_placeholder}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-white/90 backdrop-blur-sm min-h-[48px] text-base"
          />
        </div>
        
        {/* Optional Role Selector */}
        <div className="w-full md:w-auto">
             <label htmlFor="role" className="sr-only">{dict.role_label}</label>
             <select
              name="role"
              id="role"
              className="w-full h-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white/90 text-gray-600 cursor-pointer min-h-[48px] text-base"
             >
                <option value="Agent">{dict.roles.agent}</option>
                <option value="Agency Owner">{dict.roles.agency_owner}</option>
                <option value="Developer">{dict.roles.developer}</option>
                <option value="Buyer">{dict.roles.buyer}</option>
             </select>
        </div>
      </div>

      {/* Honeypot Field */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />

      <button
        type="submit"
        disabled={isPending}
        className="w-full md:w-auto px-8 py-3 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isPending ? dict.button_pending : dict.button}
      </button>

      {state.error && (
        <p className="text-red-500 text-sm mt-2">{state.error}</p>
      )}
      
      <p className="text-xs text-center text-gray-500 mt-4">
        {dict.footer}
      </p>
    </form>
  );
}

# Third Party Setup Guide

## Google Analytics 4 (GA4)

1.  **Create a GA4 Property**:
    *   Go to [analytics.google.com](https://analytics.google.com).
    *   Create a new property for `ikihomescr.com`.
    *   Set up a "Web" data stream.

2.  **Get Measurement ID**:
    *   In the data stream settings, copy the **Measurement ID** (format: `G-XXXXXXXXXX`).

3.  **Environment Variable**:
    *   Add this ID to your `.env.local` file (and Vercel environment variables):
        ```env
        NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
        ```

## Lead Capture Endpoint (Optional)

If switching from a server action to an external API (e.g., Zapier, Airtable):

1.  **Endpoint URL**:
    *   Configure your webhook receiver.
    *   Add the URL to `.env.local`:
        ```env
        LEAD_WEBHOOK_URL=https://hooks.zapier.com/...
        ```

2.  **Update Server Action**:
    *   Modify `src/actions/submitLead.ts` to `fetch()` this URL instead of logging/saving locally.

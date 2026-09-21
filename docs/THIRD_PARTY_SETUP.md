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

## 3. Google Forms Lead Capture (Free Database)
This project is configured to save leads directly to a Google Sheet via Google Forms, with no backend required.

### Step 1: Create the Form
1.  Go to [forms.google.com](https://forms.google.com) and create a **Blank Form**.
2.  Name it "IkiHomes Waitlist".
3.  Add the following questions:
    *   **Email** (Short Answer) — Required.
    *   **Role** (Short Answer) — Optional.

### Step 2: Get Entry IDs
1.  Click the **three dots (⋮)** in the top right → **Get pre-filled link**.
2.  Fill in dummy data (e.g., `email@test.com` for Email, `Agent` for Role).
3.  Click **Get Link** and copy it.
4.  Paste the link in a text editor. It will look like:
    `https://docs.google.com/forms/d/e/viewform?entry.123456=email@test.com&entry.987654=Agent`
5.  Extract the IDs:
    *   **Email Entry ID**: `entry.123456`
    *   **Role Entry ID**: `entry.987654`

### Step 3: Get Action URL
1.  View your live form (click the "Eye" icon to Preview).
2.  Open Developer Tools (F12) → **Network** tab.
3.  Submit the form with dummy data.
4.  Look for the `POST` request to `formResponse`.
5.  Copy the request URL. It should look like:
    `https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse`

### Step 4: Update Environment
Add these values to your `.env.local` file (and Vercel):
```env
GOOGLE_FORMS_ACTION_URL=https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse
GOOGLE_FORMS_ENTRY_EMAIL=entry.123456
GOOGLE_FORMS_ENTRY_ROLE=entry.987654
```

## 4. Cloudflare Turnstile (Waitlist Bot Protection)

The waitlist form is protected by a Turnstile challenge (PLAT-1122). Both halves
must be configured together: the widget renders only when the public key is set,
and the server action verifies only when the secret is set.

| Variable | Scope | Where |
|---|---|---|
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public, inlined into the bundle | Vercel Production and Preview |
| `TURNSTILE_SECRET_KEY` | Server only, never exposed | Vercel Production and Preview |

### Step 1: Create the Widget
1. Cloudflare dashboard, **Turnstile**, **Add widget**.
2. Hostnames must be fully qualified domains (`ikihomescr.com`, `www.ikihomescr.com`,
   plus any Vercel preview domain you want to exercise). A bare label is rejected.
3. Copy the site key and the secret key.

### Step 2: Set the Variables
Add both to Vercel for Production and Preview, then redeploy: the public key is
baked into the bundle at build time, so changing it needs a new build.

### Step 3: Local Testing
Use Cloudflare's test pair in `.env.local`. `1x00000000000000000000AA` with secret
`1x0000000000000000000000000000000AA` always passes; site key
`2x00000000000000000000AB` always fails, which is how you exercise the refusal path.

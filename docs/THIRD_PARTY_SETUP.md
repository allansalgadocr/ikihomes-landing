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

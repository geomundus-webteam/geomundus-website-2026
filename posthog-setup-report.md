# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the GeoMundus 2026 conference website. The SDK was already installed; the integration adds client-side initialization via `instrumentation-client.ts` (the recommended Next.js 15.3+ pattern), wires the PostHogProvider into the root layout, extends the reverse proxy config with the missing `/ingest/array/` rewrite, and adds event capture across the registration funnel, abstract submission flow, cookie consent UI, and key engagement CTAs. Server-side events are captured in the abstract submissions API route and the registration server action using the existing `posthog-node` client.

| Event name | Description | File |
|---|---|---|
| `registration_step_completed` | User advances to the next step in the multi-step registration form | `components/registration-form.tsx` |
| `registration_submitted` | User successfully completes and submits the conference registration form | `components/registration-form.tsx` |
| `registration_failed` | Registration form submission fails (duplicate email or server error) | `components/registration-form.tsx` |
| `abstract_submitted` | User successfully submits an abstract for the conference | `components/abstract-submission-form.tsx` |
| `abstract_submission_failed` | Abstract submission fails due to a validation or server error | `components/abstract-submission-form.tsx` |
| `abstract_received` | Server confirms an abstract has been received and saved | `app/api/submissions/route.ts` |
| `registration_received` | Server confirms a registration has been saved and confirmation email sent | `lib/actions.ts` |
| `cookie_consent_accepted` | User accepts cookie consent on the site | `components/cookie-consent.tsx` |
| `cookie_consent_rejected` | User rejects cookie consent on the site | `components/cookie-consent.tsx` |
| `abstract_template_downloaded` | User clicks the download link for the abstract submission template | `app/(website)/submissions/page.tsx` |
| `sponsor_contact_clicked` | User clicks the "Become a sponsor" or "More info" sponsorship link on the homepage | `app/(website)/page.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard**: [Analytics basics (wizard)](https://eu.posthog.com/project/218821/dashboard/802696)
- **Insight**: [Conference Registrations Over Time](https://eu.posthog.com/project/218821/insights/6I6ckyiB)
- **Insight**: [Abstract Submissions Over Time](https://eu.posthog.com/project/218821/insights/BYWSMFB7)
- **Insight**: [Registration Form Step Drop-off](https://eu.posthog.com/project/218821/insights/rii0jwnX)
- **Insight**: [Cookie Consent Outcomes](https://eu.posthog.com/project/218821/insights/uFRlyyqK)
- **Insight**: [Abstract Template Downloads & Sponsor Interest](https://eu.posthog.com/project/218821/insights/Bx2l2EZm)

## Verify before merging

- [ ] Run a full production build (the wizard only verified the files it touched) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` to `.env.example` and any deployment/bootstrap scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify correctly.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

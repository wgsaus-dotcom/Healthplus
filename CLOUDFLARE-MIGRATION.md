# HPI migration to an independently owned Cloudflare account

Prepared 27 October 2026 (Sydney). Live domain: https://healthplusint.com.au.

## Verified source and current dependencies

- Sites project: `appgprj_6a658e4357b08191966b1486c125f3b2`.
- Latest saved Sites version: 33. Source retrieved at `f184c48fde6dcb0b7bca4f1bd0a01b4bdc998c9e`.
- Application: Vinext 0.0.50, React 19, Cloudflare Workers. Existing dependency versions and lockfile are preserved.
- Candidate form: `POST /api/worker-applications`; D1 binding `DB`, table `worker_applications`; optional resumes in private R2 binding `BUCKET`.
- Live database inspected during preparation: zero rows in `worker_applications`, no response truncation. This is a point-in-time observation; recheck immediately before cutover.
- Employer form: existing external endpoint `https://hpi-onboarding.wgs-aus.workers.dev/api/employer/request`. Preserve it. Verify its CORS configuration permits the staging origin before testing there.
- Staff repository is a separate Site at https://documents.healthplusint.com.au. CRM link is https://crm.healthplusint.com.au/crm. Neither is part of this website deployment.
- No production environment variables are configured on the main Site.
- No application page imports the optional `app/chatgpt-auth.ts` helpers. The main website does not depend on that sign-in integration.
- Apex domain is active in Sites. The `www` association reports pending in Sites, despite active provider/SSL values; verify its actual redirect and HTTPS behavior during cutover.

## Prepared configuration

The original Sites configuration remains intact. `vite.cloudflare.config.ts` is a separate build entry for the independent account. `wrangler.cloudflare.example.json` can build offline with an intentionally unusable example database ID. It is not a production configuration.

`scripts/configure-cloudflare.mjs` creates an ignored account-specific `wrangler.cloudflare.json` with a real account ID, D1 ID and bucket name. No secrets belong in that file or this repository. `scripts/deploy-cloudflare.mjs` requires that real configuration, builds it again and deploys the generated Worker configuration. Its staging command rejects live-domain routes.

## Deploy a staging copy

Use the account that owns HPI's Cloudflare resources. Before deploying `hpi-website`, confirm that name is unused; select another name with `--worker` if necessary. Reuse or create resources deliberately rather than overwrite an existing project.

```sh
npm ci
npx wrangler login
npx wrangler whoami
npx wrangler d1 create hpi-website
npx wrangler r2 bucket create hpi-website-resumes
npm run cloudflare:configure -- --account-id YOUR_ACCOUNT_ID --database-id YOUR_NEW_D1_UUID
npx wrangler d1 migrations apply hpi-website --config wrangler.cloudflare.json --remote
npm run cloudflare:deploy
```

Create the new R2 bucket privately; do not enable its public development URL or attach a public custom domain. If Cloudflare requires a new subscription or billing agreement, the account owner must review that step. The generated configuration also declares an Images binding for the existing image handler.

`cloudflare:deploy` starts with no live domain routes and does not change DNS. Verify the returned workers.dev URL. Run all existing rendering checks against the independent build:

```sh
npm run cloudflare:build
node --test tests/rendered-html.test.mjs
npx wrangler deploy --dry-run --config dist/server/wrangler.json
```

Test page navigation, asset loading, mobile layout, candidate submission with and without a resume, input validation and submission reference numbers. Check that staged candidate records and private R2 objects are stored together. Test employer submission with an expressly identified test request; it writes into the existing external CRM service. Check browser-side CORS from the staging origin and final domain. Confirm staff documents, CRM, email and WhatsApp links.

## Preserve data before switching the domain

Re-read the live Sites database. If rows have appeared, export every row without truncation and preserve references, timestamps and resume object keys. Transfer the corresponding resume objects with content types and metadata intact. Source code and SQL schema do not contain existing application records or uploads. Do not treat the initially empty table as proof it remains empty. Keep the original Sites resources available through the verification period; account separately for any submissions arriving during transition.

## Domain cutover

1. Export the current DNS zone and record the live website routing before any edit. Preserve MX, SPF, DKIM, DMARC, verification records and all unrelated subdomains. The domain can remain registered with VentraIP.
2. Check which account currently hosts authoritative DNS. Move nameservers only if necessary; verify all copied records and DNSSEC configuration first.
3. After staging and data checks pass, configure the new Worker's custom domain for `healthplusint.com.au` in the owning account. Account for the existing Sites custom-hostname association and replace routing deliberately; do not detach the original early.
4. Configure `www.healthplusint.com.au` with working HTTPS and a permanent redirect to the apex, preserving each path and query string.
5. Verify the final domain serves the new deployment, including registration persistence, uploads, employer requests, all 25 sitemap pages, canonical URLs, robots.txt, sitemap.xml and existing files under `/assets/`.
6. Verify staff documents, CRM and inbound/outbound email independently. No mail provider migration is required for this website move.
7. If verification fails, restore the recorded website routing while the original Sites publication remains available. Preserve submissions received by either deployment. Retire the previous hosting only after successful verification and reconciliation.

## Preparation results

- Independent Cloudflare production build: passed.
- Existing rendered HTML suite: 6 test groups passed, covering the homepage, 24 additional indexed routes, structured data, sitemap and 404 responses.
- Wrangler deployment dry run: passed; Worker bundle and `DB`, `BUCKET`, `IMAGES`, `ASSETS` bindings recognized.
- New helper JavaScript syntax and Git whitespace checks: passed.
- No independent Cloudflare resources have been created yet; account sign-in is required.
- Live domain, email records and current Sites publication have not been changed.
- Browser verification of the independent hosted deployment and end-to-end form persistence remain pending deployment.

## Future updates

Use this source and the independent Cloudflare deployment workflow for subsequent updates. Publishing a separate version in ChatGPT Sites will not update the independently hosted Worker. Connect an owner-controlled repository to Cloudflare Builds if automatic deployments are wanted; set the build command to `npm run cloudflare:build` and deployment to the generated `dist/server/wrangler.json`, with the correct account configuration supplied securely to the build environment.

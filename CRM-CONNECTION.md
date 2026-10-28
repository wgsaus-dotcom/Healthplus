# HAI CRM website connection

The website Worker `hpi-website` binds `CRM` to the `WebsiteIntake` named entrypoint on `hai-crm`. Deploy the CRM entrypoint before this website revision. No browser credentials, intake signing secrets or public Access exceptions are required for this binding. The ordinary CRM URL retains its Access protection; signed public HTTP intake remains separately configured.

New candidate applications and their queued CRM event commit in one D1 transaction. Résumés remain in the website's original private R2 bucket. Employer enquiries continue to require a confirmed reference from the existing onboarding service. A staged durable copy is written before contacting that service; only confirmed enquiries are automatically delivered to HAI CRM. Staged rows indicate upstream failure or interrupted confirmation and require reconciliation against the older service. Do not automatically resend these to that service.

After a successful submission, background delivery attempts the queued records. A five-minute scheduled handler retries delivery. Retries retain the external reference; HAI CRM deduplicates the record, initial activity and follow-up task. The Connections page shows the last connection check, pending count and reconciliation count. A check older than 15 minutes is shown as overdue.

The additive `hpi_crm_outbox` schema initializes with `CREATE TABLE IF NOT EXISTS` before any bridge write, so the existing build command need not execute a remote database migration before deployment. The equivalent migration is recorded in `drizzle` and is safe to apply afterward. Existing tables and records are not changed by initialization. Database failures fail candidate persistence atomically. A legacy-confirmed employer response remains successful if its final outbox confirmation fails; its staged copy remains available for reconciliation.

No existing records are backfilled by this revision. Mailbox sync, document migration, staff permissions and automated email sending are separate work.

Validation: `node --test tests/crm-bridge.test.mjs`. Build with `npm run cloudflare:build`. The private CRM's service tests verify that the named entrypoint can receive records while the public HTTP endpoint remains closed without its signing secret.

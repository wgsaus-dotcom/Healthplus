import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { parseArgs } from "node:util";

const { values } = parseArgs({ options: {
  "account-id": { type: "string" },
  "database-id": { type: "string" },
  bucket: { type: "string", default: "hpi-website-resumes" },
  worker: { type: "string", default: "hpi-website" },
} });
if (!/^[a-f0-9]{32}$/i.test(values["account-id"] ?? "")) {
  throw new Error("Supply --account-id with the Cloudflare account's 32-character ID.");
}
if (!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(values["database-id"] ?? "") || values["database-id"] === "00000000-0000-4000-8000-000000000000") {
  throw new Error("Supply --database-id with the newly created D1 database UUID.");
}
if (!/^[a-z0-9][a-z0-9-]{1,61}[a-z0-9]$/.test(values.bucket) || !/^[a-z][a-z0-9-]{0,62}$/.test(values.worker)) {
  throw new Error("Use valid lowercase Cloudflare bucket and Worker names.");
}
if (existsSync("wrangler.cloudflare.json")) {
  throw new Error("wrangler.cloudflare.json already exists; edit it explicitly rather than overwrite it.");
}
const config = JSON.parse(readFileSync("wrangler.cloudflare.example.json", "utf8"));
config.account_id = values["account-id"];
config.name = values.worker;
config.d1_databases[0].database_id = values["database-id"];
config.r2_buckets[0].bucket_name = values.bucket;
writeFileSync("wrangler.cloudflare.json", JSON.stringify(config, null, 2) + "\n");
console.log("Created wrangler.cloudflare.json. No resources or DNS records were changed.");

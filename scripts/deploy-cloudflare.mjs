import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const config = JSON.parse(readFileSync("wrangler.cloudflare.json", "utf8"));
if (!/^[a-f0-9]{32}$/i.test(config.account_id ?? "") ||
    !/^[a-f0-9-]{36}$/i.test(config.d1_databases?.[0]?.database_id ?? "") ||
    config.d1_databases[0].database_id === "00000000-0000-4000-8000-000000000000") {
  throw new Error("Configure real account and D1 IDs with npm run cloudflare:configure first.");
}
if ((config.routes?.length ?? 0) || config.route) {
  throw new Error("This command deploys a staging copy only. Configure the live domain separately after verification.");
}
for (const args of [
  ["./node_modules/vite/bin/vite.js", "build", "--config", "vite.cloudflare.config.ts"],
  ["./node_modules/wrangler/bin/wrangler.js", "deploy", "--config", "dist/server/wrangler.json", ...process.argv.slice(2)],
]) {
  const result = spawnSync(process.execPath, args, { stdio: "inherit", env: process.env });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

import { existsSync } from "node:fs";
import vinext from "vinext";
import { defineConfig } from "vite";
import { sites } from "./build/sites-vite-plugin";

// Keep the existing Sites configuration intact. This entry builds for an
// independently owned Cloudflare account with explicitly configured bindings.
export default defineConfig(async () => {
  process.env.WRANGLER_WRITE_LOGS ??= "false";
  process.env.WRANGLER_LOG_PATH ??= ".wrangler/logs";
  process.env.MINIFLARE_REGISTRY_PATH ??= ".wrangler/registry";
  const { cloudflare } = await import("@cloudflare/vite-plugin");
  return {
    plugins: [
      vinext(),
      sites(),
      cloudflare({
        configPath: existsSync("wrangler.cloudflare.json")
          ? "./wrangler.cloudflare.json"
          : "./wrangler.cloudflare.example.json",
        viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
        inspectorPort: false,
      }),
    ],
  };
});

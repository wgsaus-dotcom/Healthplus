/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import { legacyDestination } from "../app/legacy-redirects";
import { seoPages } from "../app/seo-pages";
import handler from "vinext/server/app-router-entry";
import { drainSafely } from '../lib/crm-bridge.mjs';

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  CRM?: Fetcher;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async scheduled(_event:unknown,env:Env,ctx:ExecutionContext){ctx.waitUntil(drainSafely(env));},
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Resolve retired URLs and canonical variants in one hop, keeping enquiry parameters.
    if (request.method === "GET" || request.method === "HEAD") {
      const path = url.pathname.replace(/\/+$/, "") || "/";
      const legacy = legacyDestination(url.pathname);
      const productionHost = ["healthplusint.com.au", "www.healthplusint.com.au"].includes(url.hostname);
      const originChanged = productionHost && (url.protocol !== "https:" || url.hostname !== "healthplusint.com.au");
      const trimSlash = path !== url.pathname && Object.hasOwn(seoPages, path);
      if (legacy || originChanged || trimSlash) {
        const target = new URL(legacy || (trimSlash ? path : url.pathname), url);
        target.search = url.search;
        if (productionHost) {
          target.protocol = "https:";
          target.hostname = "healthplusint.com.au";
        }
        if (legacy && !target.hash) target.hash = "#";
        return Response.redirect(target.href, legacy ? 301 : 308);
      }
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    const response=await handler.fetch(request, env, ctx);
    if(request.method==='POST'&&response.ok&&['/api/worker-applications','/api/employer-requests'].includes(url.pathname))ctx.waitUntil(drainSafely(env));
    // Alternate Worker hosts must not compete with the public canonical domain.
    if (url.hostname.endsWith(".workers.dev")) {
      const headers = new Headers(response.headers);
      headers.set("X-Robots-Tag", "noindex, follow");
      return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    }
    return response;
  },
};

export default worker;


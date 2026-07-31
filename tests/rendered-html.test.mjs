import assert from "node:assert/strict";
import test from "node:test";

const routes = [
  "/",
  "/research",
  "/publications",
  "/software",
  "/about",
  "/contact",
  "/electron-transport",
  "/geometry",
  "/uncertainty",
  "/fenial",
  "/im3d",
  "/mentoring",
];

async function render(path) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders every public page", async () => {
  for (const route of routes) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    assert.match(
      response.headers.get("content-type") ?? "",
      /^text\/html\b/i,
      route,
    );
    const html = await response.text();
    assert.match(html, /Particle Solid Lab/i, route);
    assert.match(html, /<main\b[^>]*id=["']main-content["']/i, route);
    assert.doesNotMatch(html, /Your site is taking shape/i, route);
  }
});

test("publishes crawl directives", async () => {
  const [robotsResponse, sitemapResponse] = await Promise.all([
    render("/robots.txt"),
    render("/sitemap.xml"),
  ]);
  assert.equal(robotsResponse.status, 200);
  assert.equal(sitemapResponse.status, 200);

  const robots = await robotsResponse.text();
  const sitemap = await sitemapResponse.text();
  assert.match(
    robots,
    /Sitemap:\s*https:\/\/www\.particlesolidlab\.com\/sitemap\.xml/i,
  );
  assert.match(sitemap, /https:\/\/www\.particlesolidlab\.com\/research/);
  assert.match(sitemap, /https:\/\/www\.particlesolidlab\.com\/mentoring/);
});

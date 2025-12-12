const CACHE_NAME = "app-shell-v1";
const API_CACHE = "api-cache-v1";

const APP_SHELL = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// helper: network-first for API
async function networkFirst(req) {
  const cache = await caches.open(API_CACHE);
  try {
    const fresh = await fetch(req);
    // cache only successful responses
    if (fresh && fresh.ok) cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached || new Response(
      JSON.stringify({ error: "offline" }),
      { headers: { "Content-Type": "application/json" }, status: 503 }
    );
  }
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // ✅ ВАЖНО: кэшируем только GET
  if (req.method !== "GET") return;

  // ✅ React Router: любой переход по страницам -> index.html из кэша
  if (req.mode === "navigate") {
    event.respondWith(caches.match("/index.html"));
    return;
  }

  // ❌ не трогаем dev websocket vite (чтобы не было ws://localhost:undefined)
  if (url.pathname.startsWith("/@vite") || url.pathname.includes("react-refresh")) {
    return;
  }

  // ✅ Runtime caching ТОЛЬКО для публичного API
  // поменяй домен под свой API, если другой
  const isPublicApi =
    url.hostname.includes("dummyjson.com") &&
    (url.pathname.startsWith("/products") || url.pathname.includes("/products/"));

  if (isPublicApi) {
    event.respondWith(networkFirst(req));
    return;
  }

  // ✅ Статика: cache-first
  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req))
  );
});

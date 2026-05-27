const CACHE_NAME = "sherlock-holmes-v32";
const ASSETS = [
  "./",
  "index.html",
  "styles.css",
  "app.js",
  "manifest.json",
  "assets/icon.svg",
  "assets/barcelona-92.png",
  "assets/escultura-sant-jordi.png",
  "assets/marato-hwang-young-jo.png",
  "assets/museu-mnac.png",
  "assets/passeig-fama-pau-gasol.png",
  "assets/finestra-escola.png",
  "assets/bustia-282.png",
  "assets/jam-session.jpeg",
  "assets/senyal-hotel-7.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

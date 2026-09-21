// Service Worker для Clicker Premium Edition
const CACHE_NAME = 'clicker-v1';
const ASSETS = [
    './',
    './index.html',
    './manifest.json'
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS).catch(() => {});
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cached) => {
            return cached || fetch(event.request).then((response) => {
                // Не кешируем запросы к Supabase
                if (event.request.url.includes('supabase.co')) {
                    return response;
                }
                return response;
            }).catch(() => cached);
        })
    );
});

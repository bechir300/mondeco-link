// Nom du cache
const CACHE_NAME = 'mondeco-linkhub-v1';

// Liste des fichiers à mettre en cache
const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './logo-mondeco.png',
  './og-cover.jpg',
  './mondeco.vcf',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// Installation du service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(FILES_TO_CACHE);
      })
  );
  console.log('Service Worker installé et fichiers mis en cache.');
});

// Activation : suppression des anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('Ancien cache supprimé:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interception des requêtes réseau
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});

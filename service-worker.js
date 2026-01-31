// ============================================
// SERVICE WORKER - English Master Academy
// Versión corregida para permitir Google AdSense
// ============================================

const CACHE_NAME = 'english-academy-v2';
const OFFLINE_URL = '/offline.html';

// Archivos a cachear (solo los esenciales de la app)
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-72.png',
  '/icon-96.png',
  '/icon-128.png',
  '/icon-144.png',
  '/icon-152.png',
  '/icon-192.png',
  '/icon-384.png',
  '/icon-512.png'
];

// URLs que NUNCA deben ser cacheadas (AdSense, Analytics, etc.)
const NEVER_CACHE = [
  'googlesyndication.com',
  'googleadservices.com',
  'doubleclick.net',
  'google-analytics.com',
  'googletagmanager.com',
  'google.com/pagead',
  'adservice.google',
  'fonts.googleapis.com',
  'fonts.gstatic.com'
];

// Verificar si una URL debe ser cacheada
function shouldCache(url) {
  return !NEVER_CACHE.some(domain => url.includes(domain));
}

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando Service Worker v2...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Cacheando archivos esenciales');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => {
        // Activar inmediatamente sin esperar
        return self.skipWaiting();
      })
      .catch((error) => {
        console.log('[SW] Error en instalación:', error);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activando Service Worker v2...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Eliminar caches antiguas
            if (cacheName !== CACHE_NAME) {
              console.log('[SW] Eliminando cache antigua:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // Tomar control de todas las páginas inmediatamente
        return self.clients.claim();
      })
  );
});

// Interceptar peticiones
self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  
  // IMPORTANTE: No interceptar peticiones de AdSense y servicios externos
  if (!shouldCache(url)) {
    // Dejar que la petición pase directamente a la red
    return;
  }
  
  // Solo cachear peticiones GET
  if (event.request.method !== 'GET') {
    return;
  }
  
  event.respondWith(
    // Estrategia: Network First, Cache Fallback
    fetch(event.request)
      .then((response) => {
        // Si la respuesta es válida, guardarla en cache
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
        }
        return response;
      })
      .catch(() => {
        // Si falla la red, buscar en cache
        return caches.match(event.request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Si es una navegación y no hay cache, mostrar página offline
            if (event.request.mode === 'navigate') {
              return caches.match(OFFLINE_URL);
            }
            return new Response('Offline', { status: 503 });
          });
      })
  );
});

// Escuchar mensajes (para forzar actualización)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('[SW] Service Worker cargado correctamente');

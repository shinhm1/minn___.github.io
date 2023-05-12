'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "b31a11d725b11fdf6d09cc1d9dcace7f",
"index.html": "ec464d07ccd53af9bf97be24fd435de4",
"/": "ec464d07ccd53af9bf97be24fd435de4",
"main.dart.js": "0b977c96ff9ba5819c1e16d06dd10f12",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "3c9a088edf76b7f9aec23bc796fb20f6",
"assets/AssetManifest.json": "f8532322b634d4b41c5e1ac4c558059d",
"assets/NOTICES": "33deb31fdc9edf189dd862cfbd6087a1",
"assets/FontManifest.json": "68cd58289b0f9c3b5bb6ac219375f8de",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/AssetManifest.bin": "8c85e7df80262eef06438703bb8769d3",
"assets/fonts/MaterialIcons-Regular.otf": "d48ae68ef9df81e5583d292120dc195a",
"assets/assets/images/fitquest-logo.svg": "5703aa72213167ad676926df07b07dac",
"assets/assets/images/quest-logo.svg": "727080430c6679ab09091758dd758088",
"assets/assets/images/quest-logo.png": "670fa3e6cec3e3fcd5ad03954677c63e",
"assets/assets/images/fitquest-text-logo.svg": "05529f1635cb66bbc34e888e3b5b8ad3",
"assets/assets/images/icons/icn-check.svg": "02b19224c5b3d9107577ca3d65a28c0a",
"assets/assets/images/icons/icn-fitq-enabled.svg": "20113f4982b253cb3d742373330af825",
"assets/assets/images/icons/icn-user-selected.svg": "4818f1a98d01a1e282cc5b334133e680",
"assets/assets/images/icons/icn-edit.svg": "38bff41b3363ad8bd552d358418b47d7",
"assets/assets/images/icons/icn-comment-enabled.svg": "e2a92687ff79bfc9942ccf156b85ee88",
"assets/assets/images/icons/icn-calendar-enabled.svg": "193de90f60acbf96ae978c06d9a39f1c",
"assets/assets/images/icons/icn-calandar-selected.svg": "83b241f5cc3f0ff588a0102e5f124fa3",
"assets/assets/images/icons/icn-angle-right.svg": "7535f69be54149ad52437a669ee7145d",
"assets/assets/images/icons/icn-fitq-selected.svg": "d9cd409094ff78fe0e8aa91a18b292c4",
"assets/assets/images/icons/icn-list.svg": "8efca99e32ab6256975dc8bb0363a60c",
"assets/assets/images/icons/icn-user-enabled.svg": "f1399267b3c257772fd8ed2192d8f26f",
"assets/assets/images/icons/icn-cross.svg": "e4ea8e96e5a9a1819031bbe01784fa1c",
"assets/assets/images/icons/icn-angle-left.svg": "459b0be27c09dc4031cacfbcc0e6d480",
"assets/assets/images/icons/icn-comment-selected.svg": "6db052f38a4de5af6bf57f63f5907e31",
"assets/assets/images/icons/icn-plus.svg": "c5f906d9220450b75ed53b555c1c411d",
"assets/assets/images/fitquest-text-logo.png": "50fbe6f1c811e93d5008ff4733564dcd",
"assets/assets/images/balloon-triangle.svg": "aa4f4a0b6ddf6d6a3073448df78bd48e",
"assets/assets/fonts/Pretendard-Medium.ttf": "9ac30a1a68a5140a58b23aaf8025f1db",
"assets/assets/fonts/Pretendard-Regular.ttf": "46b0c48afd8b0ddc2ed4fcbb2df81d8b",
"assets/assets/fonts/Pretendard-ExtraBold.ttf": "dac19e30ed93b7aed171830c38cda6a2",
"assets/assets/fonts/Pretendard-Bold.ttf": "e93f79700405e1b4c1b3e70d8c378ca4",
"assets/assets/fonts/Pretendard-Light.ttf": "aef3dc5f5592a0a9bfd7e8de7abdc2c5",
"canvaskit/skwasm.js": "7313e68a7969003a7d46549330a6bdba",
"canvaskit/skwasm.wasm": "b943ac3902333b76543e1cdb69f35555",
"canvaskit/chromium/canvaskit.js": "6bdd0526762a124b0745c05281c8a53e",
"canvaskit/chromium/canvaskit.wasm": "cacb9bfbc25e150e4eea556351b73ff0",
"canvaskit/canvaskit.js": "45bec3a754fba62b2d8f23c38895f029",
"canvaskit/canvaskit.wasm": "ec76639d72ae889a2e7f8e3fe2449dfa",
"canvaskit/skwasm.worker.js": "7ec8c65402d6cd2a341a5d66aa3d021f"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}

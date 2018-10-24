const expectedCaches = ['jiah-static-v4'];
const cacheFiles = [
	'/',
	'/resources/css/style.css',
	'/resources/css/queries.css',
	'/resources/js/app.js',
	'https://fonts.googleapis.com/css?family=Quicksand:300,400',
	'/resources/assets/img/background.jpeg',
	'/resources/assets/img/flightnook.jpeg',
	'/resources/assets/img/omnifood.jpeg',
	'/resources/assets/img/weather.jpeg',
	'/resources/assets/img/workflow.jpeg',
	'/resources/assets/svg/icon/nav-close.svg',
	'/resources/assets/svg/icon/nav-open.svg',
	'/resources/assets/svg/icon/svg-symbol.svg',
	'/resources/assets/svg/logo/css3.svg',
	'/resources/assets/svg/logo/nodejs.svg',
	'/resources/assets/svg/logo/svg-logo.svg',
	'/vendors/css/normalize.css',
	'/vendors/js/cache-polyfill.js',
];

self.addEventListener('install', (e) => {
	self.skipWaiting();
	console.log('[Service Worker] Installing');
	e.waitUntil(
		caches.open(expectedCaches)
			.then(cache => {
				console.log('[Service Worker] Caching cacheFiles');
				return cache.addAll(cacheFiles);
			})
			.catch(err => console.error(`[Service Worker] Caching cacheFiles: ${err}`))
	);
});

self.addEventListener('activate', (e) => {
	console.log('[Service Worker] Activated');
	e.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.map(thisCacheName => {
					if (!expectedCaches.includes(thisCacheName)) {
						console.log(`[Service Worker] Removing Cached Files from Cach-${thisCacheName}`);
						return caches.delete(thisCacheName);
					}
				})
			);
		})
	);
});

self.addEventListener('fetch', (e) => {
	console.log(`[Service Worker] Fetching ${e.request.url}`);
	e.respondWith(
		caches.match(e.request)
			.then(response => {
				if (response) {
					console.log(`[Service Worker] Found in cache ${e.request.url}${response}`);
					return response;
				}

				const requestClone = e.request.clone();
				return fetch(requestClone)
					.then(response => {
						if (!response) {
							console.log('[ServiceWorker] No response from fetch ');
							return response;
						}
						const responseClone = response.clone();
						caches.open(expectedCaches)
							.then(cache => {
								cache.put(e.request, responseClone);
								console.log('[ServiceWorker] New Data Cached', e.request.url);
								return response;
							});
					})
					.catch(err => console.log('[ServiceWorker] Error Fetching & Caching New Data', err));
			})
	);
});



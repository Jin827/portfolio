if( 'function' === typeof importScripts) {
	importScripts('/vendors/js/cache-polyfill.js');

	self.addEventListener('install', (e) => {
		e.waitUntil(
			caches.open('sw-1')
				.then((cache) => {
					console.log('Opened cache');
					return cache.addAll([
						'/',
						'/resources/css/style.css',
						'/resources/css/queries.css',
						'/resources/js/app.js',
						'/resources/assets/img/',
						'/resources/assets/svg'
					]);
				}, err => console.error(err))
		);
	});
}

self.addEventListener('fetch', (e) => {
	// console.log(`eventRequestUrl: ${e.request.url}`);
	e.respondWith(
		caches.match(e.request)
			.then((response) => {
				if (response) {
					return response;
				}
				return fetch(e.request);
			}
			)
	);
});

self.addEventListener('activate', (e) => {

	const cacheWhitelist = ['sw-1'];

	e.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (cacheWhitelist.indexOf(cacheName) === -1) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

// function unregister() {
// 	if ('serviceWorker' in navigator) {
// 		navigator.serviceWorker.unregister().then(() => {
// 			console.log('ServiceWorker unregistration successful.');
// 		});
// 	}
// }

// unregister();

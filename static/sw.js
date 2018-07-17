
if( 'function' === typeof importScripts) {
	importScripts('/vendors/js/cache-polyfill.js');

	self.addEventListener('install', (e) => {
		e.waitUntil(
			caches.open('my-site-cache-v1')
				.then((cache) => {
					console.log('Opened cache');
					return cache.addAll([
						'/',
						//'/server/views/index.html',
						'/resources/css/style.css',
						'/resources/css/queries.css',
						'/resources/js/app.js',
					]);
				}, err => console.error(err))
		);
	});
}

self.addEventListener('fetch', (e) => {
	console.log(`eventRequestUrl: ${e.request.url}`);
	e.respondWith(
		caches.match(e.request)
			.then((response) => {
				// Cache hit - return response
				if (response) {
					return response;
				}
				return fetch(e.request);
			}
			)
	);
});

// self.addEventListener('activate', (e) => {

// 	const cacheWhitelist = ['my-site-cache-v1'];

// 	e.waitUntil(
// 		caches.keys().then((cacheNames) => {
// 			return Promise.all(
// 				cacheNames.map((cacheName) => {
// 					if (cacheWhitelist.indexOf(cacheName) === -1) {
// 						return caches.delete(cacheName);
// 					}
// 				})
// 			);
// 		})
// 	);
// });

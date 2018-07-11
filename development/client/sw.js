if( 'function' === typeof importScripts) {
	importScripts('/vendors/js/cache-polyfill.js');

	self.addEventListener('install', function(e) {
		e.waitUntil(
			caches.open('airhorner').then(function(cache) {
				return cache.addAll([
					'/',
					'/index.html',
					'/index.html?homescreen=1',
					'/?homescreen=1',
					'/resources/css/style.css',
					'/resources/css/queries.css',
					'/resources/js/header.js',
					'/resources/js/section.js',
					'/resources/js/footer.js',
				]);
			})
		);
	});
}

self.addEventListener('fetch', function(event) {
	console.log(event.request.url);
});


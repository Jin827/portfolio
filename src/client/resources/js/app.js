(function () {

	// if the url contains ?debug=true
	const IS_DEBUG_MODE = !!~location.href.indexOf('localhost');
	const BACKEND_HOST = IS_DEBUG_MODE ? 'http://localhost:9003' : 'https://jiah-lee.herokuapp.com';

	/* --- Header Typewriting Animation --- */
	const TxtType = function (el, toRotate, period) {
		this.toRotate = toRotate;
		this.el = el;
		this.loopNum = 0;
		this.period = parseInt(period, 10) || 2000;
		this.txt = '';
		this.tick();
		this.isDeleting = false;
	};

	TxtType.prototype.tick = function () {
		let i = this.loopNum % this.toRotate.length;
		let fullTxt = this.toRotate[i];

		if (this.isDeleting) {
			this.txt = fullTxt.substring(0, this.txt.length - 1);
		} else {
			this.txt = fullTxt.substring(0, this.txt.length + 1);
		}

		this.el.innerHTML = `<span class="wrap">${this.txt}</span>`;

		const that = this;
		let delta = 200 - Math.random() * 100;

		if (this.isDeleting) {
			delta /= 2;
		}

		if (!this.isDeleting && this.txt === fullTxt) {
			delta = this.period;
			this.isDeleting = true;
		} else if (this.isDeleting && this.txt === '') {
			this.isDeleting = false;
			this.loopNum++;
			delta = 300;
		}

		setTimeout(function () {
			that.tick();
		}, delta);
	};

	window.onload = function () {
		const elements = document.getElementsByClassName('typewrite');

		for (let i = 0; i < elements.length; i++) {
			let toRotate = elements[i].getAttribute('data-type');
			let period = elements[i].getAttribute('data-period');
			if (toRotate) {
				new TxtType(elements[i], JSON.parse(toRotate), period);
			}
		}

		// INJECT CSS
		const css = document.createElement('style');
		css.type = 'text/css';
		css.innerHTML = '.typewrite > .wrap { border-right: 0.04em solid #fff; }';
		document.body.appendChild(css);
	};

	/* --- Nav Icon & Toggle box --- */
	const navIcon = document.querySelector('#js--nav-icon');
	const navTriangle = document.querySelector('.main-nav--box--triangle-shape');
	const mainNav = document.querySelector('.main-nav');

	const navOpen = 'resources/assets/svg/icon/nav-open.svg';
	const navClose = 'resources/assets/svg/icon/nav-close.svg';

	navIcon.addEventListener('click', function (e) {
		e.preventDefault();

		if (!mainNav.classList.contains('open')) {
			navTriangle.classList.add('open');
			mainNav.classList.add('open');
			this.src = navClose;
		} else {
			navTriangle.classList.remove('open');
			mainNav.classList.remove('open');
			this.src = navOpen;
		}
	}, false);

	/* --- Scroll Events --- */
	const navbar = document.getElementById('nav-container');
	const aboutSection = document.getElementById('about');
	const mapEl = document.getElementById('map');
	const aboutPosition = aboutSection.offsetTop;
	const mapPosition = mapEl.offsetTop;
	let imagesWasLoaded = false;
	let googleMapsWasLoaded = false;

	function checkScrollPosition () {
		getStickyNav();

		if (!googleMapsWasLoaded && (window.pageYOffset > mapPosition)) {
			loadGoogleMaps();
			googleMapsWasLoaded = true;
		}

		if (!imagesWasLoaded && (window.pageYOffset > aboutPosition)) {
			lazyLoadImages();
			imagesWasLoaded = true;
		}
	}

	window.onscroll = checkScrollPosition;
	checkScrollPosition();

	/* Sticky Nav */
	function getStickyNav() {
		if (window.pageYOffset > aboutPosition) {
			navbar.classList.add('sticky');
		} else {
			navbar.classList.remove('sticky');
		}
	}

	/* Lazyload Images */
	function lazyLoadImages() {
		const b = document.getElementsByTagName('body')[0];
		const s = document.createElement('script'); s.async = true;
		const v = !('IntersectionObserver' in window) ? '8.8.0' : '10.9.0';
		s.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanilla-lazyload/' + v + '/lazyload.min.js';
		window.lazyLoadOptions = {}; // Your options here. See "recipes" for more information about async.
		b.appendChild(s);
	}

	/* --- Map --- */
	function loadGoogleMaps () {
		const scriptEl = document.createElement('script');
		scriptEl.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCwoUun1nhHQnZljKQmp4nEZP6-uw4L6xM';
		scriptEl.onload = function () {
			const googleMap = document.getElementById('map');

			const location = {
				montreal: {
					lat: 45.5081804,
					lng: -73.57
				}
			};

			const map = new google.maps.Map(googleMap, {
				center: location.montreal,
				zoom: 11.5
			});

			new google.maps.Marker({
				map: map,
				position: location.montreal,
				title: 'Montreal'
			});
		};

		document.body.appendChild(scriptEl);
	}

	/* --- Media icons hover effect --- */
	const linkedin = document.querySelector('.icon-media--linkedin');
	const linkedinOutline = document.getElementById('linkedin-outline');
	const linkedinInline = document.getElementById('linkedin-inline');
	const github = document.querySelector('.icon-media--github');
	const gitOutline = document.getElementById('github-outline');
	const gitInline = document.getElementById('github-inline');

	linkedin.addEventListener('mouseover', function () {
		linkedinOutline.style.stroke = '#0A278B';
		linkedinInline.style.fill = '#0A278B';
	}, false);

	linkedin.addEventListener('mouseleave', function () {
		linkedinOutline.style.stroke = '#0077B5';
		linkedinInline.style.fill = '#0077B5';
	}, false);

	github.addEventListener('mouseover', function () {
		gitOutline.style.stroke = '#EF0320';
		gitInline.style.fill = '#EF0320';
	}, false);

	github.addEventListener('mouseleave', function () {
		gitOutline.style.stroke = '#FB3C03';
		gitInline.style.fill = '#FB3C03';
	}, false);


	/* --- Sub Prtfolio --- */
	const btnToSubPortfolio = document.querySelectorAll('.js--btn-to-sub');
	const btnToMainPortfolio = document.querySelectorAll('.js--btn-to-main');

	btnToSubPortfolio.forEach(btn => btn.addEventListener('click', showSubPortfolio, false));
	btnToMainPortfolio.forEach(btn => btn.addEventListener('click', hideSubPortfolio, false));

	function showSubPortfolio(e) {
		e.preventDefault();
		document.querySelector(`.main--${this.id}`).classList.add('fade');
		document.querySelector(`.sub--${this.id}`).classList.add('open');

		const profileNum = [1, 3, 4];
		profileNum
			.filter(id => id != this.id)
			.map(id => {
				document.querySelector(`.main--${id}`).classList.remove('fade');
				document.querySelector(`.sub--${id}`).classList.remove('open');
			});
	}

	function hideSubPortfolio(e) {
		e.preventDefault();

		document.querySelector(`.main--${this.id - 100}`).classList.remove('fade');
		document.querySelector(`.sub--${this.id - 100}`).classList.remove('open');
	}

	/* --- Contact --- */
	const form = document.getElementById('contact-form');
	form.onsubmit = function (e) {
		e.preventDefault();

		const formContents = {
			name: form.name.value,
			email: form.email.value,
			subject: form.subject.value,
			message: form.message.value
		};
		const linkedin = 'https://www.linkedin.com/in/jiah827/';
		xhrPostRequest(formContents)
			.then(form.innerHTML = `<P class="contact-message">Hello ${form.name.value}, <br/>Your message has been sent.<br/> Thank you &#128420;</P>`)
			.then(form.reset())
			.catch(err => {
				console.error(`SendGrid API request failed: ${err}`);
				form.innerHTML = '<P class="contact-message">I am sorry.<br/>Your message has NOT been sent.<br/> Please contact me via Linkedin.<br/>Thank you &#128420;</P>';
			});

	};

	function createCORSRequest(method, url) {
		let xhr = new XMLHttpRequest();
		if ('withCredentials' in xhr) {
			// XHR for Chrome/Firefox/Opera/Safari.
			xhr.open(method, url, true);
		} else if (typeof XDomainRequest != 'undefined') {
			// XDomainRequest for IE.
			xhr = new XDomainRequest();
			xhr.open(method, url);
		} else {
			// CORS not supported.
			xhr = null;
		}
		return xhr;
	}

	function xhrPostRequest(formContents) {

		const data = JSON.stringify(formContents);

		return new Promise((resolve, reject) => {
			const url = `${BACKEND_HOST}/api/contact`;
			const xhr = createCORSRequest('POST', url);

			if (!xhr) {
				alert('CORS not supported');
				return;
			}

			xhr.onload = function () {
				if (this.status >= 200 && this.status < 300) {
					resolve(xhr.response);
				} else {
					reject(Error(xhr.statusText));
				}
			};
			xhr.onerror = function () {
				reject(Error('Network Error'));
				alert('Woops, there was an error making the request.');
			};
			// xhr.setRequestHeader('X-Custom-Header', 'value');
			xhr.setRequestHeader('Content-type', 'application/json');
			xhr.send(data);
		});
	}
})();

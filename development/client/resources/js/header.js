(function () {

	const navIcon = document.querySelector('#js--nav-icon');
	const navTriangle = document.querySelector('.main-nav--box--triangle-shape');
	const mainNav = document.querySelector('.main-nav');

	const navOpen = 'resources/assets/svg/icon/nav-open.svg';
	const navClose = 'resources/assets/svg/icon/nav-close.svg';

	/* --- Nav Icon & Toggle box --- */
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

	/* --- Sticky Nav --- */
	window.onscroll = function () {
		getStickyNav();
	};
	const navbar = document.getElementById('nav-container');
	const aboutSection = document.getElementById('about');
	const links = document.querySelectorAll('.main-nav li a');

	const aboutPosition = aboutSection.offsetTop;

	function getStickyNav() {

		if (window.pageYOffset > aboutPosition) {
			navbar.classList.add('sticky');
			links.forEach(link => link.style.color = '#333');
		} else {
			navbar.classList.remove('sticky');
			links.forEach(link => link.style.color = '#fff');
		}
	}

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
})();

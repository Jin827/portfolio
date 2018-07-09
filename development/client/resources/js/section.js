(function () {
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

		document.querySelector(`.main--${this.id-100}`).classList.remove('fade');
		document.querySelector(`.sub--${this.id-100}`).classList.remove('open');
	}
})();

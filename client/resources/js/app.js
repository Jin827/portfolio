(function() {

    const navIcon = document.querySelector('#js--nav-icon');
    const navTriangle = document.querySelector('.triangle--main-nav'); 
    const mainNav = document.querySelector('.main-nav');

    const navOpen = 'resources/assets/svg/nav-open.svg';
    const navClose = 'resources/assets/svg/nav-close.svg';

    /* --- Nav Icon & Toggle box --- */
    navIcon.addEventListener('click', function(e) {
        e.preventDefault();

        if ( !mainNav.classList.contains('open') ) {
            navTriangle.classList.add('open');
            mainNav.classList.add('open');
            this.src = navClose;
        } else {
            navTriangle.classList.remove('open');
            mainNav.classList.remove('open');
            this.src = navOpen;
        }
    }, false)

    /* --- Sticky Nav --- */
    /* --- Scroll on Buttons --- */
    /* --- Header Typewriting Animation --- */

    
    /* --- Media icons hover effect --- */
    const linkedin = document.querySelector('.icon-media--linkedin');
    const linkedinOutline = document.getElementById('linkedin-outline');
    const linkedinInline = document.getElementById('linkedin-inline');
    const github = document.querySelector('.icon-media--github');
    const gitOutline = document.getElementById('github-outline');
    const gitInline = document.getElementById('github-inline');

    linkedin.addEventListener("mouseover", function() {
        linkedinOutline.style.fill="#0A278B";
        linkedinInline.style.stroke="#0A278B";
    }, false)
    
    linkedin.addEventListener("mouseleave", function() {
        linkedinOutline.style.fill="#0077B5";
        linkedinInline.style.stroke="#0077B5";
    }, false)

    github.addEventListener("mouseover", function() {
        gitOutline.style.stroke="#EF0320";
        gitInline.style.fill="#EF0320";
    }, false)

    github.addEventListener("mouseleave", function() {
        gitOutline.style.stroke="#FB3C03";
        gitInline.style.fill="#FB3C03";
    }, false)


    /* --- Sub Prtfolio --- */
    const btnToSubPortfolio = document.querySelectorAll('.js--btn-to-sub');
    const btnToMainPortfolio = document.querySelectorAll('.js--btn-to-main');

    btnToSubPortfolio.forEach( btn => btn.addEventListener('click', showSubPortfolio, false) );
    btnToMainPortfolio.forEach( btn => btn.addEventListener('click', hideSubPortfolio, false) );

    function showSubPortfolio(e) {
        e.preventDefault();
        document.querySelector(`.main--${this.id}`).classList.add('fade');
        document.querySelector(`.sub--${this.id}`).classList.add('open');
    };

    function hideSubPortfolio(e) {
        e.preventDefault();
        document.querySelector(`.main--${this.id}`).classList.remove('fade');
        document.querySelector(`.sub--${this.id}`).classList.remove('open');
    };

    /* --- Portfolio page change --- */
    /* --- Contact --- */
    /* --- Map --- */
    
})();
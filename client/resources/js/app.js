(function() {

    const navIcon = document.querySelector('#js--nav-icon');
    const navTriangle = document.querySelector('.main-nav--triangle'); 
    const mainNav = document.querySelector('.main-nav');

    const navOpen = 'resources/assets/svg/icon/nav-open.svg';
    const navClose = 'resources/assets/svg/icon/nav-close.svg';

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


    /* --- portfolio --- */
    const btnToSubPortfolio = document.querySelector('.js--btn-to-sub');
    const btnToMainPortfolio = document.querySelector('.js--btn-to-main');
    const mainPortfolio = document.querySelector('.main-portfolio');
    const subPortfolio = document.querySelector('.sub-portfolio');

    btnToSubPortfolio.addEventListener('click', function(e) {
        e.preventDefault();

        mainPortfolio.classList.add('fade');
        subPortfolio.classList.add('open');
    }, false)

    btnToMainPortfolio.addEventListener('click', function(e) {
        e.preventDefault();
        
        mainPortfolio.classList.remove('fade');
        subPortfolio.classList.remove('open');
    }, false)
})();
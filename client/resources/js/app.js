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

    /* --- Sub Prtfolio --- */
    const btnToSubPortfolio = document.querySelector('.js--btn-to-sub');
    const btnToMainPortfolio = document.querySelector('.js--btn-to-main');

    btnToSubPortfolio.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('this.id: ', this.id);
        document.querySelector(`.main--${this.id}`).classList.add('fade');
        document.querySelector(`.sub--${this.id}`).classList.add('open');
        
    }, false)

    btnToMainPortfolio.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(`.main--${this.id}`).classList.remove('fade');
        document.querySelector(`.sub--${this.id}`).classList.remove('open');
    }, false)
    

    /* --- Portfolio page change --- */
    /* --- Contact --- */
    /* --- Map --- */
    
})();
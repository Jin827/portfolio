(function() {

    /* --- Nav Icon --- */

    const navIcon = document.querySelector('#js--nav-icon');
    const mainNav = document.querySelector('.main-nav');
    const navOpen = 'resources/assets/svg/nav-open.svg';
    const navClose = 'resources/assets/svg/nav-close.svg';

    
    navIcon.addEventListener('click', function(e) {
        e.preventDefault();

        if ( !mainNav.classList.contains('open') ) {
            mainNav.classList.add('open');
            this.src = navClose;
        } else {
            mainNav.classList.remove('open');
            this.src = navOpen;
        }
    }, false)

    /* --- Sticky Nav --- */

})();
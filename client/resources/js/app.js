(function() {

    const navIcon = document.querySelector('#js--nav-icon');
    const mainNav = document.querySelector('.main-nav');

    const navOpen = 'resources/assets/svg/nav-open.svg';
    const navClose = 'resources/assets/svg/nav-close.svg';
    
    /* --- Nav Icon & Toggle box --- */
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


    /* --- Sticky Nav --- */
    const downloadBtn = document.querySelector('#download-link');

    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();

        this.href = 'https://drive.google.com/open?id=1zPNrPO2_HuJMA1uOcqb_Wb-ajMGXgwnq';
    })
    

})();
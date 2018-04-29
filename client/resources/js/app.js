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
    /* --- Scroll on Buttons --- */
    /* --- Header Typewriting Animation --- */

    /* --- Sub Prtfolio --- */
    const projectNum = [ 1, 2, 3, 4 ];
    projectNum.forEach(num => {
        
    })

    const btnToSubPortfolio = document.querySelector('.js--btn-to-sub');
    const btnToMainPortfolio = document.querySelector('.js--btn-to-main');
    const mainPortfolio = document.querySelector('.main-portfolio');
    const subPortfolio = document.querySelector('.sub-portfolio');

    btnToSubPortfolio.addEventListener('click', function(e) {
        e.preventDefault();
    console.log("hello");
        mainPortfolio.classList.add('fade');
        subPortfolio.classList.add('open');
        
    }, false)

    btnToMainPortfolio.addEventListener('click', function(e) {
        e.preventDefault();
        console.log("hello2222");
        mainPortfolio.classList.remove('fade');
        subPortfolio.classList.remove('open');
    }, false)

    /* --- button hover --- */
    const btnBlue = document.querySelector('.js--btn-hover--blue');
    const btnOrange = document.querySelector('.js--btn-hover--orange');
    const btnBlueReverse = document.querySelector('.js--btn-hover--blue--reverse');
    const linkedinIcon = document.querySelector('.js--btn-hover--linkedin');
    const githubIcon = document.querySelector('.js--btn-hover--github');

    const triangleDarkblue = 'resources/assets/svg/triangle-darkblue.svg';
    const triangleBlue= 'resources/assets/svg/triangle.svg';
    const triangleDarkorange = 'resources/assets/svg/triangle-reverse-darkorange.svg';
    const triangleOrange = 'resources/assets/svg/triangle-reverse-orange.svg';
    const triangleReverseDarkblue = 'resources/assets/svg/triangle-reverse-darkblue.svg';
    const triangleReverseBlue= 'resources/assets/svg/triangle-reverse.svg';
    const github = 'resources/assets/svg/icon/github.svg';
    const githubDark = 'resources/assets/svg/icon/github-dark.svg';
    const linkedin = 'resources/assets/svg/icon/linkedin.svg';
    const linkedinDark = 'resources/assets/svg/icon/linkedin-dark.svg';

    btnBlue.addEventListener('mouseover', function(e) {
        e.preventDefault();
        this.src = triangleDarkblue;
    }, false)
    btnBlue.addEventListener('mouseout', function(e) {
        e.preventDefault();
        this.src = triangleBlue;
    }, false)

    btnOrange.addEventListener('mouseover', function(e) {
        e.preventDefault();
        this.src = triangleDarkorange;
        
    }, false)
    btnOrange.addEventListener('mouseout', function(e) {
        e.preventDefault();
        this.src = triangleOrange;
    }, false)

    btnBlueReverse.addEventListener('mouseover', function(e) {
        e.preventDefault();
        this.src = triangleReverseDarkblue;
    }, false)
    btnBlueReverse.addEventListener('mouseout', function(e) {
        e.preventDefault();
        this.src = triangleReverseBlue;
    }, false)

    linkedinIcon.addEventListener('mouseover', function(e) {
        e.preventDefault();
        this.src = linkedinDark;
    }, false)
    linkedinIcon.addEventListener('mouseout', function(e) {
        e.preventDefault();
        this.src = linkedin;
    }, false)

    githubIcon.addEventListener('mouseover', function(e) {
        e.preventDefault();
        this.src = githubDark;
    }, false)
    githubIcon.addEventListener('mouseout', function(e) {
        e.preventDefault();
        this.src = github;
    }, false)

    /* --- Portfolio page change --- */
    /* --- Contact --- */
    /* --- Map --- */
    
})();
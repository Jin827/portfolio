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

    /* --- Header Typewriting Animation --- */
    const TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        let i = this.loopNum % this.toRotate.length;
        let fullTxt = this.toRotate[i];
     
        if ( this.isDeleting ) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = `<span class="wrap">${this.txt}</span>`;

        const that = this;
        let delta = 200 - Math.random() * 100;

        if ( this.isDeleting ) { delta /= 2; }

        if ( !this.isDeleting && this.txt === fullTxt ) {
            delta = this.period;
            this.isDeleting = true;
        } else if ( this.isDeleting && this.txt === '' ) {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(function() {
            that.tick();
            }, delta
        );
    };

    window.onload = function() {
        const elements = document.getElementsByClassName('typewrite');
        
        for (let i=0; i<elements.length; i++) {
            let toRotate = elements[i].getAttribute('data-type');
            let period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }

        // INJECT CSS
        const css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #000; text-decoration: none;}";
        document.body.appendChild(css);
    };
    
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

        const profileNum = [1,2,3,4];
        profileNum
            .filter( id => id != this.id )
            .forEach( id => {
                document.querySelector(`.main--${id}`).classList.remove('fade');
                document.querySelector(`.sub--${id}`).classList.remove('open');
            })
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
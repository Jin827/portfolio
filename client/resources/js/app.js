(function() {

    const navIcon = document.querySelector('#js--nav-icon');
    const navTriangle = document.querySelector('.main-nav--box--triangle-shape'); 
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
    window.onscroll = function() { getStickyNav() };
    const navbar = document.getElementById("nav-container");
    const aboutSection = document.getElementById("about");
    const links = document.querySelectorAll(".main-nav li a");

    const aboutPosition = aboutSection.offsetTop;

    function getStickyNav() {
        
        if ( window.pageYOffset >= aboutPosition ) {
            navbar.classList.add("sticky");
            links.forEach( link => link.style.color = "#333" );
        } else {
            navbar.classList.remove("sticky");
            links.forEach( link => link.style.color = "#fff" );
        }
    }

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
            delta = 300;
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
        css.innerHTML = ".typewrite > .wrap { border-right: 0.04em solid #fff; }";
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

        const profileNum = [1, 3, 4];
        profileNum
            .filter( id => id != this.id )
            .map( id => {
                document.querySelector(`.main--${id}`).classList.remove('fade');
                document.querySelector(`.sub--${id}`).classList.remove('open');
            })
    };

    function hideSubPortfolio(e) {
        e.preventDefault();

        document.querySelector(`.main--${this.id-100}`).classList.remove('fade');
        document.querySelector(`.sub--${this.id-100}`).classList.remove('open');
    };

    /* --- Contact --- */
    const form = document.getElementById("contact-form");
    form.onsubmit = function(e) { 
        e.preventDefault();
        
        const formContents = {
            name: form.name.value,
            email: form.email.value,
            subject: form.subject.value,
            message: form.message.value
        } 
        xhrPostRequest(formContents);
        form.innerHTML = `<P class="contact-message">Hello ${form.name.value}, <br/>Your message has been sent.<br/> Thank you &#128420;</P>`
        form.reset();
    };

    function xhrPostRequest(formContents) {

        const data = JSON.stringify(formContents);

        return new Promise((resolve, reject) => {
        
            const xhr = new XMLHttpRequest();
            
            xhr.open("POST", "/", true);
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject(Error(xhr.statusText));
                }
            };
            xhr.onerror = function () {
                reject(Error("Network Error"));
            };
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(data);
        })
    }
    
    /* --- Map --- */
    const googleMap = document.getElementById('map');
    const location = {
        montreal: { lat: 45.5081804, lng: -73.57 }
    }

    const map = new google.maps.Map(googleMap, {
        center: location.montreal,
        zoom: 11.5
    })

    new google.maps.Marker({
        map: map,
        position: location.montreal,
        title: 'Montreal'
    });
})();
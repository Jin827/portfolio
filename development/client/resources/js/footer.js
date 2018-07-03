(function () {
    /* --- Contact --- */
    const form = document.getElementById("contact-form");
    form.onsubmit = function (e) {
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
        montreal: {
            lat: 45.5081804,
            lng: -73.57
        }
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
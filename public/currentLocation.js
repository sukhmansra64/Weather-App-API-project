//make variables to store the api for the IP address api and the weather api
const endpoint = 'http://ip-api.com/json/?fields=status,message,city,countryCode';
const weatherApiKey="1773c4b9bb594383d9d33f868be209fd"
//make an http request object
let xhr = new XMLHttpRequest();
//make a function for the statechange which fetches the information of the users IP and the respective location data
//the object then returns the IP location data and runs the core function using the information to display a forecast of their current location
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        const response = JSON.parse(this.responseText);
        if(response.status !== 'success') {
            console.log('query failed: ' + response.message);
            return
        }
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${response.city+", "+response.countryCode}&appid=${weatherApiKey}&units=metric`;
        fetch(url).then(response => response.json()).then(data => {
            const {main, name, sys, weather} = data;
            const icon = `https:////openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
            const li = document.createElement("li");
            li.classList.add("city");
            li.innerHTML = `<h2 class="city-name" data-name="${name},${sys.country}">
                        <span>Current Location</span>
                      </h2>
                      <div class="city-temp">${Math.round(main["temp"])}<sup>°C</sup>
                        <figure>
                            <img class="city-icon" src="${icon}" alt="${weather[0]["main"]}">
                            <figcaption>${weather[0]["description"]}</figcaption>
                        </figure>`;
            list.appendChild(li);
        }).catch(() => {
            msg.textContent = "Please enter a valid city.";
        });
        msg.textContent = "";
        form.reset();
        inp.focus();

    }
};
xhr.open('GET', endpoint, true);
xhr.send();

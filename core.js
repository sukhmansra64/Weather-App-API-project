const form = document.querySelector(".Top-banner form");
const input = document.querySelector(".Top-banner form input");
const msg = document.querySelector(".Top-banner form .msg");
const list = document.querySelector(".ajax-section .cities");
const apiKey = "1773c4b9bb594383d9d33f868be209fd";
form.addEventListener("submit",evt => {
    evt.preventDefault();
    let inputVal= input.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;
    const listItems = list.querySelectorAll(".ajax-section .city");
    const listItemsArray = Array.from(listItems);
    if (listItemsArray.length>0){
        const filteredArray = listItemsArray.filter(el=>{
            let content="";
            if (inputVal.includes(",")){
                if ((inputVal.split(","[1])).length>2){
                    inputVal = inputVal.split(","[0]);
                    content =el.querySelector(".city-name span").textContent.toLowerCase();
                }else{
                    content = el.querySelector(".city-name").dataset.name.toLowerCase();
                }
            }else{
                content = el.querySelector(".city-name span").textContent.toLowerCase();
            }
            return content == inputVal.toLowerCase();
        });
        if (filteredArray.length>0){
            msg.textContent="City already shown, specify area code or choose a different city.";
            form.reset();
            input.focus();
            return;
        }
    }
    fetch(url).then(response => response.json()).then(data=>{
        const {main, name, sys, weather } = data;
        const icon = `https:////openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
        const li = document.createElement("li");
        li.classList.add("city");
        li.innerHTML=`<h2 class="city-name" data-name="${name},${sys.country}">
                        <span>${name}</span>
                        <sup>${sys.country}</sup>
                      </h2>
                      <div class="city-temp">${Math.round(main["temp"])}<sup>°C</sup>
                        <figure>
                            <img class="city-icon" src="${icon}" alt="${weather[0]["main"]}">
                            <figcaption>${weather[0]["description"]}</figcaption>
                        </figure>`;
        list.appendChild(li);
    }).catch(()=>{
        msg.textContent="Please enter a valid city.";
    });
    msg.textContent="";
    form.reset();
    input.focus();
});



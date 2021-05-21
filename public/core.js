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


fetch('node_modules/cities.json/cities.json').then(response=>JSON.stringify(response)).then(data=>{
    let cityObject =JSON.parse(data);
    let currentFocus;
    input.addEventListener("input",evt => {
        let a, b, i, val = this.value;
        closeAllLists();
        if (!val){return false;}
        currentFocus =-1;
        a = document.createElement("DIV");
        a.setAttribute("id",this.id+"autocomplete-list");
        a.setAttribute("class","autocomplete-items");
        this.parentNode.appendChild(a);
        for (i=0;i<cityObject.length;i++) {
            if (cityObject[i].name.substr(0,val.length).toUpperCase()==val.toUpperCase()){
                b=document.createElement("DIV");
                b.innerHTML="<strong>"+cityObject[i].name.substr(0,val.length)+"</strong>";
                b.innerHTML+=cityObject[i].name.substr(val.length);
                b.innerHTML+="<input type='hidden' value='"+cityObject[i].name+"'>";
                b.addEventListener("click",evt=>{
                    input.value=this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });

    input.addEventListener("keydown",evt => {
        let x = document.getElementById(this.id + "autocomplete-list");
        if (x) x=x.getElementsByTagName("div");
        if (evt.keyCode==40){
            currentFocus++;
            addActive(x);
        } else if(evt.keyCode==38){
            currentFocus --;
            addActive(x);
        }else if(evt.keyCode==13){
            evt.preventDefault();
            if(currentFocus>-1){
                if(x) x[currentFocus].click();
            }
        }
    });
    function addActive(x){
        if (!x) return false;
        removeActive(x);
        if(currentFocus>=x.length) currentFocus = 0;
        if(currentFocus<0)currentFocus=(x.length-1)
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x){
        for (let i=0; i<x.length; i++){
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt){
        const x = document.getElementsByClassName("autocomplete-items");
        for (let i=0; i<x.length; i++){
            if(elmnt!=x[i]&&elmnt!=input){
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    document.addEventListener("click",evt=>{
        closeAllLists(evt.target);
    });
});

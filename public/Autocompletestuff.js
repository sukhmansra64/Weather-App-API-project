/*objects for each required html element on the app along with the API key*/
const inp=document.getElementById('input');
const searchInput=document.querySelector('.wrapper');
const resultsWrapper=document.getElementById('results');
const form = document.querySelector(".Top-banner form");
const msg = document.querySelector(".Top-banner form .msg");
const list = document.querySelector(".ajax-section .cities");
const apiKey = "1773c4b9bb594383d9d33f868be209fd";
//the autocomplete function allows for the search bar to have autofill suggestions using a JSON file with over 120000 cities on it
//this is done when you begin to type in the search bar, the function then takes that string and compares it to the values in the JSON
//the compared values are then displayed through being added to an unordered list onto the html
//when the html element is clicked, it runs the CORE function from the previous js file
async function autocomplete(){
    const path = './cities.json/cities.json'
    const response = await fetch(path);
    let data = await response.json()
    let cityArray =data;
    await inp.addEventListener('keyup',()=>{
       let results = [];
       let input = inp.value;
        if (input.length){
            results=filter(cityArray["places"],"name",input.toLowerCase());
        }
        renderResults(results);
        const autoSearchListItem=document.querySelector('.show .results ul li')
        if(autoSearchListItem){
            autoSearchListItem.addEventListener('click',evt=>{
                inp.value=autoSearchListItem.textContent;
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${inp.value}&appid=${apiKey}&units=metric`;
                fetch(url).then(response => response.json()).then(data => {
                    const {main, name, sys, weather} = data;
                    const icon = `https:////openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
                    const li = document.createElement("li");
                    li.classList.add("city");
                    li.innerHTML = `<h2 class="city-name" data-name="${name},${sys.country}">
                        <span>${name}</span>
                        <sup>${sys.country}</sup>
                      </h2>
                      <div class="city-temp">${Math.round(main["temp"])}<sup>??C</sup>
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
                removeList();
            });
        }

    });

}
//this event listener is triggered when you click anywhere on the screen and runs the removelists function
document.addEventListener('click',removeList);
function filter(array, key, value){
    let i, j, filtered = [], item;

    for(i =  0, j = array.length; i<j; i++){
        item = array[i];
        if(typeof item[key] !== "undefined" && (item[key]).toLowerCase().includes(value)){
            filtered.push(item);
        }
    }

    return filtered;
}
//the render results function takes the compared array from the autocomplete function and then makes them into html elements to make the autofill suggestions
function renderResults(results){
    if (!results.length){
        return searchInput.classList.remove('show');
    }
    const content =results.map((item)=>{
        return `<li>${item["name"]+", "+item["country"]}</li>`
    }).join('')
    searchInput.classList.add('show');
    resultsWrapper.innerHTML=`<ul>${content}</ul>`;
}
//the remove list function rids of the autofill suggestions through providing render results a value of 0 which triggers the base case and gets rid of the list
function removeList(){
    let x=0;
    renderResults(x);
}

autocomplete();

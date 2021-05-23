const inp=document.getElementById('input');
const searchInput=document.querySelector('.wrapper');
const resultsWrapper=document.getElementById('results');
async function autocomplete(){
    const path = './cities.json/cities.json'
    const response = await fetch(path);
    let data = await response.json()
    let cityArray =data;
    await inp.addEventListener('keyup',()=>{
       let results = [];
       let input = inp.value;
        if (input.length){
            results=filter(cityArray["places"],"name",input);

        }
        console.log(results);
        renderResults(results);
    });
}
function filter(array, key, value){
    let i, j, filtered = [], item;

    for(i =  0, j = array.length; i<j; i++){
        item = array[i];
        if(typeof item[key] !== "undefined" && item[key].includes(value)){
            filtered.push(item);
        }
    }

    return filtered;
}

function renderResults(results){
    if (!results.length){
        return searchInput.classList.remove('show');
    }
    const content =results.map((item)=>{
        return `<li>${item["name"]+","+item["country"]}</li>`
    }).join('')
    searchInput.classList.add('show');
    resultsWrapper.innerHTML=`<ul>${content}</ul>`;
}

autocomplete();

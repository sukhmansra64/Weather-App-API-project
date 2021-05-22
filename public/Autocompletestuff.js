async function cityObject(path,number){
    const response = await fetch(path);
    let data = await response.json()
    let cityArray =data;
    console.log(cityArray["places"][number]["name"]+", "+cityArray["places"][number]["country"]);
}




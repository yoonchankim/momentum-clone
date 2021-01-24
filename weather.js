const COORDS='coords'
let click=0;
const weatherBar=document.querySelector(".weather-bar");
const clickSpan=document.querySelector(".span");
const weather=document.querySelector(".js-weather");
const API_KEY="1a0e100adb58d88cf17facdee0e985d3";
function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}
function getWeather(lat,lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        console.log(json);
        const temperature=json.main.temp;
        const place=json.name;
        const wind=json.wind.speed;
        const windDeg=json.wind.deg;
        const country=json.sys.country;
        const human=json.main.humidity;
        weather.innerText=`\n\n\n🏴:${country} \n\n 🏠:${place}\n \n℃:${temperature}  \n\n 🌬️:${wind}(바람속도)\n\n🌬️:${windDeg}(바람정도)\n\n🤔:${human}(불쾌지수)`
    })
    clickSpan.addEventListener("click",clickWeather);
}
function clickWeather(){
    click=click+1;
    if(click%2===0){
        weatherBar.style.opacity="0";
        weather.style.opacity = "0";
    }
    if(click%2===1){
        weatherBar.style.opacity="1";
        weather.style.opacity = "1";
    }
}
function handleGeoSucces(position)
{
    const latitude=position.coords.latitude;
    const longitude=position.coords.longitude;
    const coordsObj={
        latitude,
        longitude
    }
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
};
function handleGeoError(){
    console.log("Can't access geo location.");
}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError);
}
function loadCoords(){
    const loadCords=localStorage.getItem(COORDS);
    if(loadCords===null){
        askForCoords();
    }
    else{
        const parseCoords=JSON.parse(loadCords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}
function init(){
    loadCoords();
}
init();
const placeDiv = document.querySelector(".weather_place");
const descriptionDiv = document.querySelector(".weather_description");
const tempDiv = document.querySelector(".weather_temp");

const API_KEY = "e4b0f6207cd091f8614b4500c63f3a7d";
const COORDS_LS = "Coords";

function saveCoords(lat, lon) {
    const coordsObj = {
        latitude: lat,
        longitude: lon
    }
    localStorage.setItem(COORDS_LS, JSON.stringify(coordsObj));
    loadWeather();
}

function successFn(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    saveCoords(lat, lon);
}

function errorFn() {
    alert("Failed to get current position data.");
}

function getCoords() {
    navigator.geolocation.getCurrentPosition(successFn, errorFn);
}

function fetchWeather(coords) {
    const lat = coords.latitude;
    const lon = coords.longitude;

    // current weather
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        placeDiv.innerHTML = json.name;
        descriptionDiv.innerHTML = json.weather[0].main;
        tempDiv.innerHTML = `${Math.ceil(json.main.temp)}°`
        console.log(json)
    });
}

function loadWeather() {
    const loadedCoords = localStorage.getItem(COORDS_LS);
    if (loadedCoords === null) {
        getCoords();
    } else {
        fetchWeather(JSON.parse(loadedCoords));
    }
}

function init() {
    loadWeather();
}

init();
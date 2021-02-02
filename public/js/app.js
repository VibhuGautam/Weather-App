// const { openWeatherMap } = require("../../config");

var fetchWeather = "/weather";

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const weatherIcon = document.querySelector('.weatherIcon i');
const weatherCondition = document.querySelector('.weatherCondition');

const tempElement = document.querySelector('.temperature span');

const locationElement = document.querySelector('.place');

const dateElement = document.querySelector('.date');

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

dateElement.textContent = new Date().getDate() + ", " + monthNames[new Date().getMonth()].substring(0, 3);



weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    locationElement.textContent = "Loading...";
    tempElement.textContent = "";
    weatherCondition.textContent = "";
    const locationApi = fetchWeather + "?address=" + search.value;

    var d = new Date();
    let hours = d.getHours();

    fetch(locationApi).then(response => {
        response.json().then(data => {
            if (data.error) {
                locationElement.textContent = data.error;
                tempElement.textContent = "";
                weatherCondition.textContent = "";
            } else {
                console.log()
                if (data.description === "rain") {
                    if (hours >= 18) {
                        weatherIcon.className = "wi wi-night-" + data.description
                    } else
                        weatherIcon.className = "wi wi-day-" + data.description
                } else if (data.description === "fog") {
                    if (hours >= 18) {
                        weatherIcon.className = "wi wi-night-" + data.description
                    } else
                        weatherIcon.className = "wi wi-day-" + data.description
                } else if (data.description === "sunny") {
                    if (hours >= 18) {
                        weatherIcon.className = "wi wi-night-" + data.description
                    } else
                        weatherIcon.className = "wi wi-day-" + data.description
                } else if (data.description === "snow") {
                    if (hours >= 18) {
                        weatherIcon.className = "wi wi-night-" + data.description
                    } else
                        weatherIcon.className = "wi wi-day-" + data.description
                } else if (data.description === "haze") {
                    if (hours >= 18) {
                        weatherIcon.className = "wi wi-night-fog"
                    } else
                        weatherIcon.className = "wi wi-day-haze"
                } else if (data.description === "smoke") {
                    weatherIcon.className = "wi wi-smoke";
                } else if (data.description === "clear") {
                    if (hours >= 18) {
                        weatherIcon.className = "wi wi-night-clear" + data.description
                    } else
                        weatherIcon.className = "wi wi-day-cloudy"
                } else {
                    weatherIcon.className = "wi wi-day-cloudy"
                }
                locationElement.textContent = data.cityName;
                tempElement.textContent = (data.temperature - 273.15).toFixed(2) + String.fromCharCode(176) + "C";
                weatherCondition.textContent = data.description.toUpperCase();
            }
        })
    });
})
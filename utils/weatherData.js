require('dotenv').config();
const request = require('request');
// const constants = require('../config');

const api_key = process.env.SECRET_KEY;
const weather_url = process.env.BASE_URL;

const weatherData = (address, callback) => {

    const url = weather_url + encodeURIComponent(address) + '&appid=' + api_key;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Can't fetch data from open weather map api ", undefined)
        } else if (!body.main || !body.main.temp || !body.name || !body.weather) {
            callback("Unable to find required data, try another location", undefined);

        } else {
            callback(undefined, {
                temperature: body.main.temp,
                description: body.weather[0].description,
                cityName: body.name
            })
        }
    })
}

module.exports = weatherData;
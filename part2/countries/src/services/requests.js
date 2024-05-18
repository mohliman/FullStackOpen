import axios from 'axios'

const countriesURL = `https://studies.cs.helsinki.fi/restcountries/api/all`

const getWeatherData = (city) => {
    return axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=aab09c47ff6a22bd71d49353cc554e0b`)
        .then(response => response)
}

const getAll = () => {
    return axios
        .get(countriesURL)
        .then(response => response)
}



export default {getWeatherData, getAll}

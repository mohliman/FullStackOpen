import axios from 'axios'

const countriesURL = `https://studies.cs.helsinki.fi/restcountries/api/all`
const api_key = import.meta.env.VITE_SOME_KEY
const getWeatherData = (city) => {
    return axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${api_key}`)
        .then(response => response)
}


const getAll = () => {
    return axios
        .get(countriesURL)
        .then(response => response)
}



export default {getWeatherData, getAll}

const DisplayCountryData = ({countryData, countryWeatherData})=>{
    if(countryData && countryWeatherData){
      const capitalWeatherData = countryWeatherData[countryData.capital]
      return(
      <>
        <h1>{countryData.name.common}</h1>
        <p>Capital: {countryData.capital}</p>
        <p>Area: {countryData.area}</p>
        <h2>Languages:</h2>
        <ul>
          {Object.values(countryData.languages).map(values =>(
            <li key={values}>{values}</li>
          ))}
        </ul>
        <img src={countryData.flags.png} alt={countryData.flags.alt} />
        {capitalWeatherData && (
          <>
            <h2>Weather in {countryData.capital}</h2>
            <p>temperature {(capitalWeatherData.main.temp - 273.15).toFixed(2)} Celcius</p>
            <img src={`https://openweathermap.org/img/wn/${capitalWeatherData.weather[0].icon}@2x.png`} alt={capitalWeatherData.weather[0].description} />
            <p>wind {capitalWeatherData.wind.speed} m/s</p>
          </>
        )}
      </>
      )
    }
    return <p>No data available for the selected country.</p>
}

export default DisplayCountryData;

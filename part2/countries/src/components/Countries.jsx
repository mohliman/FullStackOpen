import {useState} from 'react';
import DisplayCountryData from './DisplayCountryData';
import networkServices from '../services/requests'

function Countries({countryList}) {
  let list = countryList || []
  const [clicked, setClicked] = useState(Array(list.length).fill(false))
  const [countryWeatherData, setCountryWeatherData] = useState({})

  const handleClick = (capital, index) => {
      const clicks = [...clicked];
      clicks[index] = !clicks[index]
      setClicked(clicks)
    if(!countryWeatherData[capital]){
      networkServices
        .getWeatherData(capital)
        .then(response => {
          setCountryWeatherData(prevData => ({
            ...prevData,
            [capital]: response.data,
          }))
        })
    }
  }
  const singleCountryWeatherData = (capital) => {
    if(!countryWeatherData[capital]){
      networkServices
        .getWeatherData(capital)
        .then(response => {
          setCountryWeatherData(prevData => ({
            ...prevData,
            [capital]: response.data,
          }))
        })
    }
  }

 if(Array.isArray(list) && list.length === 1){
  singleCountryWeatherData(list[0].capital)
  return (
  <>
    <DisplayCountryData countryData={list[0]} countryWeatherData={countryWeatherData}/>
  </>
  )
 }

 if(Array.isArray(list) && list.length > 1){
  return (
    <>
      {list.map((country, i) =>(
        <div key={country.name.common}>
          <p>{country.name.common} <button onClick={()=>handleClick(country.capital, i)}>{clicked[i] ? 'Hide Details': 'Show Details'}</button>
          </p>
          {clicked[i] && (
            <DisplayCountryData countryData={country}
                                countryWeatherData={countryWeatherData}/>
          )}
        </div>
      ))}
    </>
  )
 }
else if(list && typeof list === 'string'){
  return(
    <>
    <p>{list}</p>
    </>
  )
 }
 return null;
}


export default Countries

import { useState, useEffect } from 'react'
import FormInput from './components/FormInput'
import networkServices from './services/requests'
import Countries from './components/Countries'



const App = ()=> {
  const [search, setSearch] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const [countryList, setCountryList] = useState(null)

  // form submit
  const handleFormSubmit = (e)=>{
    e.preventDefault();
    setSearch(inputValue);
  }
  // handle input
  const handleInputValue = (e)=>{
    setInputValue(e.target.value);
  }
  // countries list API request
  useEffect(()=>{
    if(search){
      networkServices
      .getAll()
      .then(response =>{
        let result = response.data
        let list = result.filter(data => (
          data.name.common.toLowerCase().includes(search.toLowerCase())
          ))
        if(list.length > 10){
          setCountryList('Too many matches, specify another filter')
        }else{
          setCountryList(list)
        }
      })
    }
  },[search])

  return (
    <div>
      <FormInput handleFormSubmit={handleFormSubmit}
                 handleInputValue={handleInputValue}
                 inputValue={inputValue}/>
      <Countries countryList={countryList}/>
    </div>
  )
}

export default App

import { useEffect, useState } from 'react'
import webServices from './services/persons'


function Notification({message, color}){
  let success = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  let failed = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if(message === null){
    return null
  }

  if(color === 'red'){
    return(
      <div>
        <p style={failed}>{message}</p>
      </div>
    )
  }
  return(
    <div>
      <p style={success}>{message}</p>
    </div>
  )
}

function SearchFilter({persons}){
  const [search, setSearch] = useState('')
  const [displaySearch, setDisplaySearch] = useState([])

  function inputSearchHandler(e){
    let query = e.target.value
    setSearch(query)
    if(query === ''){
      setDisplaySearch([])
    }else{
      const filteredQuery = persons.filter((person) => person.name.toLowerCase().includes(search.toLowerCase()))
      setDisplaySearch(filteredQuery)
    }
  }

  return(
    <div>
      <div>
        filter shown with: <input onChange={inputSearchHandler} value={search}/>
      </div>
      <div>
          <h2>Search Results: </h2>
          {(displaySearch.length === 0) ? 'No input yet!': displaySearch.map((query) =>
          <p key={query.id}>{query.name} {query.number}</p>
          )}
        </div>
    </div>
  )
}

function Form({persons, setPersons, setMessage}){
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  function submitHandler(e){
    e.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    // check if name already exist
    const personCheck = persons.find((person) => person.name === newName )

    if(personCheck){
      let confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one ?`)
      if(confirm){
        webServices
          .edit(personCheck.id, {...personCheck, number: newNumber})
          .then(res => setPersons(persons.map((person)=> person.id !== personCheck.id ? person : res)))

          setMessage(`${personCheck.name}'s phone number has been successfully replaced in phone book`)
          setTimeout(()=>setMessage(null), 2500)
        }
        setNewName('')
        setNewNumber('')
        // return
      }else{
        webServices
        .create(newPerson)
        .then(res => setPersons(persons.concat(res)))
      setMessage(`${newPerson.name} has been added to phone book`)
      setTimeout(()=>setMessage(null), 2500)
      setNewName('')
      setNewNumber('')
      }
  }
  // Input Handler
  function inputHandler(e){
    setNewName(e.target.value)
  }
  function inputNumHandler(e){
    setNewNumber(e.target.value)
  }
  return(
    <div>
      <form onSubmit={submitHandler}>
        <div>
          name: <input required onChange={inputHandler} value={newName}/>
        </div>
        <div>number: <input required type='number' value={newNumber} onChange={inputNumHandler}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

function DisplayContacts({persons, setPersons, setColor, setMessage}){
 function deleteTrigger(id, person){
  let confirmation = window.confirm(`Delete ${person.name}?`)
  if(confirmation){
    webServices
    .remove(id)
    .catch((error)=>{
      setColor('red')
      setMessage(`Information on ${person.name} has already been removed from server`)
      setTimeout(()=>{
        setMessage(null);
        setColor(null)
      }, 2500)
    })
    setPersons(persons.filter(person => person.id != id))
  }
 }

  return(
    <div>
      {persons.map((person) =>(
      <p key={person.id}>{person.name} {person.number} <button onClick={() => deleteTrigger(person.id, person)}>delete</button></p>
      ))}
    </div>
  )
}

const App = () => {
  // APP State
  const [persons, setPersons] = useState([])
  const[message, setMessage] = useState(null)
  const[color, setColor] = useState(null)

  useEffect(()=>{
    webServices
    .getAll()
    .then(res => setPersons(res))
  },[])

  // App return statement
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification color={color} message={message}/>
      <SearchFilter persons={persons}/>
      <h2>Add a new contact</h2>
      <Form setColor={setColor} setMessage={setMessage} persons={persons} setPersons={setPersons}/>
      <h2>Numbers</h2>
      <DisplayContacts setMessage={setMessage} setColor={setColor} setPersons={setPersons} persons={persons}/>
    </div>
  )
}

export default App

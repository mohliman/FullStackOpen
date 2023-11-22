import { useState } from 'react'

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const newArray = new Array(anecdotes.length).fill(0);
  const [vote, setVote] = useState(newArray)




  function randomNumber(){
    let ran = Math.floor(Math.random() * anecdotes.length)
    setSelected(ran)
  }


  function upVote(){
    const newArray = [...vote]
    newArray[selected] += 1;
    setVote(newArray)
  }

  function highestVotes(){
    let highest = 0;
    for (let i = 0; i < vote.length; i++) {
      if(vote[i] > highest){
        highest = vote[i]
      }
    }
    return highest;
  }

let highVotes = highestVotes()
let indexOfHighVotes = vote.indexOf(highVotes)


if(highVotes === 0){
  return(
    <div>
    <h2>Anecdote of the day</h2>
    <p>{anecdotes[selected]}</p>
    <p>has {vote[selected]} votes</p>
    <button onClick={upVote}>vote</button>
    <button onClick={randomNumber}>next anecdote</button>
    <h2>Anecdote with the most votes</h2>
    <p>You haven't made a vote yet</p>
  </div>
  )
}
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <button onClick={upVote}>vote</button>
      <button onClick={randomNumber}>next anecdote</button>
      <h2>Anecdote with the most votes</h2>
      <p>{anecdotes[indexOfHighVotes]}</p>
      <p>has {vote[indexOfHighVotes]} votes</p>
    </div>

  )
}

export default App

import { useState } from 'react'

function StatisticLine(props) {
  return (
    <div>
      <table>
        <tbody>
         <tr>
            <td>{props.title1}</td>
            <td>{props.value1}</td>
          </tr>
         <tr>
            <td>{props.title2}</td>
            <td>{props.value2}</td>
          </tr>
         <tr>
            <td>{props.title3}</td>
            <td>{props.value3}</td>
          </tr>
         <tr>
            <td>{props.title4}</td>
            <td>{props.value4}</td>
          </tr>
         <tr>
            <td>{props.title5}</td>
            <td>{props.value5}</td>
          </tr>
         <tr>
            <td>{props.title6}</td>
            <td>{props.value6}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
function Statistics(props) {
  return (
    <div>
      <StatisticLine title1={props.title1}
                     title2={props.title2}
                     title3={props.title3}
                     title4={props.title4}
                     title5={props.title5}
                     title6={props.title6}
                     value1={props.value1}
                     value2={props.value2}
                     value3={props.value3}
                     value4={props.value4}
                     value5={props.value5}
                     value6={props.value6}/>
    </div>
  )
}
function Button(props) {
  return (
    <div>
      <button onClick={props.onClick1}>{props.text1}</button>
      <button onClick={props.onClick2}>{props.text2}</button>
      <button onClick={props.onClick3}>{props.text3}</button>
    </div>
  )
}

function App() {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)


  function goodHandler(){
    let num1 = good + 1;
    setGood(num1)
    setAll(num1 + neutral + bad)
    setAverage((num1 + neutral + bad) / 3)
    setPositive((num1 / (num1 + neutral + bad)) * 100)
  }

  function neutralHandler(){
    let num2 = neutral + 1;
    setNeutral(num2)
    setAll(num2 + bad + good)
    setAverage((num2 + bad + good) / 3)
  }

  function badHandler(){
    let num3 = bad + 1;
    setBad(num3)
    setAll(num3 + good + neutral)
    setAverage((num3 + good + neutral) / 3)
  }

  if(good === 0 && neutral === 0 && bad === 0){
    return (
      <div>
      <h1>Give feedback</h1>
      <Button text1={'good'}
              text2={'neutral'}
              text3={'bad'}
              onClick1={goodHandler}
              onClick2={neutralHandler}
              onClick3={badHandler}/>
      <h2>Statistics</h2>
      <p>No feedback given</p>
    </div>
    )
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text1={'good'}
              text2={'neutral'}
              text3={'bad'}
              onClick1={goodHandler}
              onClick2={neutralHandler}
              onClick3={badHandler}/>
      <h2>Statistics</h2>
      <Statistics title1={'good'}
                  title2={'neutral'}
                  title3={'bad'}
                  title4={'all'}
                  title5={'average'}
                  title6={'positive'}
                  value1={good}
                  value2={neutral}
                  value3={bad}
                  value4={all}
                  value5={parseFloat(average.toFixed(1))}
                  value6={`${parseFloat(positive.toFixed(1))} %`}
                  />
    </div>
  )
}

export default App

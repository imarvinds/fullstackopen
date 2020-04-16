import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const Feedback = ({ good, neutral, bad, setGood, setNeutral, setBad}) => (
  <>
    <h2>give feedback</h2>
    <Button onClick={() => { setGood(good + 1) }} text="good" />
    <Button onClick={() => { setNeutral(neutral + 1) }} text="neutral" />
    <Button onClick={() => { setBad(bad + 1) }} text="bad" />
  </>
)


const Statistics = ({good, neutral, bad, total, positive}) => {
  if (total) {
    return (
      <>
        <h2>statistics</h2>
        good {good} <br />
        neutral {neutral} <br />
        bad {bad} <br />
        all {total} <br />
        average {(good - bad)} <br />
        positive {positive} %
      </>
    )
  } else {
    return (
      <p>
        No feedback given
      </p>
    )
  }

}

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad 
  let positive
   
  if (total) {
    positive = good * 100 / total
  } else {
    positive=0
  }

  return (
    <>
      <Feedback good={good} neutral={neutral} bad={bad} setGood={setGood} setNeutral={setNeutral} setBad={setBad} />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} positive={positive} />
    </>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
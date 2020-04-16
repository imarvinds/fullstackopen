import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let positive

  if (good > 0) {
    positive = good * 100 / (good + neutral + bad)
  } else {
    positive = 0
  }

  const Button = (props) => (
    <button onClick={props.function}>
      {props.text}
    </button>
  )

  const Feedback = () => (
    <>
      <h2>give feedback</h2>
      <Button function={() => { setGood(good + 1) }} text="good" />
      <Button function={() => { setNeutral(neutral + 1) }} text="neutral" />
      <Button function={() => { setBad(bad + 1) }} text="bad" />
    </>
  )


  const Stats = () => {
    return (
      <>
        <h2>statistics</h2>
        good {good} <br />
        neutral {neutral} <br />
        bad {bad} <br />
        all {good + neutral + bad} <br />
        average {(good - bad)} <br />
        positive {(positive) + ' %'}
      </>
    )
  }

  return (
    <>
      <Feedback />
      <Stats />
    </>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
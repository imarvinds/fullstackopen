import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const Block1 = (props) => {
  return (
  <>
      <h2>{props.title}</h2>
      {props.anecdotes[props.selected]} <br /> has {props.record1[props.selected]} votes <br />
  </>
  )
}

const Block2 = (props) => {
  let temp = Object.values(record1)
  let max = Math.max(...temp)
  
  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
  return (
    <>
      <h2>{props.title}</h2>
      {props.anecdotes[getKeyByValue(temp, max)]} <br /> has {props.record1[getKeyByValue(temp, max)]} votes <br />
    </>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(0) 
  
  
  const voteBtn = () => { 
    console.log('vote clicked')
    setVote(vote+1)
    record1[selected] += 1
  } 


  const nextBtn = () => { 
    setSelected(Math.floor(Math.random() * props.anecdotes.length)) 
  } 

  return (
    <div>
      <Block1 title="Anecdote of the day" anecdotes={anecdotes} record1={record1} selected={selected} />
      <Button onClick={voteBtn} text={"vote"} />
      <Button onClick={nextBtn} text={"next anecdote"}  />
      <Block2 title="Anecdote with most votes" anecdotes={anecdotes} record1={record1} selected={selected} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const record = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
const record1 = { ...record }


ReactDOM.render(
  <App anecdotes={anecdotes} record1={record1} />,
  document.getElementById('root')
)

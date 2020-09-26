import React from 'react';

const Header = ({ cnames }) => {
    return (
        <h2>{cnames}</h2>
    )
}

const Total = ({ courseParts }) => {
    return (
        <b> total of {courseParts.reduce((acc, cur) => { return { exercises: acc.exercises + cur.exercises } }).exercises} exercises</b>

    )
}

const Part = ({ part }) => {
    return (
        <p> {part.name} {part.exercises} </p>
    )
}

const Content = ({ parts }) => {
    return (
        parts.map((part) => <Part part={part} key={part.id} />)
    )
}

const Course = ({course}) => {
  return(
      <div>
        <Header cnames={course.name}/> 
        <Content parts={course.parts} />
        <Total courseParts={course.parts} />
      </div>
  )
}

export default Course
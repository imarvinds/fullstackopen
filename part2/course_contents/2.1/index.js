import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ cName }) => {
  return (
    <h1>{cName}</h1>
  )
}

const Total = ({ course }) => {
  const sum = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
  return (
    <p>Number of exercises {sum}</p>
  )
}

const Part = ({part}) => {
  return (
    <div>
      {
        part.map(part =>
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        )
      }
    </div>   
  )
} 


const Content = ({ parts }) => {
  return (
    <Part part={parts} />
  )
}

const Course = ({ course }) => {
  console.log(course)

  return(
    <div>
      <Header cName={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  //course.parts.map(x => x.id = course.parts.indexOf(x))
  
  for(let i=0; i<course.parts.length; i++) {
    course.parts[i].id=i;
  }
  
  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
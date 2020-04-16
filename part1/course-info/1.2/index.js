import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    console.log(props)
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const Part = (props) => {
    console.log(props)
    return (
        <>
            <p>
                {props.part} {props.exnum}
            </p>
        </>
    )
}


const Content = (props) => {
    console.log(props)
    return (
        <div>
            <Part part={props.part1} exnum={props.exercises1} />
            <Part part={props.part2} exnum={props.exercises2} />
            <Part part={props.part3} exnum={props.exercises3} />
        </div>
    )
}

const Total = (props) => {
    console.log(props)
    return (
        <div>
            <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
        </div>
    )

}

const App = () => {
    const course = 'Half Stack application development'
    const exercises1 = 10
    const exercises2 = 7
    const exercises3 = 14
    const part1 = 'Fundamentals of React'
    const part2 = 'Using props to pass data'
    const part3 = 'State of a component'

    return (
        <div>
            <Header course={course} />
            <Content exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} part1={part1} part2={part2} part3={part3} />
            <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
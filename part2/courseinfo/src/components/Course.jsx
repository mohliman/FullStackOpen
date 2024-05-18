const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => {
  let total = sum.reduce((s, p) => s + p.exercises, 0)
  return (
    <p><strong>Number of exercises {total}</strong></p>
  )
}

const Part = ({ name, exercises }) =>
  <p>
    {name} {exercises}
  </p>

const Content = ({ parts }) =>(
  <div>
    {parts.map((part) =>(
      <Part
        key={part.id}
        name={part.name}
        exercises={part.exercises}
      />
    ))}
  </div>)

function Course({course, name}){
 return(
  <div>
      <Header course={name} />
      <Content parts={course} />
      <Total sum={course} />
  </div>
 )
}

export default Course

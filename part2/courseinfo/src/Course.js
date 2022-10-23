const MainHeader = ({ course }) => <h1>{course}</h1>

const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <p><strong>Number of exercises {sum}</strong></p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(p => <Part key={p.id} part={p}/>)}
  </>

const Course = ({course}) => {
  const total = course.parts.reduce((s, p) => {
    // console.log(s, p.exercises, s + p.exercises)
    return s + p.exercises
  }, 0)
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total sum={total}/>
    </div>
  )
}

const Curriculum = ({courses, name}) => {
  return (
    <div>
      <MainHeader course={name} />
      {courses.map(course => <Course key={course.id} course={course} />)}
    </div>
  )
}

export default Curriculum
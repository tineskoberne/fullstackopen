import { useState } from 'react'

const DisplayAnectode = (props) => {
  return (
    <div>
      <p>{props.anecdotes[props.index]}</p>
      <p>has {props.votes[props.index]} votes</p>
    </div>
  )
}

const Button = ({handleButton, text}) => {
  return <button onClick={handleButton}>{text}</button>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const handleSelected = () => {
    const index = Math.ceil(Math.random() * anecdotes.length) - 1;
    if (index === selected) {
      handleSelected()
    }
    else {
      setSelected(index)
    }
  }

  const handleVote = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)
  }

  const getIndexWithMostVotes = () => {
    const max = Math.max(...votes);
    return votes.indexOf(max);
  }

  return (
    <div>
      <h1>Anectode of the day</h1>
      <DisplayAnectode anecdotes={anecdotes} votes={votes} index={selected}/>

      <Button handleButton={handleVote} text="vote"/>
      <Button handleButton={handleSelected} text="next anectode"/>

      <h1>Anectode with most votes</h1>
      <DisplayAnectode anecdotes={anecdotes} votes={votes} index={getIndexWithMostVotes()}/>

    </div>
  )
}

export default App
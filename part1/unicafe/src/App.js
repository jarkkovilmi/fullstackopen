import { useState } from 'react'

const Button = (props) => {
	const { handleClick, text} = props
	return (
		<button onClick={handleClick}>
			{text}
		</button>
	)
}

// const Statistics = (props) => {
// 	return (

// 	)
// }

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

	const handleGoodClick = () => setGood(good + 1)
	const handleNeutralClick = () => setNeutral(neutral + 1)
	const handleBadClick = () => setBad(bad + 1)

	let feedbackTotal = good + neutral + bad
	let average = (good * 1 + neutral * 0 + bad * -1) / feedbackTotal
	let positive = (good / feedbackTotal) * 100 + " %"

  return (
    <div>
			<h1>give feedback</h1>
			<div>
				<Button handleClick={handleGoodClick} text="good" />
				<Button handleClick={handleNeutralClick} text="neutral" />
				<Button handleClick={handleBadClick} text="bad" />
			</div>
			<h1>statistics</h1>
			<div>good {good}</div>
			<div>neutral {neutral}</div>
			<div>bad {bad}</div>
			<div>average {average}</div>
			<div>positive {positive}</div>
    </div>
  )
}

export default App

import { useState } from 'react'

const Button = ({ setter, text, counter }) => {
	console.log(setter)
	const increaseValue = () => setter(counter + 1)
	return (
		<button onClick={increaseValue}>
			{text}
		</button>
	)
}

const StatisticLine = ({ text, value }) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	)
}

const Statistics = ({ good, neutral, bad }) => {
	let feedbackTotal = good + neutral + bad
	let average = (good * 1 + neutral * 0 + bad * -1) / feedbackTotal
	let positive = `${(good / feedbackTotal) * 100} %`

	if (feedbackTotal > 0) {
	return (
		<div>
			<h1>statistics</h1>
			<table>
				<tbody>
					<StatisticLine text="good" value={good} />
					<StatisticLine text="neutral" value={neutral} />
					<StatisticLine text="bad" value={bad} />
					<StatisticLine text="all" value={feedbackTotal} />
					<StatisticLine text="average" value={average} />
					<StatisticLine text="positive" value={positive} />
				</tbody>
			</table>
		</div>
	)
	} else {
		return (
			<div>
				<h1>statistics</h1>
				<div>No feedback given</div>
			</div>
		)
	}
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
			<h1>give feedback</h1>
			<div>
				<Button counter={good} setter={setGood} text="good" />
				<Button counter={neutral} setter={setNeutral} text="neutral" />
				<Button counter={bad} setter={setBad} text="bad" />
			</div>
				<Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App

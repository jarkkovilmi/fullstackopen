import { useMutation, useQuery } from "@apollo/client"
import { useState } from "react"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import Select from 'react-select'

const Authors = ({ show }) => {
	const result = useQuery(ALL_AUTHORS)
	const [name, setName] = useState('')
  const [born, setBorn] = useState('')
	const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
		refetchQueries: [ { query: ALL_AUTHORS } ]
	})
	
	if (!show) {
		return null
	}

	if (result.loading)  {
		return <div>loading...</div>
  }
	
	const authors = result.data.allAuthors

	const submit = async (event) => {
		event.preventDefault()
		editAuthor({ variables: { name, setBornTo: born } })
		setName('')
		setBorn('')
	}

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
			<h2>Set birth year</h2>
			<form onSubmit={submit}>
				<Select
					onChange={({ value }) => setName(value)}
					options={authors.map(a => ({ value: a.name, label: a.name }))}
				/>
				<div>
					born
				<input
					type="number"
					value={born}
					onChange={({ target }) => setBorn(Number(target.value))}
				/>
				</div>
				<button type="submit">update author</button>
			</form>
    </div>
  )
}

export default Authors
import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { ALL_BOOKS } from "../queries"

const Books = ({ show }) => {
	const result = useQuery(ALL_BOOKS)
	const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
	const [books, setBooks] = useState([])

	useEffect(() => {
    if (result.data) {
			const genres = result.data.allBooks.map(b => b.genres)
			const allGenres = []
			for (const genre of genres)
				allGenres.push(...genre)
			setGenres([...new Set(allGenres)])
			setBooks(result.data.allBooks)
    }
  }, [result]) // eslint-disable-line

  if (!show)
    return null

  return (
    <div>
      <h2>books</h2>
			{genre 
				? <p>in genre <strong>{genre}</strong></p>
				: null
			}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
					{genre
						?	books.filter((b) => b.genres.includes(genre)).map((b) => (
								<tr key={b.title}>
									<td>{b.title}</td>
									<td>{b.author.name}</td>
									<td>{b.published}</td>
								</tr>
							))
						: books.map((a) => (
								<tr key={a.title}>
									<td>{a.title}</td>
									<td>{a.author.name}</td>
									<td>{a.published}</td>
								</tr>
						))
					}
        </tbody>
      </table>
          {genres.map((g) => (
            <button key={g} onClick={() => setGenre(g)}>{g}</button>
          ))}
					<button onClick={() => setGenre('')}>all genres</button>
    </div>
  )
}

export default Books

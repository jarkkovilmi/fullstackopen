import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { ALL_BOOKS } from "../queries"
import BooksTable from "./BooksTable"

const Books = ({ show }) => {
	const result = useQuery(ALL_BOOKS)
	const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
	const [books, setBooks] = useState([])

	useEffect(() => {
    if (result.data) {
			const allGenres = result.data.allBooks.map(b => b.genres).flat()
			setGenres([...new Set(allGenres)])
			setBooks(result.data.allBooks)
    }
  }, [result]) // eslint-disable-line

  if (!show)
    return null

  return (
    <div>
      <h2>books</h2>
			{genre && <p>in genre <strong>{genre}</strong></p>}
			<BooksTable books={
				!genre ? books : books.filter((b) => b.genres.includes(genre))
			}
			/>
			{genres.map((g) => (
				<button key={g} onClick={() => setGenre(g)}>{g}</button>
			))}
			<button onClick={() => setGenre('')}>all genres</button>
    </div>
  )
}

export default Books

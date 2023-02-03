import { useQuery } from "@apollo/client"
import { ALL_BOOKS, ME } from "../queries"
import BooksTable from "./BooksTable"

const Recommend = ({ show }) => {
	const result = useQuery(ALL_BOOKS)
	const meResult = useQuery(ME)

  if (!show)
    return null

	const books = result.data.allBooks
	const genre = meResult.data.me.favoriteGenre

  return (
    <div>
      <h2>recommendations</h2>
			<p>books in your favorite genre <strong>{genre}</strong></p>
			<BooksTable books={books.filter((b) => b.genres.includes(genre))} />
    </div>
  )
}

export default Recommend

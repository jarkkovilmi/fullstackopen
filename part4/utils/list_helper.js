const _ = require('lodash')

const dummy = (blogs) => {
	if (blogs)
		return 1
	return 1
}

const totalLikes = (blogs) => {
	const reducer = (sum, item) => {
		return sum + item['likes']
	}
	return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
	const reducer = (previous, current) => {
		return (previous.likes > current.likes) ? previous : current
	}
	return blogs.length === 0
		? 0
		: blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
	if (blogs.length === 0)
		return 0

	const blogsByAuthor = _.countBy(blogs, 'author')
	const mostBlogsAuthor = Object.entries(blogsByAuthor).reduce((previous, current) => {
		return (previous[1] > current[1]) ? previous : current
	})
	return { author: mostBlogsAuthor[0], blogs: mostBlogsAuthor[1] }
}

const mostLikes = (blogs) => {
	if (blogs.length === 0)
		return 0

	const groupedByAuthor = _.groupBy(blogs, 'author')
	const blogsByLikes = _.mapValues(groupedByAuthor, totalLikes)
	const mostLikesAuthor = Object.entries(blogsByLikes).reduce((previous, current) => {
		return (previous[1] > current[1]) ? previous : current
	})
	return { author: mostLikesAuthor[0], likes: mostLikesAuthor[1] }
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}
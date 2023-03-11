/* eslint-disable no-undef */
db.createUser({
	user: 'the_username',
	pwd: 'the_password',
	roles: [
		{
			role: 'dbOwner',
			db: 'the_database',
		},
	],
})

db.createCollection('blogs')
db.createCollection('users')

db.users.insert({
    _id: ObjectId("640c904eea9aed637ddaa34c"),
    username: 'tuser',
    name: 'Test User',
    passwordHash: '$2b$10$pEN5IqCUFR9qrXTsrvhWn.H4CIeLGtHgBxJMoHuzZCIzdkwdohLGq',
    __v: 1,
    blogs: [ ObjectId("640c916e27f6739734bd656f") ]
})
db.blogs.insert({
    _id: ObjectId("640c916e27f6739734bd656f"),
    title: 'uusi blogi',
    author: 'TJ',
    url: 'www.test.test',
    likes: 0,
    user: ObjectId("640c904eea9aed637ddaa34c"),
    comments: [ 'uusi kommentti' ],
    __v: 1
})
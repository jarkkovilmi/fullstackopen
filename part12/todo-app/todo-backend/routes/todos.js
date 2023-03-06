const express = require('express');
const { Todo } = require('../mongo');
const { REDIS_URL } = require('../util/config');
const router = express.Router();
const redis = require('../redis');


/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
	const incrementedCounter = Number(await redis.getAsync('added_todos')) + 1
	redis.setAsync('added_todos', incrementedCounter);
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
	res.send(req.todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
	req.todo.text = req.body.text
	req.todo.done = req.body.done
	try {
		const updatedTodo = await Todo.findByIdAndUpdate(req.todo.id, req.todo, { new: true })
		res.send(updatedTodo)
	} catch(e) {
		return res.sendStatus(400)
	}
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;

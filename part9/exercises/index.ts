/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	const height = Number(req.query.height);
	const weight = Number(req.query.weight);

	if (isNaN(height) || isNaN(weight)) {
		return res.status(400).json({ error: 'malformatted parameters' });
	} else {
		const bmi = calculateBmi(height, weight);
		return res.json({ weight, height, bmi });
	}
});

app.post('/exercises', (req, res) => {
	const target: number = req.body.target;
	const daily_exercises: Array<number> = req.body.daily_exercises;

	if ( !target || !daily_exercises ) {
    res.status(400).send({ error: 'parameters missing' });
  }

	if ( isNaN(target) || daily_exercises.includes(NaN) ) {
    res.status(400).send({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(target, daily_exercises);

  res.send({ result });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
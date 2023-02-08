interface Result {
  periodLength: number,
	trainingDays: number,
	success: boolean,
	rating: number,
	ratingDescription: string,
	target: number,
	average: number
}

const calculateExercises = (target: number, hours: number[]): Result  => {
	const periodLength = hours.length;
	const trainingDays = hours.filter(value => value !== 0).length;
	const average = hours.reduce((a, b) => a + b) / periodLength;
	const success: boolean = average >= target;

	let rating: number;
	let ratingDescription: string;

	switch (true) {
		case success:
			rating = 3;
			ratingDescription = 'your goal was reached, successful training period!';
			break;
		case average < (0.5 * target):
			rating = 1;
			ratingDescription = 'try to improve for the next period';
			break;
		case average >= (0.5 * target):
			rating = 2;
			ratingDescription = 'not too bad but could be better';
			break;
	}

	return {
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target,
		average
	};
};

interface ExerciseValues {
	target: number;
  hours: number[];
}

export const parseArguments = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

	const valuesForCalc = args.slice(2).map(Number);
	const [ target, ...hours ] = valuesForCalc;

  if (!isNaN(target) && !hours.includes(NaN)) {
    return { target, hours };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const { target, hours } = parseArguments(process.argv);
  console.log(calculateExercises(target, hours));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
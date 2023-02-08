interface Result {
  periodLength: number,
	trainingDays: number,
	success: boolean,
	rating: number,
	ratingDescription: string,
	target: number,
	average: number
}

const calculateExercises = (hours: number[], target: number): Result  => {
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
		case average > (0.5 * target):
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
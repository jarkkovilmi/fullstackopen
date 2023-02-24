const formatDate = (dateString) => {
	const date = new Date(dateString);
	const [month, day, year] = [
		date.getMonth(),
		date.getDate(),
		date.getFullYear()
	];
	return `${day}.${month + 1}.${year}`;
};

export default formatDate;
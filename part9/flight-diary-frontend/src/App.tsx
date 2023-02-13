import { useEffect, useState } from 'react';
import { Diary, NotificationProps } from './types';
import { getAllDiaries, createDiary } from './services/diaryService';

const Notification = ({ notification }: NotificationProps) => {
	const style = {
		color: "red",
		fontSize: "20px",
		paddingBottom: "10px"
	};

  if (notification === null) {
    return null;
  }

  return (
    <div style={style}>{notification}</div>
  );
};

const App = () => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');
  const [diaries, setDiaries] = useState<Diary[]>([]);
	const [notification, setNotification] = useState('');

	useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data);
    });
  }, []);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
		const newDiary = {
			date,
			weather,
			visibility,
			comment
		};
		console.log(newDiary);
		createDiary(newDiary)
			.then(data => setDiaries(diaries.concat(data)))
			.catch((error) => {
				console.log(error);
				setNotification(error.response.data);
				setTimeout(() => {setNotification('');}, 4000);
		});

    setDate('');
		setComment('');
  };

	return (
    <div>
			<h1>Add new entry</h1>
			<Notification notification={notification} />
      <form onSubmit={diaryCreation}>
				<div>date:
					<input 
						type="date" value={date} onChange={(event) => setDate(event.target.value)}>
					</input>
				</div>
				<div>visibility:
					great <input type="radio" name="visibility"
						onChange={() => setVisibility("great")} />
					good <input type="radio" name="visibility"
						onChange={() => setVisibility("good")} />
					ok <input type="radio" name="visibility"
						onChange={() => setVisibility("ok")} />
					poor <input type="radio" name="visibility"
						onChange={() => setVisibility("ok")} />
				</div>
				<div>weather:
					sunny <input type="radio" name="weather"
						onChange={() => setWeather("sunny")} />
					rainy <input type="radio" name="weather"
						onChange={() => setWeather("rainy")} />
					cloudy <input type="radio" name="weather"
						onChange={() => setWeather("cloudy")} />
					stormy <input type="radio" name="weather"
						onChange={() => setWeather("stormy")} />
					windy <input type="radio" name="weather"
						onChange={() => setWeather("windy")} />
				</div>
				<div>comment:
					<input
						value={comment} onChange={(event) => setComment(event.target.value)}>
					</input>
				</div>
        <button type='submit'>add</button>
      </form>
			<h1>Diary entries</h1>
        {diaries.map(diary => (
					<div key={diary.id}>
						<h2>{diary.date}</h2>
						<div>visibility {diary.visibility}</div>
						<div>weather {diary.weather}</div>
					</div>
				))}
    </div>
  );
};

export default App;
import { useEffect, useState } from 'react';
import { Diary } from './types'
import { getAllDiaries, createDiary } from './services/diaryService';

const App = () => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');
  const [diaries, setDiaries] = useState<Diary[]>([]);

	useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
		const newDiary = {
			date,
			weather,
			visibility,
			comment
		}
    createDiary(newDiary).then(data => {
      setDiaries(diaries.concat(data))
    })

    setDate('');
		setWeather('');
		setVisibility('');
		setComment('');
  };

	return (
    <div>
			<h1>Add new entry</h1>
      <form onSubmit={diaryCreation}>
				<div>date:
					<input 
						value={date} onChange={(event) => setDate(event.target.value)}>
					</input>
				</div>
				<div>weather:
					<input
						value={weather} onChange={(event) => setWeather(event.target.value)}>
					</input>
				</div>
				<div>visibility:
					<input
						value={visibility} onChange={(event) => setVisibility(event.target.value)}>
					</input>
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
  )
}

export default App;
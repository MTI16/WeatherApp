import { useEffect, useState } from 'react';
import './App.css';

export default function App() {
  const [cords, setCords] = useState();
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [weatherData, setWeatherData] = useState();
  const [input, setInput] = useState();
  const [location, setLocation] = useState('Schwerin');

  //get coordinates
  useEffect(() => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=edcc0651185666a6a14403d285a0f716`, {mode: 'cors',})
    .then(res => res.json())
    .then(data => setCords(data));
  }, [location]);

  useEffect(() => {
    if(cords) {
      setLat(cords[0].lat);
      setLon(cords[0].lon);
    }
  }, [cords]);

  //get weather data
  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current&units=metric&lang=de&appid=edcc0651185666a6a14403d285a0f716`, {mode: 'cors'})
      .then(res => res.json())
      .then(data => setWeatherData(data));
  }, [lat, lon]);
  
  function handleInput() {
    setLocation(input);
    setInput('');
  }

  return(
    <>
      <h1>Hello</h1>
      <input type="text" 
      value={input}
      onChange={e => setInput(e.target.value)}/>
      <button onClick={handleInput}>submit</button>
      {lat ? (<p>{lat}</p>) : (<p>loading</p>)}
      {lon ? (<p>{lon}</p>) : (<p>loading</p>)}
      {weatherData ? (<p>{weatherData.daily[0].temp.day}</p>) : (<p>loading</p>)}
    </>
  );
}
import { useEffect, useState } from 'react';
import './App.css';

export default function App() {
  const [location, setLocation] = useState('Schwerin')
  const [weatherData, setData] = useState();
  const [input, setInput] = useState();

  useEffect(() => {
    fetch(`https://api.weatherapi.com/v1/current.json?key=81c68d0d286348f4add222429240302 &q=${location}&aqi=no`, {mode: 'cors'})
      .then(res => res.json())
      .then(data => setData(data));
  }, [location]);

  function handleClick() {
    setLocation(input);
    setInput('');
  }

  return(
    <>
      <div className="input">
        <h1 id='heading'>Weather App</h1>
        <input type="text" 
        value={input}
        onChange={e => setInput(e.target.value)}/>
        <button onClick={handleClick}>Enter</button>
      </div>
      <div className="weather">
        {weatherData ? <h3 id='temp'>{weatherData.current.temp_c}&#8451;</h3> : (<p>loading</p>)}
        {weatherData ? <p id='country'>{weatherData.location.country}</p> : (<p>loading</p>)}
        {weatherData ? <p id='region'>{weatherData.location.region}</p> : (<p>loading</p>)}
        {weatherData ? <p id='text'>{weatherData.current.condition.text}</p> : (<p>loading</p>)}
        {weatherData ? <img src={weatherData.current.condition.icon} alt="" id='icon'/> : (<p>loading</p>)}
      </div>
    </>
  );
}
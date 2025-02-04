import axios from "axios";
import React, { useEffect, useState } from "react";

const Weather = () => {
  const [temp, setTemp] = useState('');
  const [desc, setDesc] = useState('');
  const [icon, setIcon] = useState('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    axios.get('http://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: 'London',
        APPID: '5446ac4387bc50c30f76292fbf051282',
        units: 'metric'
      }
    })
    .then(response=>{
      setTemp(response.data.main.temp);
      setDesc(response.data.weather[0].main);
      setIcon(response.data.weather[0].icon);
      setIsReady(true);
    })
    .catch(error => console.log(error))
  }, []);

  if(isReady){
  return (
    <div className="Weather">
      <p>온도:{temp}°C</p>
      <p>날씨:{desc}</p>
      <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather icon" />
    </div>
  );
}
else{
  return <>로딩중....</>
  }
}
export default Weather;

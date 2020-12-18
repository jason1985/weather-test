import axios from 'axios'
import {useEffect, useState} from 'react'


const URL = "https://api.openweathermap.org/data/2.5/weather?"
const URL_ONECALL = "https://api.openweathermap.org/data/2.5/onecall?"

function UnixTime(number) {
  if(!number){
    return ""
  }
  return new Date(number * 1000).toLocaleTimeString("en-US")
}

function UnixDate(number) {
  if(!number){
    return ""
  }
  return new Date(number * 1000).toLocaleDateString("en-US")
}

function App() {
  const [peeps,setPeeps] = useState({main: "",sys: "",weather: [{main:""}]})
  const [hourly,setHourly] = useState([])
  const [daily, setDaily] = useState([])

  console.log(process.env.REACT_APP_APIKEY)
  useEffect(() => {
    axios.get(URL_ONECALL, {
      params:{
        // q: "ho chi minh",
        lat: 10.8231,
        lon: 106.6297,
        units: "imperial",
        exclude: "minutely",
        appid: process.env.REACT_APP_APIKEY
      }
    })
    .then(({data})=> {
      console.log(data)
      setHourly(data.hourly)
      setDaily(data.daily)

    })



  },[])

  return(
    <>
    <h1>hourly forecast</h1>
    {
      hourly.map((hour) => (
        <div>
          {`${UnixTime(hour.dt)} Temp: ${hour.temp} Chance of rain: ${Math.round(hour.pop * 100)}%`}
        </div>
      ))
    }
    <h1>8 day forecast</h1>
    {
      daily.map((day) => (
        <div>
          {`${UnixDate(day.dt)} High: ${Math.round(day.temp.max)} Low: ${Math.round(day.temp.min)}`}
        </div>
      ))
    }
    </>
  )
}

export default App;






// temp: {peeps.main.temp}
// <br />
// pressure: {peeps.main.pressure}
// <br />
// humidity: {peeps.main.humidity}
// <br />
// Sunrise: {UnixTime(Number(peeps.sys.sunrise))}
// <br />
// Sunset: {UnixTime(Number(peeps.sys.sunset))}
// <br />
// Weather: {peeps.weather[0].main}
// <br />
// icon: <img src={`http://openweathermap.org/img/wn/${peeps.weather[0].icon}@2x.png`}></img>
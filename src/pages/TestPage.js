import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useGeolocated } from "react-geolocated"



function TestPage() {



    const { coords } = useGeolocated();

    console.log(coords)


  const [locationCity, setLocationCity] = useState({
    isSuccess: false,
    data: {}
  });



  const renderMyLocation = async (lat, lon) => {

    await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7b2a5c4cc87bf1f4e3da7953cdba629c&units=metric`)
      .then(res => setLocationCity({ isSuccess: true, data: res.data }))
      .catch(err => console.log(err))

  }

  useEffect(() => {


    if(coords){
      renderMyLocation(coords.latitude, coords.longitude)

    }

  }, [coords])



  const [cityName, setCityName] = useState("");

  const [city, setCity] = useState({
    isSuccess: false,
    data: {}
  });

  const onClick = () => {
    let query = document.getElementById("cityName").value
    weatherData(query)
  }



  const weatherData = async (query) => {
    await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=7b2a5c4cc87bf1f4e3da7953cdba629c&units=metric`)
      .then(res => setCity({ isSuccess: true, data: res.data }))
      .catch(err => console.log(err))
  }



  return (
    <div className="container">
      <p className="text-center" style={{ fontSize: "30px" }}>Şehir İsmi</p>
      <input onChange={(e) => setCityName(e.target.value)} id="cityName" type="text" className="form-control" />
      <div className="container text-center">
        <button onClick={() => onClick()} className="btn btn-primary mt-3 btn-m">Ara</button>
        <button  className="btn btn-success mt-3 btn-m">My Location</button>
      </div>


      {city.isSuccess ? (<div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{city.data.name}</h5>
          <p className="card-text">{city.data.main.temp} 'C</p>
        </div>
      </div>) : (<></>)}

      {locationCity.isSuccess ? (<div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{locationCity.data.name}</h5>
          <p className="card-text">{locationCity.data.main.temp} 'C</p>
        </div>
      </div>) : (<></>)}






    </div>
  )
}

export default TestPage
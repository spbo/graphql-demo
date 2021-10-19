import React from "react";

import summary from "../Images/summary.png";
import temperature from "../Images/temperature.jpg";
import wind from "../Images/wind.jpg";
import clouds from "../Images/clouds.png";

const DisplayData = ({ data }) => {
  const city = data.getCityByName;

  if (city === null) {
    return (
      <div className="city_not_found">
        "City couldn't be found. Please try another one"
      </div>
    );
  } else {
    const date = new Date(city.weather.timestamp * 1000).toLocaleString();
    return (
      <div>
        <div className="info">
          <p>Country Code: {city.country}</p>
          <p>City Name: {city.name}</p>
          <p>Data calculation: {date}</p>
        </div>
        <div className="weather">
          <div className="summary">
            <div className="title_img">
              <img src={summary} className="summary_img" alt="" />
              <p className="title">Summary</p>
            </div>
            <p>
              <span className="subtitle">Title:</span>{" "}
              {city.weather.summary.title}{" "}
              <img
                src={`http://openweathermap.org/img/wn/${city.weather.summary.icon}@2x.png`}
                style={{ width: "30px" }}
                alt=""
              />
            </p>
            <p>
              <span className="subtitle">Description:</span>{" "}
              {city.weather.summary.description}
            </p>
          </div>
          <div className="temperature">
            <div className="title_img">
              <img src={temperature} className="temperature_img" alt="" />
              <p className="title">Temperature</p>
            </div>
            <p>
              <span className="subtitle">Actual:</span>{" "}
              {city.weather.temperature.actual} &#8451;
            </p>
            <p>
              <span className="subtitle">Feels Like:</span>{" "}
              {city.weather.temperature.feelsLike} &#8451;
            </p>
            <p>
              <span className="subtitle">Min Temperature:</span>{" "}
              {city.weather.temperature.min} &#8451;
            </p>
            <p>
              <span className="subtitle">Max Temperature:</span>{" "}
              {city.weather.temperature.max} &#8451;
            </p>
          </div>
          <div className="wind">
            <div className="title_img">
              <img src={wind} className="wind_img" alt="" />
              <p className="title">Wind</p>
            </div>
            <p>
              <span className="subtitle">Speed:</span> {city.weather.wind.speed}{" "}
              meter/sec
            </p>
            <p>
              <span className="subtitle">Direction:</span>{" "}
              {city.weather.wind.deg} degrees (metereological)
            </p>
          </div>
          <div className="clouds">
            <div className="title_img">
              <img src={clouds} className="clouds_img" alt="" />
              <p className="title">Clouds</p>
            </div>
            <p>
              <span className="subtitle">Cloudiness: </span>
              {city.weather.clouds.all} %
            </p>
            <p>
              <span className="subtitle">Visibility:</span>{" "}
              {city.weather.clouds.visibility} meters
            </p>
            <p>
              <span className="subtitle">Humidity: </span>
              {city.weather.clouds.humidity} %
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default DisplayData;

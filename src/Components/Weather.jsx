import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import image_icon from "../assets/search.png";
import clear from "../assets/clear.png";
import wind from "../assets/wind.png";
import humidity from "../assets/humidity.png";
import clouds from "../assets/clouds.png";
import drizzle from "../assets/drizzle.png";
import hase from "../assets/hase.png";
import mist from "../assets/mist.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
function Weather() {
  const [value, setValue] = useState("");
  const [data, setData] = useState(null);

  const allIcons = {
    Clouds: clouds,
    Drizzle: drizzle,
    Hase: hase,
    Rain: rain,
    Snow: snow,
    Clear: clear,
    Mist: mist,
  };

  const search = async (city) => {
    if (city === "") {
      alert("enter city name");
      return;
    }
    const apiKey = "669eabf03ddd535899141d42a1444c48";
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );

      const icon = allIcons[response.data.weather[0].main] || clear;
      setData({
        humidity: response.data.main.humidity,
        wind: response.data.wind.speed,
        temperature: Math.floor(response.data.main.temp),
        city: response.data.name,
        icon: icon,
      });
    } catch (er) {
      alert("Invalid city name");
    }
  };

  return (
    <>
      <div className="min-h-screen flex justify-center bg-[#e2d4ff]">
        <div className="flex border self-center p-6 rounded-2xl flex-col items-center bg-linear-to-b from-blue-900 to to-blue-600">
          <div className="flex items-center gap-2 ">
            <input
              type="text"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              placeholder="Enter city"
              className="bg-blue-200 rounded-3xl py-2 px-4 outline-none"
            />
            <img
              src={image_icon}
              alt=""
              className="w-10 h-10 p-2 bg-blue-200 rounded-4xl cursor-pointer"
              onClick={() => {
                search(value.trim());
              }}
            />
          </div>

          {data && (
            <div className="flex flex-col items-center text-white">
              <img src={data.icon} alt="" className="w-36" />
              <p className="text-5xl">{data.temperature}°c</p>
              <p className="text-3xl">{data.city}</p>
            </div>
          )}

          {data && (
            <div className="flex justify-between text-white p-2 gap-5 pt-6 font-bold">
              <div className="flex items-center gap-2">
                <img src={humidity} alt="" className="w-7 h-7 font-bold" />
                <div className="">
                  <p>{data.humidity}%</p>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <img src={wind} alt="" className="w-7 h-7" />
                <div>
                  <p>{data.wind}km/h</p>
                  <p className="text-nowrap">Wind Speed</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Weather;

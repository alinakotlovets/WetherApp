import { getApi, getKey } from "./api";
const contentBox = document.getElementById("content-box");
const weatherBox = document.createElement("div");
const weatherList = document.createElement("ul");
const currentWeatherBox = document.createElement("div");
const contentWeatherBox = document.createElement("div");
weatherList.classList.add("weather-list");
weatherBox.appendChild(weatherList);

contentWeatherBox.append(currentWeatherBox, weatherBox);
contentBox.append(contentWeatherBox);
let currentDay = 0;
let searchData = {};

export function getCurrentDay() {
  return currentDay;
}
export function changeCurrentDay(day) {
  currentDay = day;
}

export function renderWeather(data) {
  weatherList.innerHTML = "";
  for (let i = 0; i < 7; i++) {
    const weatherItem = document.createElement("li");
    weatherItem.classList.add("weather-item");
    weatherItem.dataset.index = i;
    const date = document.createElement("p");
    date.innerText = `Date: ${data.days[i].datetime}`;
    const temp = document.createElement("p");
    temp.innerText = `Temp: ${data.days[i].temp}`;
    const feelslike = document.createElement("p");
    feelslike.innerText = `Feelslike: ${data.days[i].feelslike}`;

    if (i === getCurrentDay()) {
      weatherItem.classList.add("active");
    } else {
      weatherItem.classList.remove("active");
    }

    weatherItem.append(date, temp, feelslike);
    weatherList.appendChild(weatherItem);
  }
}

export function renderSelectWeather(data, day) {
  currentWeatherBox.innerHTML = "";
  const place = document.createElement("h1");
  place.innerText = data.address;
  const date = document.createElement("p");
  date.innerText = `Date: ${data.days[day].datetime}`;
  const temp = document.createElement("p");
  temp.innerText = `Temp: ${data.days[day].temp}`;
  const feelslike = document.createElement("p");
  feelslike.innerText = `Feelslike: ${data.days[day].feelslike}`;
  currentWeatherBox.append(place, date, temp, feelslike);
}

export async function ShowWeather(value) {
  const key = await getKey();
  const api = await getApi(value, key);
  return api;
}

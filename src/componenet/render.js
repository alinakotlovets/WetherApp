import { getApi, getKey } from "./api";

const contentBox = document.getElementById("content-box");
const weatherBox = document.createElement("div");
weatherBox.classList.add("weather-box");
const weatherList = document.createElement("ul");
weatherList.classList.add("weather-list");
const currentWeatherBox = document.createElement("div");
currentWeatherBox.classList.add("current-weather-box");
const contentWeatherBox = document.createElement("div");
contentWeatherBox.classList.add("content-weather-box");
weatherList.classList.add("weather-list");
weatherBox.appendChild(weatherList);

contentWeatherBox.append(currentWeatherBox, weatherBox);
contentBox.append(contentWeatherBox);
let currentDay = 0;
let activeUnit = "C";

export function getCurrentDay() {
  return currentDay;
}

export function changeCurrentDay(day) {
  currentDay = day;
}

export function getActiveUnit() {
  return activeUnit;
}

export function setActiveUnit(unit) {
  activeUnit = unit;
  return activeUnit;
}

async function getIcon(data, path) {
  const icon = document.createElement("img");

  if (data.icon === "rain") {
    icon.src = (await import(`/src/images/${path}/09d.svg`)).default;
  }
  if (data.icon === "snow") {
    icon.src = (await import(`/src/images/${path}/13d.svg`)).default;
  }
  if (data.icon === "fog") {
    icon.src = (await import(`/src/images/${path}/50d.svg`)).default;
  }
  if (data.icon === "wind") {
    icon.src = (await import(`/src/images/${path}/03d.svg`)).default;
  }
  if (data.icon === "cloudy") {
    icon.src = (await import(`/src/images/${path}/03d.svg`)).default;
  }
  if (data.icon === "partly-cloudy-day") {
    icon.src = (await import(`/src/images/${path}/02d.svg`)).default;
  }
  if (data.icon === "partly-cloudy-night") {
    icon.src = (await import(`/src/images/${path}/02n.svg`)).default;
  }
  if (data.icon === "clear-day") {
    icon.src = (await import(`/src/images/${path}/01d.svg`)).default;
  }
  if (data.icon === "clear-night") {
    icon.src = (await import(`/src/images/${path}/01n.svg`)).default;
  }
  if (data.icon === "showers-day") {
    icon.src = (await import(`/src/images/${path}/10d.svg`)).default;
  }
  if (data.icon === "showers-night") {
    icon.src = (await import(`/src/images/${path}/10n.svg`)).default;
  }
  if (
    data.icon === "thunder-showers-day" ||
    data.icon === "thunder-showers-night" ||
    data.icon === "thunder-rain"
  ) {
    icon.src = (await import(`/src/images/${path}/11d.svg`)).default;
  }
  if (data.icon === "snow-showers-night") {
    icon.src = (await import(`/src/images/${path}/13n.svg`)).default;
  }
  if (data.icon === "snow-showers-day") {
    icon.src = (await import(`/src/images/${path}/13d.svg`)).default;
  }
  if (!icon.src) {
    icon.src = (await import(`/src/images/${path}/03d.svg`)).default;
  }
  return icon.src;
}

export async function renderWeather(data) {
  weatherList.innerHTML = "";
  for (let i = 0; i < 7; i++) {
    const weatherItem = document.createElement("li");
    weatherItem.classList.add("weather-item");
    weatherItem.dataset.index = i;

    const date = document.createElement("h4");
    const dataValue = new Date(data.days[i].datetime);
    const dayName = dataValue.toLocaleDateString("en-US", { weekday: "long" });
    date.innerText = dayName.substring(0, 3);

    const maxTemp = document.createElement("h4");
    maxTemp.innerText = data.days[i].tempmax.toFixed(2);

    const minTemp = document.createElement("h4");
    minTemp.innerText = data.days[i].tempmin.toFixed(2);

    const tempBox = document.createElement("div");
    tempBox.classList.add("weather-item-temp-box");

    const icon = document.createElement("img");
    icon.src = await getIcon(data.days[i], "outline");
    icon.classList.add("weather-item-icon");

    if (i === getCurrentDay()) {
      weatherItem.classList.add("active");
    } else {
      weatherItem.classList.remove("active");
    }

    tempBox.append(maxTemp, minTemp);
    weatherItem.append(date, icon, tempBox);
    weatherList.appendChild(weatherItem);
  }
}

export async function renderSelectWeather(data, day, activeUnit) {
  currentWeatherBox.innerHTML = "";
  const leftBox = document.createElement("div");
  leftBox.classList.add("current-weather-left-box");

  const rightBox = document.createElement("div");
  rightBox.classList.add("current-weather-right-box");

  const weatherInfoBox = document.createElement("div");
  weatherInfoBox.classList.add("current-weather-info-box");

  const place = document.createElement("h1");
  place.innerText = data.address;

  const date = document.createElement("h1");
  const dataValue = new Date(data.days[day].datetime);
  const dayName = dataValue.toLocaleDateString("en-US", { weekday: "long" });
  const monthName = dataValue.toLocaleDateString("en-US", { month: "long" });
  date.innerText = `${dayName}, ${monthName} ${dataValue.getDate()}`;

  const conditions = document.createElement("h2");
  conditions.innerText = data.days[day].conditions;

  const BtnBox = document.createElement("div");
  BtnBox.classList.add("c-f-box");

  const line = document.createElement("h2");
  line.innerText = "|";

  const cBtn = document.createElement("h1");
  cBtn.classList.add("c-f-btn");
  cBtn.innerText = "C";

  const fBtn = document.createElement("h1");
  fBtn.classList.add("c-f-btn");
  fBtn.innerText = "F";

  const temp = document.createElement("h2");
  temp.innerText = data.days[day].temp.toFixed(2);

  const feelslike = document.createElement("h3");
  feelslike.innerText = `Feels like: ${data.days[day].feelslike.toFixed(2)}`;

  const humidity = document.createElement("h3");
  humidity.innerText = `Humidity: ${data.days[day].humidity}`;

  const windspeed = document.createElement("h3");
  windspeed.innerText = `Wind speed: ${data.days[day].windspeed}`;

  const cloudcover = document.createElement("h3");
  cloudcover.innerText = `Cloud cover: ${data.days[day].cloudcover}`;

  const icon = document.createElement("img");
  icon.classList.add("current-weather-icon");
  icon.src = await getIcon(data.days[day], "fill");

  if (activeUnit === "C") {
    cBtn.classList.add("active-form");
  }
  if (activeUnit === "F") {
    fBtn.classList.add("active-form");
  }

  BtnBox.append(temp, cBtn, line, fBtn);
  rightBox.append(place, date, conditions);
  weatherInfoBox.append(BtnBox, feelslike, humidity, windspeed, cloudcover);
  leftBox.append(icon, weatherInfoBox);
  currentWeatherBox.append(leftBox, rightBox);
}

export async function ShowWeather(value) {
  const key = await getKey();
  return await getApi(value, key);
}

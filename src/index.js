import "./style.css";
import {
  ShowWeather,
  changeCurrentDay,
  getCurrentDay,
  renderWeather,
  renderSelectWeather,
  getActiveUnit,
  setActiveUnit,
} from "./componenet/render";
import loading from "./images/other/spinning-dots.svg";

const contentBox = document.getElementById("content-box");
const searchBox = document.createElement("div");
searchBox.classList.add("search-box");
const searchInput = document.createElement("input");
searchInput.classList.add("search-input");
searchInput.required = true;
searchInput.placeholder = "Write place...";
const searchButton = document.createElement("button");
searchButton.classList.add("search-button");
searchButton.innerText = "Search";
searchBox.append(searchInput, searchButton);
contentBox.prepend(searchBox);

let weather = {};

const contentWeatherBox = document.querySelector(".content-weather-box");
const loadingEl = document.createElement("img");
loadingEl.classList.add("loading");
loadingEl.src = loading;
contentWeatherBox.appendChild(loadingEl);

async function getWeather(value) {
  loadingEl.style.display = "flex";
  try {
    weather = await ShowWeather(value);
    renderSelectWeather(weather, getCurrentDay(), getActiveUnit());
    renderWeather(weather);
  } catch (err) {
    console.error(err);
    loadingEl.innerText = "Something went wrong!";
  } finally {
    loadingEl.style.display = "none";
  }
}

searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  getWeather(searchInput.value);
  searchInput.value = "";
});

document.querySelector(".weather-list").addEventListener("click", (event) => {
  const item = event.target.closest(".weather-item");
  if (!item) return;
  changeCurrentDay(Number(item.dataset.index));
  renderSelectWeather(weather, getCurrentDay(), getActiveUnit());
  renderWeather(weather);
});

document
  .querySelector(".current-weather-box")
  .addEventListener("click", (event) => {
    event.preventDefault();
    const item = event.target.closest(".c-f-btn");
    if (!item) return;
    if (item.innerText === "F" && !item.classList.contains("active-form")) {
      weather.days.forEach((day) => {
        day.temp = day.temp * 1.8 + 32;
        day.feelslike = day.feelslike * 1.8 + 32;
        day.tempmax = day.tempmax * 1.8 + 32;
        day.tempmin = day.tempmin * 1.8 + 32;
        setActiveUnit(item.innerText);
      });
    }
    if (item.innerText === "C" && !item.classList.contains("active-form")) {
      weather.days.forEach((day) => {
        day.temp = (day.temp - 32) / 1.8;
        day.feelslike = (day.feelslike - 32) / 1.8;
        day.tempmax = (day.tempmax - 32) / 1.8;
        day.tempmin = (day.tempmin - 32) / 1.8;
      });
      setActiveUnit(item.innerText);
    }

    renderSelectWeather(weather, getCurrentDay(), getActiveUnit());
    renderWeather(weather);
  });

getWeather("Kyiv");

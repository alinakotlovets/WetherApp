import "./style.css";
import {
  ShowWeather,
  changeCurrentDay,
  getCurrentDay,
  renderWeather,
  renderSelectWeather,
} from "./componenet/render";
const contentBox = document.getElementById("content-box");
const searchBox = document.createElement("div");
const searchInput = document.createElement("input");
searchInput.required = true;
searchInput.placeholder = "Write place...";
const searchButton = document.createElement("button");
searchButton.innerText = "Search";
searchBox.append(searchInput, searchButton);
contentBox.prepend(searchBox);

let test = {};
searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  async function init() {
    test = await ShowWeather(searchInput.value);
    renderSelectWeather(test, getCurrentDay());
    renderWeather(test);
  }
  init();
});

document.querySelector(".weather-list").addEventListener("click", (event) => {
  const item = event.target.closest(".weather-item");
  if (!item) return;
  changeCurrentDay(Number(item.dataset.index));

  renderSelectWeather(test, getCurrentDay());
  renderWeather(test);
});

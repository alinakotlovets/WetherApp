export async function getKey() {
  const response = await fetch("/config.json");
  if (!response.ok) {
    console.log(response.status);
  }
  const data = await response.json();
  const key = data.key;
  return key;
}

export async function getApi(place, key) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?unitGroup=metric&include=current&key=${key}`,
  );
  if (!response.ok) {
    console.log(response.status);
  }
  const data = await response.json();
  if (!data) {
    console.log(`data not found it's` + data);
  }
  const address = { address: data.address };
  let weatherByDays = [];

  for (let item of data.days) {
    const day = {};
    day.datetime = item.datetime;
    day.temp = item.temp;
    day.feelslike = item.feelslike;
    day.humidity = item.humidity;
    day.tempmax = item.tempmax;
    day.tempmin = item.tempmin;
    day.conditions = item.conditions;
    if (item.snow !== 0) {
      day.snow = item.snow;
    }
    day.icon = item.icon;
    day.windspeed = item.windspeed;
    day.cloudcover = item.cloudcover;
    weatherByDays.push(day);
  }
  return {
    address: data.address,
    days: weatherByDays,
  };
}

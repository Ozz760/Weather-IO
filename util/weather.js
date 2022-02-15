const apiKey = "e4d5971bc32e69580b23b38529ab190e";

async function fetchWeather(zipCode) {
  const { default: fetch } = await import("node-fetch");
  const weatherUrl =
    "https://api.openweathermap.org/data/2.5/weather?zip=" +
    zipCode +
    ",us&appid=" +
    apiKey +
    "&units=imperial";
  return fetch(weatherUrl).then(function (responce) {
    return responce.json();
  });
}

module.exports = fetchWeather;

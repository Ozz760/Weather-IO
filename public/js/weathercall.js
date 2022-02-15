const searchInput = document.querySelector("#search-input");
const submitBtn = document.querySelector("#submitBtn");
const apiKey = "e4d5971bc32e69580b23b38529ab190e"


function weatherCall (zipCode) {
  const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + ",us&appid=" + apiKey
  fetch (weatherUrl)
  .then(function(responce) {
    return responce.json(); 
  }) 
  .then(function(data) {
    console.log(data);
});
}; 






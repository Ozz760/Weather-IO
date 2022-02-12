const {Weather} = require("../models"); 

const weatherArry = [
    {
        tempreture: 86, 
        zip_code: 92058, 
        comments: "Its Hot!", 
    }, 
    {
        tempreture: 76, 
        zip_code: 91108, 
        comments: "Its cold!",
    },
] 

const seedWeather = () => Weather.bulkcreate(weatherArry); 
module.exports = seedWeather; 

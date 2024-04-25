const inputBox = document.querySelector('.form-control.input-box');
const searchBtn = document.querySelector('.search-box button');
let textarea=document.querySelector('.input-box');
let weatherImg = document.querySelector('.weather-body img');
let temperature = document.querySelector('.temperature');
let description = document.querySelector('.description');
let humidity = document.querySelector('.humidity span');
let windSpeed = document.querySelector('.wind span');
let locationNotFound = document.querySelector('.location-not-found');
let weatherBody = document.querySelector('.weather-body');
let body=document.querySelector('body')
const city=document.querySelector('.city')

async function checkWeather(cityname) {
    const apiKey = "YOUR_API_KEY";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const weatherData = await response.json();

        if (weatherData.cod === '404')
            throw('error!!!!No such location')

        document.body.style.backgroundSize="cover";
        document.body.style.backgroundPosition="center";
        cityname=cityname.toUpperCase()
        city.innerHTML=`<p>${cityname}</p>`;
        weatherBody.classList.remove('d-none')
        temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;
        description.innerHTML = `${weatherData.weather[0].description}`;

        humidity.innerHTML = `${weatherData.main.humidity}%`;
        windSpeed.innerHTML = `${weatherData.wind.speed}Km/H`;

        switch (weatherData.weather[0].main) {
            case 'Clouds':
                weatherImg.src= "./Assets/cloud.png";
                document.body.style.backgroundImage = "url('./Assets/moving_clouds.gif')";
                break;
            case 'Clear':
                weatherImg.src = "./Assets/clear.png";
                document.body.style.backgroundImage = "url('./Assets/clear_sky.jpeg')";
                break;
            case 'Rain':
                weatherImg.src = `./Assets/rain.png`;
                document.body.style.backgroundImage = "url('./Assets/rain on Tumblr.gif')";
                break;
            case 'Mist':
                weatherImg.src = `./Assets/mist.png`;
                document.body.style.backgroundImage = "url('./Assets/mist.jpg')";
                break;
            case 'Snow':
                weatherImg.src = `./Assets/snow.png`;
                document.body.style.backgroundImage = "url('./Assets/snowfall.gif')";
                break;
        }

        console.log(weatherData);
        console.log(weatherImg);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert(error);
       weatherBody.classList.add('d-none')
       document.body.style.backgroundImage = "linear-gradient(135deg, violet,blue)";
       
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
    textarea.value="";
   
});

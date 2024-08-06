const apiKey = 'c73b144e99304852a03144128240608';

async function fetchWeather(location = 'auto:ip') {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=4`);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}


function toggleTheme() {
    document.body.classList.toggle('dark');
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    const { location, current, forecast } = data;

    const currentWeather = `
        <div class="text-center mb-4">
            <h2 class="text-2xl">${location.name}, ${location.country}</h2>
            <img src="https:${current.condition.icon}" alt="${current.condition.text}" class="w-16 mx-auto">
            <p>${current.temp_c}°C, ${current.condition.text}</p>
        </div>
    `;

    const forecastWeather = forecast.forecastday.map(day => `
        <div class="text-center mb-4">
            <h3>${new Date(day.date).toLocaleDateString()}</h3>
            <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}" class="w-16 mx-auto">
            <p>${day.day.avgtemp_c}°C, ${day.day.condition.text}</p>
        </div>
    `).join('');

    weatherInfo.innerHTML = currentWeather + forecastWeather;
}

document.getElementById('search').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        fetchWeather(this.value);
    }
});

// Fetch weather on load
fetchWeather();

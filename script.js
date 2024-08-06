const apiKey = 'c73b144e99304852a03144128240608';

async function fetchWeather(location = 'auto:ip') {
    const weatherInfo = document.getElementById('weather-info');
    const loadingIndicator = document.getElementById('loading');

    try {
        loadingIndicator.classList.remove('hidden');
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=4`);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    } finally {
        loadingIndicator.classList.add('hidden');
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    const { location, current, forecast } = data;

    const currentWeather = `
        <div class="text-center mb-4">
            <h2 class="text-2xl font-bold">${location.name}, ${location.country}</h2>
            <img src="https:${current.condition.icon}" alt="${current.condition.text}" class="w-16 mx-auto mb-2">
            <p class="text-lg">${current.temp_c}°C, ${current.condition.text}</p>
        </div>
    `;

    const forecastWeather = forecast.forecastday.map(day => `
        <div class="text-center mb-4">
            <h3 class="font-semibold">${new Date(day.date).toLocaleDateString()}</h3>
            <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}" class="w-12 mx-auto mb-2">
            <p class="text-md">${day.day.avgtemp_c}°C, ${day.day.condition.text}</p>
        </div>
    `).join('');

    weatherInfo.innerHTML = currentWeather + forecastWeather;
}

document.getElementById('search').addEventListener('input', function () {
    const query = this.value.trim();
    if (query) {
        fetchWeather(query);
    } else {
        fetchWeather();
    }
});

// Fetch weather on load
fetchWeather();

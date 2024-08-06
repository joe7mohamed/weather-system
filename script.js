const apiKey = 'c73b144e99304852a03144128240608';
const locationInput = document.getElementById('locationInput');
const locationDisplay = document.getElementById('location');
const todayWeatherDisplay = document.getElementById('todayWeather');
const forecastDisplay = document.getElementById('forecast');

// Fetch weather data based on the provided location
async function fetchWeather(location) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=4`);
        if (!response.ok) throw new Error('Failed to fetch weather data');
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        console.error(error);
        // alert('Could not retrieve weather data. Please try again.');
    }
}

// Display the fetched weather data in the UI
function displayWeatherData(data) {
    const { location, current, forecast } = data;
    locationDisplay.textContent = `${location.name}, ${location.country}`;
    todayWeatherDisplay.innerHTML = `
        <div class="text-4xl font-bold">${current.temp_c}°C</div>
        <div class="text-lg">${current.condition.text}</div>
        <img src="${current.condition.icon}" alt="${current.condition.text}" class="mx-auto" />
    `;
    forecastDisplay.innerHTML = forecast.forecastday
        .slice(1)
        .map(day => `
            <div class="p-2 border rounded">
                <div class="text-lg font-semibold">${new Date(day.date).toLocaleDateString(undefined, { weekday: 'long' })}</div>
                <div>${day.day.maxtemp_c}°C / ${day.day.mintemp_c}°C</div>
                <img src="${day.day.condition.icon}" alt="${day.day.condition.text}" class="mx-auto" />
                <div>${day.day.condition.text}</div>
            </div>
        `)
        .join('');
}

// Fetch weather for the current location using Geolocation API
function fetchWeatherForCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                fetchWeather(`${latitude},${longitude}`);
            },
            error => {
                console.error(error);
                // alert('Unable to retrieve your location.');
            }
        );
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Event listener for location input changes
locationInput.addEventListener('input', (e) => {
    const location = e.target.value.trim();
    if (location) {
        fetchWeather(location);
    }
});

// Initialize by fetching weather for current location
fetchWeatherForCurrentLocation();

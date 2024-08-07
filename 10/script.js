document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '0e9b107ea5abf8b05e603ea54fe4a3ff\n'; // Substitua pela sua chave da API OpenWeatherMap
    const weatherForm = document.getElementById('weather-form');
    const cityInput = document.getElementById('city');
    const cityName = document.getElementById('cityName');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');

    weatherForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    });

    function fetchWeather(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    cityName.textContent = `Cidade: ${data.name}`;
                    temperature.textContent = `Temperatura: ${data.main.temp}°C`;
                    description.textContent = `Descrição: ${data.weather[0].description}`;
                } else {
                    cityName.textContent = 'Cidade não encontrada';
                    temperature.textContent = '';
                    description.textContent = '';
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                cityName.textContent = 'Erro ao buscar o clima';
                temperature.textContent = '';
                description.textContent = '';
            });
    }

    // Atualização automática a cada 5 minutos (300000 ms)
    setInterval(() => {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    }, 300000); // Atualiza a cada 5 minutos
});
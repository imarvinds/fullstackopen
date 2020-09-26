import axios from "axios";

const baseUrl = "http://api.weatherstack.com";

//Use your unique API key while running the program (set "REACT_APP_API_KEY= uniqueAPIkey " && npm start) for cmd.exe
const apiKey = process.env.REACT_APP_API_KEY; 

const makeCityRequestUrl = city =>
    `${baseUrl}/current?access_key=${apiKey}&query=${city}`;

const getCityWeather = city => {
    const request = axios.get(makeCityRequestUrl(city));
    return request.then(response => response.data);
};

export default { getCityWeather };

import './App.css';
import React from 'react';
import Weather from './components/weather';
import Form from './components/form';
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";

const api = {
  key: "6e0fe786b3b0e74ec83fea6734d29eab",
  base: "https://api.openweathermap.org/data/2.5/"
}
//api.openweathermap.org/data/2.5/weather?q=London,uk

class App extends React.Component {
  constructor() {
    super();
    this.useState = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_min: undefined,
      temp_max: undefined,
      description: "",
      error: false
    };

    this.weatherIcon = {
      thunder: "wi-thunderstorm",
      drizzle: "wi-sleet",
      rain: "wi-storm-showers",
      snow: "wi-snow",
      foggy: "wi-fog",
      sunny: "wi-day-sunny",
      cloud: "wi-day-fog"
    }
  }




  Calculator(temp) {
    let celsiuses = Math.floor(temp - 273.15);
    return celsiuses;
  }

  getIcon(icons, rangeId) {
    switch (true) {
      case rangeId => 200 && rangeId <= 232:
        this.setState({
          icon: this.weatherIcon.thunder
        })
        break;
      case rangeId => 300 && rangeId <= 321:
        this.setState({
          icon: this.weatherIcon.drizzle
        })
        break;
      case rangeId => 500 && rangeId <= 521:
        this.setState({
          icon: this.weatherIcon.rain
        })
        break;
      case rangeId => 600 && rangeId <= 622:
        this.setState({
          icon: this.weatherIcon.snow
        })
        break;
      case rangeId => 701 && rangeId <= 781:
        this.setState({
          icon: this.weatherIcon.foggy
        })
        break;
      case rangeId === 800:
        this.setState({
          icon: this.weatherIcon.sunny
        })
        break;
      case rangeId => 801 && rangeId <= 804:
        this.setState({
          icon: this.weatherIcon.cloud
        })
        break;
      default:
        this.setState({
          icon: icons.cloud
        })
    }
  }

  getWeather = async (e) => {

    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if (city && country) {
      const weatherCall = await fetch(`${api.base}weather?q=${city},${country}&appid=${api.key}`);

      const weather = await weatherCall.json();

      this.setState({
        city: `${weather.name}, ${weather.sys.country}`,
        celsius: this.Calculator(weather.main.temp),
        temp_max: this.Calculator(weather.main.temp_max),
        temp_min: this.Calculator(weather.main.temp_min),
        description: weather.weather[0].description,
        error: false
      })

      this.getIcon(this.weatherIcon, weather.weather[0].id);

      console.log('weather');
    } else {
      this.setState({
        error: true
      });
    }
  }

  state = {};
  render() {
    return (
      
      <div className="App">
        
        <Form loadweather={this.getWeather} error={this.state.error} />
        <Weather city={this.state.city} country={this.state.country} weatherIcon={this.state.icon} tempCelsius={this.state.celsius}
          temp_max={this.state.temp_max} temp_min={this.state.temp_min} description={this.state.description} />
      </div>
      
    );
  }
}

export default App;

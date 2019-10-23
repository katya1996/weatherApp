import React, {Component} from 'react';
import Info from './components/info';
import WeatherInfo from './components/WeatherInfo';
import UsePositionDemo from './position';
import Cookies from 'universal-cookie';
import CitySelector from "./components/CitySelector";
import CityList from "./components/CityList";


const API_KEY = "9be03fc21f4dad03db699adf579f3c24";

const cookies = new Cookies();
const cities = cookies.get('cities')

class App extends Component {
    state = {
        cities: [],
        temp:      undefined,
        city:      undefined,
        country:   undefined,
        pressure:  undefined,
        sunset:    undefined,
        error:     undefined,
    };


    componentDidMount() {
        const cookies = new Cookies();
        cookies.get(this.state.cities);
    }

    handleGetWeather = async (id) => {
        if (id) {
            const response = await
                fetch(`https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${API_KEY}&units=metric`);

            if (!response.ok) console.warn(response)

            const data = await response.json();

            let sunset = data.sys.sunset;
            let date = new Date();
            date.setTime(sunset);
            let sunset_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

            this.setState({
                temp:     data.main.temp,
                city:     data.name,
                country:  data.sys.country,
                pressure: data.main.pressure,
                sunset:   sunset_date,
                error:    undefined
            })
        } else {
            this.setState({
                temp:     undefined,
                city:     undefined,
                country:  undefined,
                pressure: undefined,
                sunset:   undefined,
                error:    "Enter city name"
            })
        }
    };

    handleSaveCity = id => {
        const cookies = new Cookies();
        const cities = [id, ...this.state.cities];
        this.setState({cities});
            if (id === !id) {
                cookies.set('cities', JSON.stringify(cities));
            } else {
                return null
            }
    };

    handleRemoveCity = id => {
         const cookies = new Cookies();

         const cities = [id, ...this.state.cities];

         cities.splice(id, id+1);
         cookies.remove('cities');
    };

    render() {
        return (
            <div>
                <Info/>
                <CitySelector onGetWeather={this.handleGetWeather} onSaveCity={this.handleSaveCity} onRemoveCity={this.handleRemoveCity}/>
                <CityList cities={this.state.cities}/>
                <UsePositionDemo/>
                <WeatherInfo
                    temp={this.state.temp}
                    city={this.state.city}
                    country={this.state.country}
                    pressure={this.state.pressure}
                    sunset={this.state.sunset}
                    error={this.state.error}
                />
            </div>
        )
    }
}

export default App;
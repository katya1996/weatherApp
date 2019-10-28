import React, {Component} from 'react';
import Info from './components/info';
import WeatherInfo from './components/WeatherInfo';
import UsePositionDemo from './position';
//import Cookies from 'universal-cookie';
import Cookies from 'js-cookie';
import CitySelector from "./components/CitySelector";
import CityList from "./components/CityList";


const API_KEY = "9be03fc21f4dad03db699adf579f3c24";

// const Cookies = new Cookies();
// const cities = Cookies.get('cities')

class App extends Component {
    state = {
        cities:   [],
        temp:     undefined,
        city:     undefined,
        country:  undefined,
        pressure: undefined,
        sunset:   undefined,
        error:    undefined,
    };


    componentDidMount() {
        let cities = Cookies.get('cities');
        //Cookies.set('cities', this.state.cities);
        if(cities) {
            this.setState({cities: JSON.parse(cities)});
        }
    }

    handleGetWeather = async (id) => {
        if (id) {
            const response = await
                fetch(`https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${API_KEY}&units=metric`);

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
        if (!this.state.cities.includes(id)) {
            this.setState({cities: [id, ...this.state.cities]}, () => {
                Cookies.set('cities', JSON.stringify(this.state.cities), {expires: new Date(2999, 1)});
            });
        } else {
            return null
        }
    };

    handleRemoveCity = (i) => {
        this.state.cities.splice(i, 1);
        this.setState({cities: this.state.cities});
        Cookies.set('cities', JSON.stringify(this.state.cities), {expires: new Date(2999, 1)});
    };

    render() {
        return (
            <div>
                <Info/>
                <CitySelector onGetWeather={this.handleGetWeather} onSaveCity={this.handleSaveCity}/>
                <CityList cities={this.state.cities} onRemoveCity={this.handleRemoveCity}  onGetWeather={this.handleGetWeather} />
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
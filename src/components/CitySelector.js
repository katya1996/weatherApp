import React, {useState} from 'react';
import PropTypes from 'prop-types';
import cityList from '../resources/city.list';

const CitySelector = ({ onGetWeather, onSaveCity, onRemoveCity }) => {
    const [name, setName] = useState('');
    const [selected, setSelected] = useState('');



    const handleSearch = (e) => {
        setName(e.target.value)
    };

    const handleCityClick = (id) => {
        setSelected(id)
    };



    const renderCityList = () => {
        if (name.length <= 3) return
        const list = cityList.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));

        return list.map(c => (
            <div
                style={{
                    backgroundColor: selected === c.id && 'green'
                }}
                key={c.id}
                onClick={() => handleCityClick(c.id)}
            >
                {c.name}
            </div>
        ))
    };

    const saveCity = () => {
        onSaveCity(selected);
        setName(" ");
    };

    const removeCity = () => {
        onRemoveCity(name);
        setName(" ");
    };

    const getWeather = () => {
        onGetWeather(selected);
        setName(" ");
    };

    return (
        <div>
            <input
                placeholder='City'
                autoComplete='off'
                onChange={handleSearch}
                value={name}
            />
            {selected && (
                <>
                    <button onClick={getWeather}>Get weather</button>
                    <button onClick={saveCity}>Save city</button>
                    <button onClick={removeCity}>Remove city</button>
                    {/*<RemoveCity onRemoveCity={this.handleRemoveCity}/>*/}
                </>
            )}
            {renderCityList()}
        </div>

    );
};

CitySelector.propTypes = {};

export default CitySelector;
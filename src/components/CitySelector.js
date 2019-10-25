import React, {useState} from 'react';
import cityList from '../resources/city.list';

const CitySelector = ({ onGetWeather, onSaveCity }) => {
    const [name, setName] = useState('');
    const [selected, setSelected] = useState('');


    const handleSearch = (e) => {
        setName(e.target.value)
    };

    const handleCityClick = (id) => {
        setSelected(id);
        onGetWeather(id);
        onSaveCity(id);
        setName(" ");
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

    // const getWeather = () => {
    //     onGetWeather(selected);
    //     setName(" ");
    // };

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
                    {/*<button onClick={getWeather}>Get weather</button>*/}

                </>
            )}
            {renderCityList()}
        </div>

    );
};

CitySelector.propTypes = {};

export default CitySelector;
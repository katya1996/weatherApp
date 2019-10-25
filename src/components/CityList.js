import React from 'react';
//import Cookies from "universal-cookie";
import Cookies from 'js-cookie';
import './CityList.css'
import cityList from '../resources/city.list';

const CityList = ({cities, onRemoveCity}) => {
    const renderCity = (id, i) => {
        const city = cityList.find(c => c.id === id);

        return <div
                    className="buttonType"
                    key={id}
                    onClick={() => {onRemoveCity(i)}}
                >
                {city.name}
                </div>
    };

    return (
        <div>
            {cities.map((id, i) => renderCity(id, i))}
        </div>
    );
};


export default CityList;
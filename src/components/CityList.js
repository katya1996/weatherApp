import React from 'react';
import PropTypes from 'prop-types';
import Cookies from "universal-cookie";
import './CityList.css'
import cityList from '../resources/city.list'

const CityList = ({cities}) => {
    const renderCity = id => {
        const city = cityList.find(c => c.id === id)
        if(!city) return;

        return <div
                    className="buttonType"
                    key={id}
                >
                {city.name}
                </div>
    };

    return (
        <div>
            {cities && cities.map(id => renderCity(id))}
        </div>
    );
};

CityList.propTypes = {
    
};

export default CityList;
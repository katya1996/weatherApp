import React from 'react';
import { usePosition } from 'use-position';

export const UsePositionDemo = (lat, lon) => {
    // Получаем позицию браузера (или ошибку) здесь.
    const { latitude, longitude, error } = usePosition();

    // Выводим координаты
    return (
        <>
            <span>Вы в </span>
            latitude: {latitude},
            longitude: {longitude},
            error: {error}
        </>
    );
};

export default UsePositionDemo;
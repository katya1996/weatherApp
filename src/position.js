import React from 'react';
import { usePosition } from 'use-position';


export const UsePositionDemo = () => {
    // Получаем позицию браузера (или ошибку) здесь.
    const { latitude, longitude, error } = usePosition();

    // Выводим координаты
    return (
        <>
            latitude: {latitude},
            longitude: {longitude},
            error: {error}
        </>
    );
};

export default UsePositionDemo;
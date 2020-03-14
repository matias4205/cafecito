import axios from 'axios';

import queryConvert from './queryConvert';

const BASE_URL = `${process.env.URL}/api`;

export const fetchCoffee = async coffeeId => {
    const url = `${BASE_URL}/get_payment_by_coffe/${coffeeId}`;
    
    const { data } = await axios.get(url);

    return data;
}

export const fetchCoffees = async query => {
    const { password } = query || queryConvert();
    const url = `${BASE_URL}/coffees?password=${password}`;

    const { data } = await axios.get(url);

    return data;
};

export const sendAnswer = async ({ idCoffee, answer, password }) => {
    const url = `${BASE_URL}/send_answer`;

    await axios.post(url, {
        answer,
        password,
        idCoffee,
    });
};


export const deleteCoffee = async ({ idCoffee, password }) => {
    const url = `${BASE_URL}/delete_coffee`;

    await axios.post(url, {
        password,
        idCoffee,
    });
};
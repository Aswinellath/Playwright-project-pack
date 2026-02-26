//Load environment variables

import dotenv from 'dotenv';
dotenv.config();

export const SauceDemoUsers = {
    standard: {
        username: process.env.SAUCEDEMO_STANDARD_USER || 'standard_user',
        password: process.env.SAUCEDEMO_PASSWORD || 'secret_sauce'
    },

    locked: {
        username: process.env.SAUCEDEMO_LOCKED_USER || 'locked_out_user',
        password: process.env.SAUCEDEMO_PASSWORD || 'secret_sauce'
    },

    problem: {
        username: process.env.SAUCEDEMO_PROBLEM_USER || 'problem_user',
        password: process.env.SAUCEDEMO_PASSWORD || 'secret_sauce'
    }
};

export const APIEndpoints = {
    jsonPlaceholder: process.env.JSONPLACEHOLDER_API || 'https://jsonplaceholder.typicode.com',
    fakestoreAPI: process.env.FAKESTOREAPI_URL || 'https://reqres.in/api'
};
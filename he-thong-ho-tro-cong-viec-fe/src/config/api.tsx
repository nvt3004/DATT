import axios from 'axios';
const nestApiInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API,
});

export { nestApiInstance };

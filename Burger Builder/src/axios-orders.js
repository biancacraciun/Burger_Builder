import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-37c6a.firebaseio.com/'
});

export default instance;
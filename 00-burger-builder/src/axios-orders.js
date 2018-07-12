import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://react-my-burger-f5fca.firebaseio.com/'
});

export default instance;
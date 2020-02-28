import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-3411c.firebaseio.com/'
})


export default instance;
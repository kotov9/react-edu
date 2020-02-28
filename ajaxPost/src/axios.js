import axios from 'axios';

// Axios instance allows to partly overwrite some global parameters of axios
// for separate special cases
const instance = axios.create({
    baseURL: 'http://jsonplaceholder.typicode.com/posts'
})

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';


export default instance;
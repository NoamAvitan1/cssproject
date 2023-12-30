import Axios from "axios";

const Api = Axios.create({
    baseURL: 'https://css-store.onrender.com/',
    // baseURL : 'http://localhost:3000/',
    withCredentials: true,
})

export default Api
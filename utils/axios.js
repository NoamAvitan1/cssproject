import Axios from "axios";

const Api = Axios.create({
    baseURL: 'https://css-store.vercel.app/',
    withCredentials: true,
})

export default Api
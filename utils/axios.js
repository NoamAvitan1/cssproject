import { Axios } from "axios";

const Api = new Axios({
    baseURL: 'http://localhost:3000/',
})

export default Api
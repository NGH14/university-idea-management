import axios from "axios";
const GlobalApi = "http://localhost:7024/api"
export default class AppUse {

    static postApi = async (api, params) => {
        const res = await axios.post(`${GlobalApi}${api}`, params)
        return res
    }

    static getApi = async (api) => {
        const res = await axios.get(`${GlobalApi}${api}`)
        return res
    }
    
}
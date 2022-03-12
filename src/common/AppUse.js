import axios from "axios"
import {STORAGE_VARS} from "./env";

const GlobalApi = "https://localhost:7024/api"
const configs = {headers: {Authorization: `Bearer ${localStorage.getItem(STORAGE_VARS.JWT)}`}}

export  class AppUse {
    static postApi = async (api, params, conf) => {
        return await axios.post(`${GlobalApi}/${api}`, params, conf)
    }
}
export  class RequestApi {

    static postApi = async (api, params) => {
        return await axios.post(`${GlobalApi}/${api}`, params, configs)
    }

    static getApi = async (api) => {
        return await axios.get(`${GlobalApi}/${api}`, configs)
    }

    static deleteApi = async (api) => {
        return await axios.delete(`${GlobalApi}/${api}`, configs)
    }

    static putApi = async (api, params) => {
        return await axios.put(`${GlobalApi}/${api}`, params, configs)
    }

}
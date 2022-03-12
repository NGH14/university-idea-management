import axios from "axios"
import {STORAGE_VARS} from "./env";

const GlobalApi = "https://localhost:7024/api"
const configs = {headers: {Authorization: `Bearer ${localStorage.getItem(STORAGE_VARS.JWT)}`}}

export default class AppUse {
    static postApi = async (api, params, configs) => {
        return await axios.post(`${GlobalApi}/${api}`, params, configs)
    }


}
export default class RequestApi {

    static postApi = async (api, params, configs) => {
        return await axios.post(`${GlobalApi}/${api}`, params, configs)
    }

    static getApi = async (api, configs) => {
        return await axios.get(`${GlobalApi}/${api}`, configs)
    }

    static deleteApi = async (api, configs) => {
        return await axios.delete(`${GlobalApi}/${api}`, configs)
    }

    static putApi = async (api, params, configs) => {
        return await axios.put(`${GlobalApi}/${api}`, params, configs)
    }

}
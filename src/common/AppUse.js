import axios from "axios"
import {STORAGE_VARS} from "./env";

const GlobalApi = "https://localhost:7024/api"
const configs = {headers: {Authorization: `Bearer ${localStorage.getItem(STORAGE_VARS.JWT)}`}}

export class AnonRequest {

    static post = async (api, params, conf) => {
        return await axios.post(`${GlobalApi}/${api}`, params, conf)
    }

}
export class AuthRequest {

    static post = async (api, params) => {
        return await axios.post(`${GlobalApi}/${api}`, params, configs)
    }

    static get = async (api) => {
        return await axios.get(`${GlobalApi}/${api}`, configs)
    }

    static delete = async (api) => {
        return await axios.delete(`${GlobalApi}/${api}`, configs)
    }

    static put = async (api, params) => {
        return await axios.put(`${GlobalApi}/${api}`, params, configs)
    }

}
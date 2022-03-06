import axios from "axios";
import {useState} from "react";
import {Alert, Snackbar} from "@mui/material";
const GlobalApi = "https://localhost:7024/api"
export default class AppUse {

    static postApi = async (api, params) => {
        const res = await axios.post(`${GlobalApi}${api}`, params)
        return res
    }

    static getApi = async (api) => {
        const res = await axios.get(`${GlobalApi}${api}`)
        return res
    }

    static deleteApi = async (api) => {
        const res = await axios.delete(`${GlobalApi}${api}`)
        return res
    }



}
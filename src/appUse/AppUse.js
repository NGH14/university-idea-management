export default class AppUse {
    static postApi = async (api, params) => {
        const GlobalApi = "http://localhost:5000/api"
        const res = await axios.post(`${GlobalApi}${api}`, params)
        if(res){
            return res
        }
    }
    static getApi = async (api) => {
        const res = await axios.get(`${GlobalApi}${api}`)
        return res
    }
}
import axios from "axios"

export const api = axios.create({
    baseURL: `http://www.apireyk.somee.com`
})



// api.interceptors.request.use((config) => {
//     console.log(config)
//     const token = localStorage.getItem("apiToken")
//     config?.headers?.authorization = `Bearer ${token}` 
//     config.headers["content-type"] = "application-json"
//     return config
// })
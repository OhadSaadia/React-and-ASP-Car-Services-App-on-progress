import axios from "axios";

export default axios.create({
    baseURL: "https://localhost:7099/api/"
})
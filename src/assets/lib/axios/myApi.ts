import axios from "axios";

const myApi = axios.create({
  baseURL: "https://localhost:7001/Api",
});
export default myApi;

import axios from "axios";

const myApi = axios.create({
  baseURL: "https://nationalmuseum2.somee.com/api",
});
export default myApi;

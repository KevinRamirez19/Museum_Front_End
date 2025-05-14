import axios from "axios";

const myApi = axios.create({
  baseURL: "https://museumnational.somee.com/api",
});
export default myApi;

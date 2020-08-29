import axios from "axios";

const baseDomain = "https://api.tomtom.com/search/2/";
const baseURL = `${baseDomain}`; 

export default axios.create({
  baseURL,
});
import Axios from "@/plugins/http/axios";
import originalAxios from "axios";

const axios = new Axios(originalAxios);

axios.setInterceptors();

export default axios.getInstance();

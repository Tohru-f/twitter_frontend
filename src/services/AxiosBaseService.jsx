import axios from "axios";

const AxiosBaseService = (axios.defaults.baseURL =
  "http://localhost:3000/api/v1");

export default AxiosBaseService;

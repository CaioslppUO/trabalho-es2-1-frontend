import axios from "axios";

export const baseUrlServer =
  "https://nota-fiscal-backend-test.herokuapp.com/api/";

const api = axios.create({
  baseURL: baseUrlServer,
});

export default api;

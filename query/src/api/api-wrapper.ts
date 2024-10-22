import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://petstore3.swagger.io/api/v3",
});

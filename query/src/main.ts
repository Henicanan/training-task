import axios from "axios";
import { api } from "./api";

(async function () {
  const response = await api.pet.findByStatus("available");
  console.log(response.data);
})();

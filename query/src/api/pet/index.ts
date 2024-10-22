import { apiClient } from "../api-wrapper";
import * as PetTypes from "./types";

const pet = {
  findByStatus(status: string) {
    return apiClient.get<PetTypes.Pet[]>(`/pet/findByStatus?status=${status}`);
  },
};

export { PetTypes, pet };

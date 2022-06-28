import api from "../services/api";
import { RegistryError } from "../types/RegistryError";

export interface PhonesProps {
  id: number;
  model: string;
}

export class PhonesController {
  /**
   * Fetch a list of phones from de api
   * @returns a list of phones
   */
  async fetchPhones(): Promise<PhonesProps[]> {
    let phones: PhonesProps[];
    try {
      phones = await (await api.get("phone")).data;
    } catch (error) {
      console.log(error);
      phones = [];
    }
    return phones;
  }

  /**
   * Function that create a new Phone
   * @param phone data to be recorded in the api
   */
  async RegistryNewPhone(
    model: string
  ): Promise<RegistryError | PhonesProps[]> {
    if (model.length < 3) {
      return "inputsError";
    }
    try {
      await api.post("phone", {
        model: model,
      });
    } catch (error) {
      console.log(error);
      return "fetchError";
    }

    const phones = await this.fetchPhones();
    return phones;
  }

  /**
   * Function that update a Phone
   * @param model data to be recorded in the api
   * @param id data to be recorded in the api
   */
  async updatePhone(
    model: string,
    id: number
  ): Promise<RegistryError | PhonesProps[]> {
    if (model.length < 3 || id < 0) {
      return "inputsError";
    }
    try {
      await api.put("phone", {
        model: model,
        id,
      });
    } catch (error) {
      console.log(error);
      return "fetchError";
    }

    const phones = await this.fetchPhones();
    return phones;
  }
}

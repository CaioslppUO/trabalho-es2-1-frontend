import api from "../services/api";

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
  async RegistryNewPhone(phone: PhonesProps) {
    try {
      await api.post("phone", {
        model: phone.model,
      });
    } catch (error) {
      console.log(error);
      return -1;
    }

    const phones = await this.fetchPhones();
    return phones;
  }
}

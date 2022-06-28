import api from "../services/api";
import { RegistryError } from "../types/RegistryError";

export interface ServicesProps {
  id: number;
  price: number;
  type: string;
}

export class ServicesController {
  /**
   * Fetch a list of services from de api
   * @returns a list of services
   */
  async fetchServices(): Promise<ServicesProps[]> {
    let serivces: ServicesProps[];
    try {
      serivces = await (await api.get("service")).data;
    } catch (error) {
      console.log(error);
      serivces = [];
    }
    return serivces;
  }

  /**
   * Function that create a service
   * @param service data to be recorded in the api
   */
  async RegistryNewService(
    price: number,
    type: string
  ): Promise<RegistryError | ServicesProps[]> {
    if (price > 0 && type.length > 2) {
      try {
        await api.post("service", {
          type,
          price,
        });
      } catch (error) {
        console.log(error);
        return "fetchError";
      }

      const serivces = await this.fetchServices();
      return serivces;
    } else {
      return "inputsError";
    }
  }

  /**
   * Function that update a service
   * @param price float to be recorded in the api
   * @param type string to be recorded in the api
   * @param serviceId number to be recorded in the api
   */
  async updateService(
    price: number,
    type: string,
    serviceId: number
  ): Promise<RegistryError | ServicesProps[]> {
    if (price > 0 && type.length > 2 && serviceId > 0) {
      try {
        await api.put("service", {
          type,
          price,
          id: serviceId,
        });
      } catch (error) {
        console.log(error);
        return "fetchError";
      }

      const serivces = await this.fetchServices();
      return serivces;
    } else {
      return "inputsError";
    }
  }
}

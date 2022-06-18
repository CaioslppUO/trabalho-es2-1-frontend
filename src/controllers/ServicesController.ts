import api from "../services/api";

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
  async RegistryNewService(service: ServicesProps) {
    try {
      await api.post("service", {
        type: service.type,
        price: service.price,
      });
    } catch (error) {
      console.log(error);
      return -1;
    }

    const serivces = await this.fetchServices();
    return serivces;
  }
}

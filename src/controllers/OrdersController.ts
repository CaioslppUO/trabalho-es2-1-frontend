import api from "../services/api";
import { RegistryError } from "../types/RegistryError";

export interface OrdersProps {
  id: number;
  name: string;
  email: string;
  cpf: string;
  idClient: string;
  idPhone: number;
  phoneModel: string;
  services?: { type: string; price: string; id: number }[];
  beginDate?: string;
}
export interface OrderRegistryProps {
  idClient: number;
  idPhone: number;
  services: number[];
  beginDate: string;
}

export class OrdersController {
  /**
   * Fetch a list of orders from de api
   * @returns a list of orders
   */
  async fetchOrders(): Promise<OrdersProps[]> {
    let orders: OrdersProps[];
    try {
      orders = await (await api.get("serviceOrder")).data;
    } catch (error) {
      console.log(error);
      orders = [];
    }
    return orders;
  }

  /**
   * Function that create a new order
   * @param order data to be recorded in the api
   */
  async RegistryNewOrder(
    idClient: number,
    idPhone: number,
    services: number[]
  ): Promise<RegistryError | OrdersProps[]> {
    if (idClient >= 0 && idPhone >= 0 && services.length > 0) {
      const now = new Date();
      const beginDate = `${now.getFullYear()}-${now.getUTCMonth()}-${now.getUTCDate()}`;
      try {
        await api.post("serviceOrder", {
          beginDate,
          idClient,
          idPhone,
          services,
        });
      } catch (error) {
        console.log(error);
        return "fetchError";
      }

      const orders = await this.fetchOrders();
      return orders;
    } else {
      return "inputsError";
    }
  }

  /**
   * Function that update a order
   * @param idClient number data to be recorded in the api
   * @param idPhone number data to be recorded in the api
   * @param service number array to be recorded in the api
   * @param orderId number to be recorded in the api
   */
  async updateOrder(
    idClient: number,
    idPhone: number,
    services: number[],
    orderId: number,
    beginDate: string
  ): Promise<RegistryError | OrdersProps[]> {
    if (idClient >= 0 && idPhone >= 0 && services.length > 0) {
      try {
        await api.put("serviceOrder", {
          idClient,
          idPhone,
          id: orderId,
          idsService: services,
          beginDate,
        });
      } catch (error) {
        console.log(error);
        return "fetchError";
      }

      const orders = await this.fetchOrders();
      return orders;
    } else {
      return "inputsError";
    }
  }
}

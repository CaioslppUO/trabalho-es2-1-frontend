import api from "../services/api";

export interface OrdersProps {
  id: number;
  name: string;
  email: string;
  cpf: string;
  idPhone: number;
  phoneModel: string;
  services: [
    {
      type: string;
      price: string;
    }
  ];
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
  async RegistryNewOrder(order: OrdersProps) {
    try {
      await api.post("client", {});
    } catch (error) {
      console.log(error);
      return -1;
    }

    const orders = await this.fetchOrders();
    return orders;
  }
}

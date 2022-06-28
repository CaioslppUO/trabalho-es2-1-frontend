import api from "../services/api";
import { RegistryError } from "../types/RegistryError";

export interface ClientsProps {
  id: number;
  name: string;
  cpf: string;
  email: string;
}

export class ClientsController {
  /**
   * Fetch a list of client from de api
   * @returns a list of clients
   */
  async fetchClients(): Promise<ClientsProps[]> {
    let clients: ClientsProps[];
    try {
      clients = await (await api.get("client")).data;
    } catch (error) {
      console.log(error);
      clients = [];
    }
    return clients;
  }

  /**
   * Function that create a new Client
   * @param client dato to be recorded in the api
   */
  async RegistryNewClient(
    name: string,
    cpf: string,
    email: string
  ): Promise<RegistryError | ClientsProps[]> {
    if (cpf.length < 10 || name.length < 3 || email.length < 3) {
      console.log(cpf, cpf.length < 10, name.length < 3, email.length < 3);
      return "inputsError";
    }
    try {
      await api.post("client", {
        name,
        cpf,
        email,
      });
    } catch (error) {
      console.log(error);
      return "fetchError";
    }

    const clients = await this.fetchClients();
    return clients;
  }

  /**
   * Function that update a Client
   * @param name string to be updated in the api
   * @param cpf string to be updated in the api
   * @param email string to be updated in the api
   * @param clientId number to be updated in the api
   */
  async updateClient(
    name: string,
    cpf: string,
    email: string,
    clientId: number
  ): Promise<RegistryError | ClientsProps[]> {
    if (
      cpf.length < 10 ||
      name.length < 3 ||
      email.length <= 3 ||
      clientId < 0
    ) {
      return "inputsError";
    }
    try {
      await api.put("client", {
        name,
        cpf,
        email,
        id: clientId,
      });
    } catch (error) {
      console.log(error);
      return "fetchError";
    }

    const clients = await this.fetchClients();
    return clients;
  }
}

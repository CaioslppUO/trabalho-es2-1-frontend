import api from "../services/api";

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
  async RegistryNewClient(client: ClientsProps) {
    try {
      await api.post("client", {
        name: client.name,
        cpf: client.cpf,
        email: client.email,
      });
    } catch (error) {
      console.log(error);
      return -1;
    }

    const clients = await this.fetchClients();
    return clients;
  }
}

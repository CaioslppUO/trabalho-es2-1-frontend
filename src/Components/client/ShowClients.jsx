import { Flex, Heading, Button, Box, Input } from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function ShowClients({ onEditClient, onSelectClient }) {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    api.get("clients?populate=*").then((r) => {
      setClients(r.data.data);
    });
  }, []);

  function handleDelete(id) {
    if (confirm("Realmente deseja excluir este cliente?") == true) {
      api.delete(`clients/${id}`).then((r) => {
        api.get("clients?populate=*").then((r) => {
          setClients(r.data.data);
        });
      });
    }
  }
  return (
    <>
      <Heading marginBottom={"30px"} color={"#6D676E"} size={"lg"}>
        Clientes Cadastrados
      </Heading>

      {clients.map((item, i) => {
        return (
          <Flex
            key={i}
            w="100%"
            border={"1px solid #31313176"}
            borderRadius="5px"
            padding={"10px"}
            alignItems="center"
            justifyContent={"space-between"}
            cursor="pointer"
            _hover={{ opacity: 0.7 }}
            marginBottom="2px"
          >
            <Flex onClick={() => onSelectClient(item.id)} w="full">
              <Heading size={"sm"}>{item.attributes.name}</Heading>
            </Flex>
            <Flex>
              <Box
                onClick={() => onEditClient(item.id)}
                cursor={"pointer"}
                _hover={{ opacity: 0.5 }}
              >
                <FaRegEdit color="#0c004e" size={30} />
              </Box>
              {/* <Box
                marginX={"10px"}
                cursor={"pointer"}
                _hover={{ opacity: 0.5 }}
                onClick={() => handleDelete(item.id)}
              >
                <MdOutlineDelete color="#ff0000" size={30} />
              </Box> */}
            </Flex>
          </Flex>
        );
      })}
    </>
  );
}

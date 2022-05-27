import { Flex, Heading, Button, Box, Input } from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function ShowServiceOrders({ onEdit, onSelectServiceOrder }) {
  const [serviceOrders, setServiceOrders] = useState([]);

  useEffect(() => {
    api
      .get("service-orders?populate=*&filters[canceled][$eq]=false")
      .then((r) => {
        setServiceOrders(r.data.data);
      });
  }, []);

  function handleDelete(id) {
    if (confirm("Realmente deseja excluir este ServiceOrdere?") == true) {
      api.delete(`ServiceOrders/${id}`).then((r) => {
        api.get("ServiceOrders?populate=*").then((r) => {
          setServiceOrders(r.data.data);
        });
      });
    }
  }
  return (
    <>
      <Heading marginBottom={"30px"} color={"#6D676E"} size={"lg"}>
        Ordens de Serviço Cadastrados
      </Heading>

      {serviceOrders.map((item, i) => {
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
            <Flex
              onClick={() => {
                onSelectServiceOrder(item.id);
              }}
              w="full"
            >
              <Heading size={"sm"}>
                {item.attributes.client.data.attributes.name}
                {" - "}
                {item.attributes.phone.data.attributes.model}
              </Heading>
            </Flex>
            <Flex>
              <Box
                onClick={() => onEdit(item.id)}
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

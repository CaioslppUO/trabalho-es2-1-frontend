import { Flex, Heading, Button, Box, Input } from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function ShowServiceOffered({ onEditServiceOffered, onSelectServiceOffered }) {
  const [servicesOffered, setServicesOffered] = useState([]);

  useEffect(() => {
    api.get("servicesOffered?populate=*").then((r) => {
      setServicesOffered(r.data.data);
    });
  }, []);

  function handleDelete(id) {
    if (confirm("Realmente deseja excluir este serviço?") == true) {
      api.delete(`servicesOffered/${id}`).then((r) => {
        api.get("servicesOffered?populate=*").then((r) => {
          setServicesOffered(r.data.data);
        });
      });
    }
  }
  return (
    <>
      <Heading marginBottom={"30px"} color={"#6D676E"} size={"lg"}>
        Serviços Cadastrados
      </Heading>

      {servicesOffered.map((item, i) => {
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
            <Flex onClick={() => onSelectServiceOffered(item.id)} w="full">
              <Heading size={"sm"}>{item.attributes.name}</Heading>
            </Flex>
            <Flex>
              <Box
                onClick={() => onEditServiceOffered(item.id)}
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

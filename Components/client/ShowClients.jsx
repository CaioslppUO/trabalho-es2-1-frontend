import { Flex, Heading, Button, Box, Input } from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

export default function ShowClients() {
  return (
    <>
      <Heading marginBottom={"30px"} color={"#6D676E"} size={"lg"}>
        Clientes Cadastrados
      </Heading>

      {[1, 2, 3, 4, 5].map((item, i) => {
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
            <Flex>
              <Heading size={"sm"}>Fulano de tal</Heading>
            </Flex>
            <Flex>
              <Box cursor={"pointer"} _hover={{ opacity: 0.5 }}>
                <FaRegEdit color="#0c004e" size={30} />
              </Box>
              <Box
                marginX={"10px"}
                cursor={"pointer"}
                _hover={{ opacity: 0.5 }}
              >
                <MdOutlineDelete color="#ff0000" size={30} />
              </Box>
            </Flex>
          </Flex>
        );
      })}
    </>
  );
}

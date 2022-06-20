import { Box, Flex, Heading, Select, Text } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";

interface SelectInputProps {
  label: string;
  value: string[];
  onChange: (newValue: string[]) => void;
  multiple: boolean;
  itemsData: Array<string>;
}
const SelectInput = ({
  label,
  onChange,
  value,
  itemsData,
  multiple,
}: SelectInputProps) => {
  const [items, setItems] = useState<Array<string>>([]);
  const [db, setDb] = useState<Array<string>>([]);

  function handleDeleteService(selection: string) {
    const v = items.filter((s) => {
      if (s == selection) {
        db.push(s);
        return false;
      }
      return true;
    });
    setItems(v);
    if (multiple) {
      onChange(v);
    }
  }

  const init = useCallback(() => {
    const newDb = itemsData.filter((filteredItem) => {
      let flag = false;
      value.forEach((v) => {
        if (filteredItem == v) {
          items.push(filteredItem);
          flag = true;
        }
      });
      return !flag;
    });
    setDb(newDb);
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  // useEffect(() => {
  //   console.log("AA", value);
  // }, [value]);

  useEffect(() => {
    if (multiple) {
      onChange([]);
    }
  }, [items]);
  return (
    <Box marginBottom={"15px"}>
      <Heading marginBottom={"10px"} color={"#6D676E"} size={"sm"}>
        {label}
      </Heading>

      <Flex p="0 20px 20px 20px">
        {items.map((s, index) => {
          return (
            <Flex
              key={index}
              m="5px"
              p="5px 20px"
              border="1px solid #c1c1c1"
              borderRadius={"5px"}
              alignItems="center"
              justifyContent={"space-around"}
              flexWrap="wrap"
            >
              <Text>{s}</Text>
              <Box
                marginX={"10px"}
                cursor={"pointer"}
                _hover={{ opacity: 0.5 }}
                onClick={() => handleDeleteService(s)}
              >
                <MdOutlineDelete color="#ff0000" size={20} />
              </Box>
            </Flex>
          );
        })}
      </Flex>

      <Select
        onChange={(e) => {
          if (items.length === 0 || multiple) {
            const selection = e.target.options[e.target.selectedIndex].value;
            const newDb = db.filter((filteredItem) => {
              if (filteredItem == selection) {
                items.push(filteredItem);
                return false;
              }
              return true;
            });
            setDb(newDb);
            onChange(items);
          }
        }}
        value={-1}
      >
        <option value={-1}>Selecione Uma Opção</option>
        {db.map((w, index) => {
          return (
            <option key={index} value={w}>
              {w}
            </option>
          );
        })}
      </Select>
    </Box>
  );
};

export default SelectInput;

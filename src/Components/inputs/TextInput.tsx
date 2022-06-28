import { Box, Heading, Input } from "@chakra-ui/react";
import { HTMLInputTypeAttribute } from "react";

export interface TextInputProps {
  label: string;
  value: string;
  type?: HTMLInputTypeAttribute;
  onChange: (newValue: string) => void;
  disabled?: boolean;
}
const TextInput = ({
  label,
  onChange,
  value,
  type,
  disabled,
}: TextInputProps) => {
  return (
    <Box marginBottom={"15px"}>
      <Heading marginBottom={"10px"} color={"#6D676E"} size={"sm"}>
        {label}
      </Heading>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxW="700px"
        placeholder={label}
        disabled={disabled}
      />
    </Box>
  );
};

export default TextInput;

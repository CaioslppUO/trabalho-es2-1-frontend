import { Box, Heading, Input } from "@chakra-ui/react";
import { HTMLInputTypeAttribute } from "react";

export interface FileInputProps {
  label: string;
  onChange: (newValue: string) => void;
}
const FileInput = ({ label, onChange }: FileInputProps) => {
  return (
    <Box marginBottom={"15px"}>
      <Heading marginBottom={"10px"} color={"#6D676E"} size={"sm"}>
        {label}
      </Heading>
      <Input
        type={"file"}
        onChange={(e) => onChange(e.target.value)}
        maxW="700px"
        placeholder={label}
      />
    </Box>
  );
};

export default FileInput;

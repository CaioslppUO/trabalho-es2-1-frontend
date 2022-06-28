import { Box, Heading, Input } from "@chakra-ui/react";
export interface FileInputProps {
  label: string;
  onChange: (newValue: File) => void;
}
const FileInput = ({ label, onChange }: FileInputProps) => {
  return (
    <Box marginBottom={"15px"}>
      <Heading marginBottom={"10px"} color={"#6D676E"} size={"sm"}>
        {label}
      </Heading>
      <Input
        type={"file"}
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            onChange(e.target.files[0]);
          }
        }}
        maxW="700px"
        placeholder={label}
      />
    </Box>
  );
};

export default FileInput;

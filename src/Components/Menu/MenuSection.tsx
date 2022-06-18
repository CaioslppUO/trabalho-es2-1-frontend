import { Button, Heading } from "@chakra-ui/react";

interface MenuSectionProps {
  registrationText?: string;
  registrationAction: () => void;
  seeAllText?: string;
  seeAllAction: () => void;
  sectionTitle: string;
}

export default function MenuSection({
  registrationAction,
  registrationText = "Cadastrar Novo",
  seeAllAction,
  seeAllText = "Ver Todos",
  sectionTitle,
}: MenuSectionProps) {
  return (
    <>
      <Heading
        color={"#6d676ea9"}
        margin={"10px"}
        size="md"
        fontWeight={"bold"}
      >
        {sectionTitle}
      </Heading>
      <Button
        display={"flex"}
        justifyContent="flex-start"
        borderRadius="none"
        background={"#d4d4d45e"}
        marginBottom="1px"
        onClick={registrationAction}
      >
        {registrationText}
      </Button>
      <Button
        display={"flex"}
        justifyContent="flex-start"
        borderRadius="none"
        background={"#d4d4d45e"}
        marginBottom="1px"
        onClick={seeAllAction}
      >
        {seeAllText}
      </Button>
    </>
  );
}

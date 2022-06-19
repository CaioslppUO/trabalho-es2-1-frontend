import { Button, Heading } from "@chakra-ui/react";

interface MenuSectionProps {
  registrationText?: string;
  registrationAction?: () => void;
  seeAllText?: string;
  seeAllAction?: () => void;
  sectionTitle: string;
  loadFilesAction?: () => void;
  loadFilesTitle?: string;
}

export default function MenuSection({
  registrationAction,
  registrationText = "Cadastrar Novo",
  seeAllAction,
  seeAllText = "Ver Todos",
  sectionTitle,
  loadFilesTitle = "Carregar Listas",
  loadFilesAction,
}: MenuSectionProps) {
  return (
    <>
      <Heading
        color={"#6d676ea9"}
        margin={"10px"}
        size="md"
        fontWeight={"bold"}
        fontSize={"16px"}
      >
        {sectionTitle}
      </Heading>
      {registrationAction && (
        <Button
          display={"flex"}
          justifyContent="flex-start"
          borderRadius="none"
          background={"#d4d4d45e"}
          marginBottom="1px"
          onClick={registrationAction}
          fontSize={"13px"}
        >
          {registrationText}
        </Button>
      )}
      {seeAllAction && (
        <Button
          display={"flex"}
          justifyContent="flex-start"
          borderRadius="none"
          background={"#d4d4d45e"}
          marginBottom="1px"
          onClick={seeAllAction}
          fontSize={"13px"}
        >
          {seeAllText}
        </Button>
      )}
      {loadFilesAction && (
        <Button
          display={"flex"}
          justifyContent="flex-start"
          borderRadius="none"
          background={"#d4d4d45e"}
          marginBottom="1px"
          onClick={loadFilesAction}
          fontSize={"13px"}
        >
          {loadFilesTitle}
        </Button>
      )}
    </>
  );
}

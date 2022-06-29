import { Button, Heading } from "@chakra-ui/react";

interface MenuSectionProps {
  registrationText?: string;
  registrationAction?: () => void;
  seeAllText?: string;
  seeAllAction?: () => void;
  sectionTitle: string;
  loadFilesAction?: () => void;
  loadFilesTitle?: string;
  homeAction?: () => void;
  homeTitle?: string;
  chartsAction?: () => void;
  chartsTitle?: string;
  servicesChartsAction?: () => void;
  servicesChartsTitle?: string;
}

export default function MenuSection({
  registrationAction,
  registrationText = "Cadastrar Novo",
  seeAllAction,
  seeAllText = "Ver Todos",
  sectionTitle,
  loadFilesTitle = "Carregar Listas",
  loadFilesAction,
  homeAction,
  homeTitle = "Home",
  chartsAction,
  chartsTitle,
  servicesChartsAction,
  servicesChartsTitle,
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
      {homeAction && (
        <Button
          display={"flex"}
          justifyContent="flex-start"
          borderRadius="none"
          background={"#d4d4d45e"}
          marginBottom="1px"
          onClick={homeAction}
          fontSize={"13px"}
        >
          {homeTitle}
        </Button>
      )}
      {chartsAction && (
        <Button
          display={"flex"}
          justifyContent="flex-start"
          borderRadius="none"
          background={"#d4d4d45e"}
          marginBottom="1px"
          onClick={chartsAction}
          fontSize={"13px"}
        >
          {chartsTitle}
        </Button>
      )}
      {servicesChartsAction && (
        <Button
          display={"flex"}
          justifyContent="flex-start"
          borderRadius="none"
          background={"#d4d4d45e"}
          marginBottom="1px"
          onClick={servicesChartsAction}
          fontSize={"13px"}
        >
          {servicesChartsTitle}
        </Button>
      )}
    </>
  );
}

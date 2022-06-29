import { Button, Flex, Heading, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  HorizontalGridLines,
  LineSeries,
  VerticalBarSeries,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
} from "react-vis";
import api from "../../services/api";

interface AverageServiceDurarionProps {
  media: number;
  service: {
    type: string;
  }[];
}
interface TotalServiceOrderByClientProps {
  Nome: string;
  OS: number;
}

export default function Charts() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [
    averageServiceOrderQuantityByPeriod,
    setaverageServiceOrderQuantityByPeriod,
  ] = useState(0);

  const [
    averageValueFromServiceOrderByPeriod,
    setaverageValueFromServiceOrderByPeriod,
  ] = useState(0);

  const [totalValueFromServicesByPeriod, settotalValueFromServicesByPeriod] =
    useState<{ Rendimento: number; type: string }[]>();

  const [totalServiceOrderByPeriod, settotalServiceOrderByPeriod] = useState(0);

  async function getValues() {
    const data = {
      beginDate: startDate,
      endDate,
    };
    const response = await api.post(
      "averageServiceOrderQuantityByPeriod",
      data
    );

    const response2 = await api.post(
      "averageValueFromServiceOrderByPeriod",
      data
    );

    const response3 = await api.post("totalServiceOrderByPeriod", data);
    const response4 = await api.post("totalValueFromServicesByPeriod", data);
    console.log(data);
    setaverageServiceOrderQuantityByPeriod(response.data[0].media_servicos);
    setaverageValueFromServiceOrderByPeriod(response2.data[0].Media_Rendimento);
    settotalServiceOrderByPeriod(response3.data);
    settotalValueFromServicesByPeriod(response4.data);
  }

  useEffect(() => {
    getValues();
  }, [endDate, startDate]);

  console.log(totalValueFromServicesByPeriod);
  return (
    <>
      <Heading marginBottom={"30px"} color={"#6D676E"} size={"lg"}>
        Gráficos de acompanhamento
      </Heading>
      <Flex flexDirection={"column"}>
        <Flex w={"400px"}>
          <Heading marginBottom={"30px"} color={"#6D676E"} size={"xs"}>
            Data inicial do período
          </Heading>

          <Input type={"date"} onChange={(e) => setStartDate(e.target.value)} />
        </Flex>

        <Flex w={"400px"}>
          <Heading marginBottom={"30px"} color={"#6D676E"} size={"xs"}>
            Data final do período
          </Heading>

          <Input type={"date"} onChange={(e) => setEndDate(e.target.value)} />
        </Flex>
      </Flex>
      <Flex width={"100%"} flexWrap="wrap">
        <IntegerChart
          value={averageServiceOrderQuantityByPeriod}
          title="Média de ordens de serviços no período"
        />
        <IntegerChart
          value={averageValueFromServiceOrderByPeriod}
          title="Valor médio por ordem de serviço no período"
        />
        <IntegerChart
          value={totalServiceOrderByPeriod}
          title="Total de ordens de serviços no período"
        />
        {totalValueFromServicesByPeriod &&
          totalValueFromServicesByPeriod.map((i, index) => {
            return (
              <IntegerChart
                key={index}
                value={i.Rendimento}
                title={`Rendimento de ${i.type}`}
              />
            );
          })}
      </Flex>
    </>
  );
}

const IntegerChart = ({ value = 0, title = "" }) => {
  return (
    <Flex
      w="400px"
      alignItems={"center"}
      justifyContent={"center"}
      padding={"50px"}
      flexDirection="column"
    >
      <Heading
        textAlign={"center"}
        marginBottom={"20px"}
        color={"#6D676E"}
        size={"sm"}
      >
        {title}
      </Heading>
      <Flex
        alignItems={"center"}
        justifyContent="center"
        w="200px"
        h="200px"
        bg="#60a2f7"
        borderRadius={"100px"}
      >
        <Flex
          alignItems={"center"}
          justifyContent={"center"}
          w="150px"
          h="150px"
          bg="#FFF"
          borderRadius={"100px"}
        >
          <Heading>{typeof value === "number" && value.toFixed(2)}</Heading>
        </Flex>
      </Flex>
    </Flex>
  );
};

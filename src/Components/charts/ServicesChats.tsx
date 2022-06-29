import { Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import {
  ChartLabel,
  HorizontalGridLines,
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

export default function ServicesCharts() {
  const [averageServiceDurarion, setAverageServiceDurarion] =
    useState<AverageServiceDurarionProps[]>();

  const [totalServiceOrderByClient, setTotalServiceOrderByClient] =
    useState<TotalServiceOrderByClientProps[]>();
  totalServiceOrderByClient;

  async function init() {
    const response = await api.get("averageServiceDuration");
    setAverageServiceDurarion(response.data);

    const response2 = await api.get("totalServiceOrderByClient");
    setTotalServiceOrderByClient(response2.data);
  }
  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <Heading marginBottom={"30px"} color={"#6D676E"} size={"lg"}>
        Gráficos de acompanhamento
      </Heading>

      <Flex flexDirection={"column"}>
        <Flex padding={"50px 50px 0px"} flexDirection="column">
          <Heading marginBottom={"20px"} color={"#6D676E"} size={"sm"}>
            Média de duração dos serviços
          </Heading>
          {averageServiceDurarion && (
            <XYPlot
              margin={{ bottom: 70 }}
              xType="ordinal"
              width={600}
              height={300}
            >
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis
                tickLabelAngle={-15}
                style={{
                  fontSize: "10px",
                  line: { stroke: "#2b2b2b" },
                  ticks: { stroke: "#3a3a3a" },
                  text: { stroke: "none", fill: "#6b6b76", fontWeight: 600 },
                }}
              />
              <YAxis
                title="Dias"
                style={{
                  line: { stroke: "#2b2b2b" },
                  ticks: { stroke: "#3a3a3a" },
                  text: { stroke: "none", fill: "#6b6b76", fontWeight: 600 },
                }}
              />
              <VerticalBarSeries
                barWidth={0.2}
                data={averageServiceDurarion.map((item) => {
                  return {
                    x: item.service[0].type,
                    y: item.media,
                  };
                })}
              />
            </XYPlot>
          )}
        </Flex>
        <Flex padding={"50px 50px 0px"} flexDirection="column">
          <Heading marginBottom={"20px"} color={"#6D676E"} size={"sm"}>
            Quantidade de ordens de serviço por cliente
          </Heading>
          {totalServiceOrderByClient && (
            <XYPlot
              margin={{ bottom: 70 }}
              xType="ordinal"
              width={600}
              height={300}
            >
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis
                tickLabelAngle={-15}
                style={{
                  fontSize: "10px",
                  line: { stroke: "#2b2b2b" },
                  ticks: { stroke: "#3a3a3a" },
                  text: {
                    stroke: "none",
                    fill: "#6b6b76",
                    fontWeight: 600,
                    color: "#FFF",
                  },
                  title: {
                    fill: "#880000",
                  },
                }}
              />
              <YAxis
                style={{
                  line: { stroke: "#2b2b2b" },
                  ticks: { stroke: "#3a3a3a" },
                  text: { stroke: "none", fill: "#6b6b76", fontWeight: 600 },
                }}
                title="Qtd serviços"
              />
              <VerticalBarSeries
                barWidth={0.2}
                data={totalServiceOrderByClient.map((item) => {
                  return {
                    x: item.Nome.substring(0, 10) + ".",
                    y: item.OS,
                  };
                })}
              />
            </XYPlot>
          )}
        </Flex>
      </Flex>
    </>
  );
}

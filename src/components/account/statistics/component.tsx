"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { VictoryPie, VictoryChart, VictoryBar } from "victory";

import { Statistics } from "@/shared/types";

import styles from "./statistics.module.css";

type GraphData = {
  x: string;
  y: number;
};

export type AccountStatisticsProps = {
  statistics: Statistics[];
};

function AccountStatistics({ statistics }: AccountStatisticsProps) {
  const [graph, setGraph] = useState<GraphData[]>([]);
  const [total, setTotal] = useState(0);

  const generatedGraphData = useMemo(() => {
    const graphData = statistics.map((item) => {
      return {
        x: item.title,
        y: Number(item.acessos),
      };
    });

    setTotal(
      statistics
        .map(({ acessos }) => Number(acessos))
        .reduce((a, b) => a + b, 0)
    );

    return graphData;
  }, [statistics]);

  useEffect(() => {
    setGraph(generatedGraphData);
  }, [setGraph, generatedGraphData]);

  return (
    <section className={`${styles.graph} animeLeft`}>
      <div className={`${styles.total} ${styles.graphItem}`}>
        <p>Acessos: {total}</p>
      </div>
      <div className={styles.graphItem}>
        <VictoryPie
          data={graph}
          innerRadius={50}
          padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
          style={{
            data: {
              fillOpacity: 0.9,
              stroke: "#fff",
              strokeWidth: 2,
            },
            labels: {
              fontSize: 14,
              fill: "#333",
            },
          }}
        />
      </div>
      <div className={styles.graphItem}>
        <VictoryChart>
          <VictoryBar alignment="start" data={graph}></VictoryBar>
        </VictoryChart>
      </div>
    </section>
  );
}

export { AccountStatistics };
export default AccountStatistics;

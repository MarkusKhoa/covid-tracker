import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import { useState, useEffect, useRef } from "react";
import { cloneDeep } from "lodash";

highchartsMap(Highcharts);

const initOptions = {
  chart: {
    height: "500",
  },
  title: {
    text: null,
  },
  mapNavigation: {
    enabled: true,
  },
  colorAxis: {
    min: 0,
    stops: [
      [0.2, "#FFC4A4"],
      [0.2, "#FF8A66"],
      [0.6, "#FF392B"],
      [0.8, "#B71525"],
      [1.0, "#7A0826"],
    ],
  },
  legend: {
    layout: "vertical",
    align: "right",
    verticalAlign: "bottom",
  },
  series: [
    {
      mapData: {},
      name: "Population",
      joinBy: ["hc-key", "key"],
    },
  ],
};

export default function HighMaps({ mapData }) {
  const [options, setOptions] = useState({});
  const chartRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (mapData && Object.keys(mapData).length) {
      const fakeData = mapData.features.map((feature, index) => ({
        key: feature.properties["hc-keys"],
        value: index,
      }));

      setOptions(() => ({
        ...initOptions,
        title: {
          text: mapData.title,
        },
        series: [
          {
            ...initOptions.series[0],
            mapData: mapData,
            data: fakeData,
          },
        ],
      }));

      if (!mapLoaded) {
        setMapLoaded(true);
      }
    }
  }, [mapData, mapLoaded]);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      chartRef.current.chart.series[0].update({
        mapData,
      });
    }
  }, [mapData, options]);

  if (!mapLoaded) return null;

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={cloneDeep(options)}
      constructorType={"mapChart"}
      ref={chartRef}
    />
  );
}

HighMaps.defaultProps = {
  mapData: {},
};

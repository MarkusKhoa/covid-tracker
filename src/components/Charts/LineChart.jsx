import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { useState, useEffect } from "react";
import moment from "moment";

import React from "react";
import { Button, ButtonGroup } from "@material-ui/core";

const generateOptions = (data) => {
  const categories = data.map((item) => moment(item.Date).format("MM/DD/YYYY"));
  return {
    chart: {
      height: 500,
    },
    title: {
      text: "Overview of global Covid-19 cases",
    },
    subtitle: {
      text: "API source: https://api.covid19api.com/countries",
    },
    xAxis: {
      categories: categories,
      crosshair: true,
    },
    colors: ["#fcba03"],
    yAxis: {
      min: 0,
      title: {
        text: null,
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color}; padding: 2">{series.name}: </td>' +
        '<td style="padding: 0"><b>{point.y} cases </b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Total infected cases",
        data: data.map((item) => item.Confirmed),
      },
    ],
  };
};

export default function LineChart({ data }) {
  const [options, setOptions] = useState({});
  const [reportType, setReportType] = useState("all");

  useEffect(() => {
    let customData = [];
    switch (reportType) {
      case "all":
        customData = data;
        break;
      case "month":
        customData = data.slice(data.length - 31);
        break;
      case "week":
        customData = data.slice(data.length - 7);
        break;
      default:
        customData = data;
        break;
    }
    setOptions(generateOptions(customData));
  }, [reportType, data]);

  return (
    <div>
      <ButtonGroup
        size="small"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          textTransform: "capitalize",
        }}
      >
        <Button
          color={reportType === "all" ? "primary" : ""}
          onClick={() => setReportType("all")}
        >
          All dates
        </Button>
        <Button
          color={reportType === "month" ? "primary" : ""}
          onClick={() => setReportType("month")}
        >
          1 month
        </Button>
        <Button
          color={reportType === "week" ? "primary" : ""}
          onClick={() => setReportType("week")}
        >
          1 week
        </Button>
      </ButtonGroup>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

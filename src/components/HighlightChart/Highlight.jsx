import { Grid } from "@material-ui/core";

import React from "react";
import HighlightCard from "./HighlightCard";

export default function Highlight({ report }) {
  const data = report && report.length ? report[report.length - 1] : [];

  const summary = [
    {
      title: "Total cases",
      count: data.Confirmed,
      type: "confirmed",
    },
    {
      title: "Total recovered",
      count: data.Recovered,
      type: "recovered",
    },
    {
      title: "Total deaths",
      count: data.Deaths,
      type: "death",
    },
  ];
  return (
    <Grid container spacing={4}>
      {summary.map((item) => (
        <Grid item sm={4} xs={12}>
          <HighlightCard
            title={item.title}
            count={item.count}
            type={item.type}
          />
        </Grid>
      ))}
    </Grid>
  );
}

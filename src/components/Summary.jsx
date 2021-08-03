import { Grid } from "@material-ui/core";
import LineChart from "./Charts/LineChart";
import React from "react";
// import { useEffect, useState } from "react";
// import HighMaps from "./Charts/HighMaps";

function Summary({ report, selectedCountryId }) {
  // const [mapData, setMapData] = useState({});

  // useEffect(() => {
  //   if (selectedCountryId) {
  //     import(
  //       `@highcharts/map-collection/countries/${selectedCountryId}/${selectedCountryId}-all.geo.json`
  //     ).then((res) => setMapData(res));
  //   }
  // });

  return (
    <>
      <Grid container spacing={4}>
        <Grid item sm={12}>
          <LineChart data={report} />
        </Grid>
      </Grid>
    </>
  );
}

export default Summary;

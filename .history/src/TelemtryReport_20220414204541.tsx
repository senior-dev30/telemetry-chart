import React, { FC } from "react";
import { Box, makeStyles } from "@material-ui/core";
import PageHeader from "./components/PageHeader";
import ReportSection from "./components/ReportSection";
import { TelemetryChart } from "./TelemetryChart";
import { telemetryPlots } from "./utils/data";

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: 60,
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const TelemetryReport: FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <PageHeader title="Workcell Telemetry" />
      <Box>
        <ReportSection id="temperature" title="Temperature (Celsius)">
          <TelemetryChart
            graphIndex={1}
            inputs={telemetryPlots?.map((input) => {
              return {
                time: input.time,
                value: input.temperature,
              };
            })}
          />
        </ReportSection>
        <ReportSection id="humidity" title="Humidity (%)">
          <TelemetryChart
            graphIndex={2}
            inputs={telemetryPlots?.map((input) => {
              return {
                time: input.time,
                value: input.humidity,
              };
            })}
          />
        </ReportSection>
        <ReportSection id="co2" title="CO2 (ppm)">
          <TelemetryChart
            graphIndex={3}
            inputs={telemetryPlots?.map((input) => {
              return {
                time: input.time,
                value: input.co2,
              };
            })}
          />
        </ReportSection>
      </Box>
    </Box>
  );
};

export default TelemetryReport;

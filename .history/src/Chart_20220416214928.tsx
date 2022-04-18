/** App.js */
import React from "react";
import MultilineChart from "./views/MultilineChart";
import Legend from "./components/Legend";
import { telemetryPlots } from "./utils/data";
import "./styles.css";

const temperatureData = {
  name: "Temperature",
  color: "#ffffff",
  items: telemetryPlots.map((d) => ({ value: d.temperature, date: new Date(d.time) }))
};
const co2Data = {
  name: "CO2",
  color: "#d53e4f",
  items: telemetryPlots.map((d) => ({ value: d.co2, date: new Date(d.time) }))
};
const humidityData = {
  name: "Humidity",
  color: "#5e4fa2",
  items: telemetryPlots.map((d) => ({ value: d.humidity, date: new Date(d.time) }))
};

export default function Chart() {
  const [selectedItems, setSelectedItems] = React.useState([]);
  const legendData = [temperatureData, co2Data, humidityData];
  const chartData = [
    temperatureData,
    ...[co2Data, humidityData].filter((d) => selectedItems.includes(d.name))
  ];
  const onChangeSelection = (name) => {
    const newSelectedItems = selectedItems.includes(name)
      ? selectedItems.filter((item) => item !== name)
      : [...selectedItems, name];
    setSelectedItems(newSelectedItems);
  };

  return (
    <div className="App">
      <Legend
        data={legendData}
        selectedItems={selectedItems}
        onChange={onChangeSelection}
      />
      <MultilineChart data={chartData} />
    </div>
  );
}

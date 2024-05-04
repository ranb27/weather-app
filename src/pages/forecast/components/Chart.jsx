import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { formatDateTime } from "../../../utils/formatDate";

export default function ChartForecast({ weather, theme }) {
  const options = {
    chart: {
      id: "area-chart",
      type: "area",
      foreColor: theme === "emerald" ? "#333" : "#fff",
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: weather.hourly.time.map((time) => formatDateTime(time)),
    },
    stroke: {
      curve: "smooth",
    },
    series: [
      {
        name: `Temperature (${weather.hourly_units.temperature_2m})`,
        data: weather.hourly.temperature_2m,
      },
      {
        name: `Wind Speed (${weather.hourly_units.wind_speed_10m})`,
        data: weather.hourly.wind_speed_10m,
      },
      {
        name: `Relative Humidity (${weather.hourly_units.relative_humidity_2m})`,
        data: weather.hourly.relative_humidity_2m,
      },
    ],
  };

  return (
    <div className="bg-base-100 p-2 rounded-2xl mx-4 shadow-lg">
      <Chart
        options={options}
        series={options.series}
        type="area"
        height={400}
      />
    </div>
  );
}

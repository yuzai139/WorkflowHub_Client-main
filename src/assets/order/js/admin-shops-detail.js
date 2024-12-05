import ApexCharts from "apexcharts";
window.ApexCharts = ApexCharts;

import colors from "tailwindcss/colors";

var options = {
  series: [
    {
      name: "Orders",
      data: [75, 78, 38, 39, 38, 73, 73, 53, 53, 16, 16, 53],
    },
    {
      name: "Earnings",
      data: [35, 35, 62, 63, 13, 13, 60, 60, 41, 41, 82, 82],
    },
  ],
  chart: {
    toolbar: {
      show: false,
    },
    height: 350,
    type: "line",
    zoom: {
      enabled: false,
    },
    dropShadow: {
      enabled: true,
      enabledOnSeries: undefined,
      top: 5,
      left: 0,
      blur: 3,
      color: "#000",
      opacity: 0.15,
    },
  },
  grid: {
    borderColor: "#f1f1f1",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: [3, 3],
    curve: ["smooth", "smooth"],
    lineCap: "butt",
    dashArray: [0, 0],
  },
  title: {
    text: undefined,
  },
  legend: {
    show: true,
    position: "top",
    horizontalAlign: "right",
    fontWeight: 600,
    fontSize: "14px",
    tooltipHoverFormatter: function (val, opts) {
      return (
        val +
        " - " +
        opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
        ""
      );
    },
    labels: {
      colors: "#74767c",
    },
    markers: {
      width: 10,
      height: 10,
      strokeWidth: 0,
      radius: 12,
      offsetX: 0,
      offsetY: 0,
    },
  },
  markers: {
    discrete: [
      {
        seriesIndex: 0,
        dataPointIndex: 5,
        fillColor: colors.yellow[500],
        strokeColor: "#fff",
        size: 6,
        shape: "circle",
      },
      {
        seriesIndex: 0,
        dataPointIndex: 11,
        fillColor: colors.yellow[500],
        strokeColor: "#fff",
        size: 6,
        shape: "circle",
      },
      {
        seriesIndex: 1,
        dataPointIndex: 10,
        fillColor: colors.teal[500],
        strokeColor: "#fff",
        size: 6,
        shape: "circle",
      },
      {
        seriesIndex: 1,
        dataPointIndex: 4,
        fillColor: colors.teal[500],
        strokeColor: "#fff",
        size: 6,
        shape: "circle",
      },
    ],
    hover: {
      sizeOffset: 6,
    },
  },
  xaxis: {
    type: "day",
    categories: [
      "01 Jan",
      "02 Jan",
      "03 Jan",
      "04 Jan",
      "05 Jan",
      "06 Jan",
      "07 Jan",
      "08 Jan",
      "09 Jan",
      "10 Jan",
      "11 Jan",
      "12 Jan",
    ],
  },
  colors: [colors.yellow[500], colors.teal[500]],
};
var chart = new ApexCharts(
  document.querySelector("#customer_impression_charts"),
  options,
);
chart.render();

/*
Template Name: GreenCart - Multipurpose Food Tailwind CSS Template
Version: 1.0
Author: coderthemes
Email: support@coderthemes.com
*/

import ApexCharts from "apexcharts";
import colors from "tailwindcss/colors";

var options = {
  series: [
    {
      name: "New Profit",
      data: [60, 40, 40, 120, 55, 160, 70, 160, 66, 150, 90, 180],
    },
    {
      name: "Revenue",
      data: [50, 25, 60, 95, 49, 120, 55, 135, 55, 135, 99, 140],
    },
  ],
  chart: {
    height: 350,
    type: "area",
    width: "100%",
    stacked: true,
    toolbar: {
      show: false,
      autoSelected: "zoom",
    },
    dropShadow: {
      enabled: true,
      top: 12,
      left: 0,
      bottom: 0,
      right: 0,
      blur: 2,
      color: "rgba(132, 145, 183, 0.3)",
      opacity: 0.35,
    },
  },
  colors: [colors.emerald[500], colors.cyan[500]],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: [1.5, 1.5],
    dashArray: [0, 4],
    lineCap: "round",
  },
  grid: {
    padding: {
      left: 0,
      right: 0,
    },
    strokeDashArray: 3,
  },
  markers: {
    size: 0,
    hover: {
      size: 0,
    },
  },
  legend: {
    show: false,
  },

  xaxis: {
    type: "month",
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    axisBorder: {
      show: true,
    },
    axisTicks: {
      show: true,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0.1,
      stops: [0, 90, 100],
    },
  },

  tooltip: {
    x: {
      format: "dd/MM/yy HH:mm",
    },
  },
};
var chart = new ApexCharts(document.querySelector("#revenue_report"), options);
chart.render();

var options = {
  chart: {
    height: 300,
    type: "donut",
  },
  plotOptions: {
    pie: {
      donut: {
        size: "85%",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },

  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },

  series: [50, 25, 25],
  legend: {
    show: true,
    position: "bottom",
    horizontalAlign: "center",
    verticalAlign: "middle",
    floating: false,
    fontSize: "13px",
    offsetX: 0,
    offsetY: 0,
  },
  labels: ["Fruits", "Vegetables", "Nuts & Berries"],
  colors: [colors.emerald[500], colors.sky[500], colors.yellow[500]],
  // colors: ["#2a76f4", "rgba(42, 118, 244, .5)", "rgba(42, 118, 244, .18)"],

  responsive: [
    {
      breakpoint: 600,
      options: {
        plotOptions: {
          donut: {
            customScale: 0.2,
          },
        },
        chart: {
          height: 240,
        },
        legend: {
          show: false,
        },
      },
    },
  ],
  tooltip: {
    y: {
      formatter: function (val) {
        return val + " %";
      },
    },
  },
};
var chart = new ApexCharts(document.querySelector("#ana_device"), options);
chart.render();

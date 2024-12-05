import ApexCharts from "apexcharts";
window.ApexCharts = ApexCharts;

import colors from "tailwindcss/colors";

var options = {
  series: [
    {
      name: "Income",
      data: [66, 95, 95, 88, 80, 100, 82, 100, 90],
    },
    {
      name: "Expense",
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
    },
  ],
  chart: {
    type: "bar",
    height: 385,
    toolbar: {
      show: false,
    },
  },
  colors: [colors.yellow[500], colors.emerald[500]],
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "30%",
      borderRadius: 4,
      endingShape: "rounded",
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
  xaxis: {
    categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
  },
  yaxis: {
    title: {
      text: "$ (thousands)",
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return "$ " + val + " thousands";
      },
    },
  },
};

var chart = new ApexCharts(
  document.querySelector("#balance_statistics"),
  options,
);

chart.render();

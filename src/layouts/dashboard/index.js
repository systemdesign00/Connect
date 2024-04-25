/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { Bar, Line, Pie } from "react-chartjs-2";
import axios from "axios";

import React, { useEffect, useState, useMemo } from "react";
import { createAPIEndpoint, ENDPIONTS } from "api";
import { roundTo2DecimalPoint } from "utils";
// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components

import MDTypography from "components/MDTypography";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import Chart from "react-apexcharts";
// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import MasterCard from "examples/Cards/MasterCard";
import { IoMdPricetags } from "react-icons/io";
import { GiGoldBar } from "react-icons/gi";
import { GiMissileMech } from "react-icons/gi";
import { GiGemChain } from "react-icons/gi";
import { FaUsers } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa6";
import { GiMetalGolemHead } from "react-icons/gi";
import { Box } from "@mui/material";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { BsCashCoin } from "react-icons/bs";
const PieChart = () => {
  const [goldwt, setgoldwt] = useState([]);
  const [silverwt, setsilverwt] = useState([]);
  const [sterlingwt, setsterlingwt] = useState([]);

  useEffect(() => {
    axios
      .get("https://serdb.onrender.com/api/GstGoldStock/")
      .then((response) => {
        setgoldwt(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get("https://serdb.onrender.com/api/GstSilverStock/")
      .then((response) => {
        setsilverwt(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get("https://serdb.onrender.com/api/FancyStockitem")
      .then((response) => {
        setsterlingwt(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  var goldstk = roundTo2DecimalPoint(
    goldwt.reduce(
      (total, currentValue) =>
        (total = total + Number(currentValue.itemWeight)),
      0
    )
  );
  var silverstk = roundTo2DecimalPoint(
    silverwt.reduce(
      (total, currentValue) =>
        (total = total + Number(currentValue.itemWeight)),
      0
    )
  );
  var sterlingstk = roundTo2DecimalPoint(
    sterlingwt.reduce(
      (total, currentValue) =>
        (total = total + Number(currentValue.itemWeight)),
      0
    )
  );

  const datapie1 = goldwt
    .map((item) => Number(item.itemWeight))
    .reduce((total, currentValue) => total + currentValue, 0);
  const datapie2 = silverwt
    .map((item) => Number(item.itemWeight))
    .reduce((total, currentValue) => total + currentValue, 0);
  const datapie3 = sterlingwt
    .map((item) => Number(item.itemWeight))
    .reduce((total, currentValue) => total + currentValue, 0);
  // Data for the pie chart
  const chartData = {
    series: [goldstk, silverstk, sterlingstk],
    options: {
      chart: {
        type: "pie",
      },

      labels: ["GOLD", "SILVER", "STERLING"],
      fill: {
        type: "gradient",
      },
      legend: {
        position: "bottom",
      },
      colors: ["#FFA726", "#495361", "#ADD8E6"],

      responsive: [
        {
          breakpoint: 380,
          options: {
            chart: {
              width: 100,
            },
            legend: {
              position: "center",
            },
          },
        },
      ],
    },
  };

  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="pie"
        width="250"
      />
    </div>
  );
};
function Dashboard() {
  const [salesData, setSalesData] = useState([]);

  const [salesDatasilver, setSalesDatasilver] = useState([]);

  const [goldwt, setgoldwt] = useState([]);
  const [silverwt, setsilverwt] = useState([]);
  const [sterlingwt, setsterlingwt] = useState([]);
  useEffect(() => {
    // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
    axios
      .get("https://serdb.onrender.com/api/Gsestimate")
      .then((response) => {
        setSalesData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get("https://serdb.onrender.com/api/Gsestimate")
      .then((response) => {
        setSalesDatasilver(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get("https://serdb.onrender.com/api/GstGoldStock/")
      .then((response) => {
        setgoldwt(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get("https://serdb.onrender.com/api/GstSilverStock/")
      .then((response) => {
        setsilverwt(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get("https://serdb.onrender.com/api/FancyStockitem")
      .then((response) => {
        setsterlingwt(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const labelspie = salesData.map((sale) =>
    new Date(sale.hireDate).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  );

  const datapie1 = goldwt
    .map((item) => Number(item.itemWeight))
    .reduce((total, currentValue) => total + currentValue, 0);
  const datapie2 = silverwt
    .map((item) => Number(item.itemWeight))
    .reduce((total, currentValue) => total + currentValue, 0);
  const datapie3 = sterlingwt
    .map((item) => Number(item.itemWeight))
    .reduce((total, currentValue) => total + currentValue, 0);

  //const combinedDatapie = datapie1.map((value, index) => value + datapie2[index]);

  const chartDatapies = {
    labels: ["GOLD", "SILVER", "STERLING"],
    datasets: [
      {
        label: "STOCK",
        data: [datapie1, datapie2, datapie3],
        weight: 9,
        cutout: 5,
        tension: 0.9,
        pointRadius: 12,
        borderWidth: 3,
        backgroundColor: ["#FFA726", "#495361", "#ADD8E6"],
        borderColor: ["#000000", "#000000", "#000000"],
      },
    ],
  };

  const chartOptionspie = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        labels: {
          display: true,
          color: "#00000", // Set the desired label color here
        },

        display: true,
        position: "bottom",
      },
      datalabels: {
        display: true,
        color: "#FFFFFF", // Label text color
        anchor: "end",
        align: "start",
      },
    },
  };

  const groupByDategold = (data) => {
    const groupedDatagold = {};

    data.forEach((sale) => {
      const dateKey = new Date(sale.hireDate).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      });

      if (!groupedDatagold[dateKey]) {
        groupedDatagold[dateKey] = {
          data1: 0,
          data2: 0,
          data3: 0,
          data4: 0,
          data5:0,
        };
      }

      //groupedDatagold[dateKey].data1 += sale.orderDetails.reduce(
        //(total, currentValue) => total + Number(currentValue.foodItemPrice),
        //0
      //);
      groupedDatagold[dateKey].data1 += sale.orderPercent.reduce(
        (total, currentValue) => total + Number(currentValue.foodItemPrice),
        0
      );
      groupedDatagold[dateKey].data2 += sale.stockaddorderDetails.reduce(
        (total, currentValue) => total + Number(currentValue.foodItemPrice),
        0
      );
      groupedDatagold[dateKey].data3 += sale.addorderDetails.reduce(
        (total, currentValue) => total + Number(currentValue.foodItemPrice),
        0
      );
        groupedDatagold[dateKey].data4 += sale.watageitems.reduce(
        (total, currentValue) => total + Number(currentValue.foodItemPrice),
        0
      );
    });

    return groupedDatagold;
  };

  const groupedDatagold = groupByDategold(salesData);

  const labels = Object.keys(groupedDatagold);
  //const data1 = labels.map((date) => groupedDatagold[date].data1);
  const data1 = labels.map((date) => groupedDatagold[date].data1);
  const data2 = labels.map((date) => groupedDatagold[date].data2);
  const data3 = labels.map((date) => groupedDatagold[date].data3);
   const data4 = labels.map((date) => groupedDatagold[date].data4);

  const combinedData = data1.map(
    (value, index) => value + data2[index] + data3[index] + data4[index] 
  );

  const chartDatass = {
    labels: labels,
    datasets: [
      {
        label: "GOLD",
        data: combinedData,
        weight: 9,
        cutout: 0,
        tension: 0.9,
        pointRadius: 2,
        borderWidth: 2,
        backgroundColor: "error",
        fill: false,
      },
    ],
  };

  const chartOptionsss = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    scales: {
      y: {
        grid: {
          drawBorder: false,
          display: true,
          drawOnChartArea: true,
          drawTicks: false,
          borderDash: [5, 5],
          color: "rgba(255, 255, 255, .2)",
        },
        ticks: {
          display: true,
          color: "#f8f9fa",
          padding: 10,
          font: {
            size: 14,
            weight: 300,
            family: "Roboto",
            style: "normal",
            lineHeight: 2,
          },
        },
      },
      x: {
        grid: {
          drawBorder: false,
          display: false,
          drawOnChartArea: false,
          drawTicks: false,
          borderDash: [5, 5],
        },
        ticks: {
          display: true,
          color: "#f8f9fa",
          padding: 10,
          font: {
            size: 14,
            weight: 300,
            family: "Roboto",
            style: "normal",
            lineHeight: 2,
          },
        },
      },
    },
  };

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "GOLD",
        data: combinedData,
        tension: 0,
        pointRadius: 5,
        pointBorderColor: "transparent",
        pointBackgroundColor: "rgba(255, 255, 255, .8)",
        borderColor: "rgba(255, 255, 255, .8)",
        borderWidth: 4,
        backgroundColor: "transparent",
        fill: true,
        maxBarThickness: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    interaction: {
      intersect: true,
      mode: "index",
    },
    scales: {
      y: {
        grid: {
          drawBorder: false,
          display: true,
          drawOnChartArea: true,
          drawTicks: false,
          borderDash: [5, 5],
          color: "rgba(255, 255, 255, .2)",
        },
        ticks: {
          display: true,
          color: "#f8f9fa",
          padding: 10,
          font: {
            size: 10,
            weight: 300,
            family: "Roboto",
            style: "normal",
            lineHeight: 2,
          },
        },
      },
      x: {
        grid: {
          drawBorder: true,
          display: true,
          drawOnChartArea: true,
          drawTicks: true,
          borderDash: [5, 5],
        },
        ticks: {
          maxTicksLimit: 31,
          display: true,
          color: "#f8f9fa",
          padding: 10,
          font: {
            size: 10,
            weight: 300,
            family: "Roboto",
            style: "Bold",
            lineHeight: 2,
          },
          angle: -45,
        },
      },
    },
  };

  const today = new Date();

  // Find the last date with data (excluding today)
  const lastDateWithData = salesData.reduce((lastDate, sale) => {
    const saleDate = new Date(sale.hireDate);
    if (
      saleDate.toDateString() !== today.toDateString() &&
      saleDate > lastDate
    ) {
      return saleDate;
    }
    return lastDate;
  }, new Date(0));

  // Filter data for today and the last date with data
  const todayData = salesData.filter(
    (sale) => new Date(sale.hireDate).toDateString() === today.toDateString()
  );
  const lastDateWithDataData = salesData.filter(
    (sale) =>
      new Date(sale.hireDate).toDateString() === lastDateWithData.toDateString()
  );

  // Calculate total weight for today and the last date with data
  const todayWeight = todayData.reduce(
    (total, sale) => total + calculateTotalWeight(sale),
    0
  );
  const lastDateWithDataWeight = lastDateWithDataData.reduce(
    (total, sale) => total + calculateTotalWeight(sale),
    0
  );

  console.log(`Today's Weight: ${todayWeight}`);
  console.log(`Last Date with Data's Weight: ${lastDateWithDataWeight}`);

  // Calculate percentage change
  let salesIncreasePercentage;

  if (lastDateWithDataWeight !== todayWeight) {
    salesIncreasePercentage =
      ((todayWeight - lastDateWithDataWeight) / lastDateWithDataWeight) * 100;
  } else {
    // No change or data for the last date, you may choose to handle it differently
    salesIncreasePercentage = 0; // or set it to a default value
  }

  const salesIncreasePercentagemin = Math.min(salesIncreasePercentage, 100);

  console.log(`Percentage Change: ${salesIncreasePercentage}%`);
  // Function to calculate total weight from orderPercent and addorderDetails
   

  
 
  
  

  function calculateTotalWeight(sale) {
    const orderWeight = sale.orderPercent.reduce(
      (total, currentValue) => total + Number(currentValue.foodItemPrice),
      0
    );
    const addOrderWeight = sale.addorderDetails.reduce(
      (total, currentValue) => total + Number(currentValue.foodItemPrice),
      0
    );
    const wastageWeight = sale.watageitems.reduce(
      (total, currentValue) => total + Number(currentValue.foodItemPrice),
      0
    );
    const stockaddOrderWeight = sale.stockaddorderDetails.reduce(
      (total, currentValue) => total + Number(currentValue.foodItemPrice),
      0
    );
    return orderWeight + addOrderWeight + wastageWeight + stockaddOrderWeight;
  }

  /* Silver */
  const groupByDate = (data) => {
    const groupedData = {};

    data.forEach((sale) => {
      const dateKey = new Date(sale.hireDate).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      });

      if (!groupedData[dateKey]) {
        groupedData[dateKey] = {
          datas1: 0,
          datas2: 0,
          datas3: 0,
          datas4: 0,
          datas5: 0,
        };
      }

      groupedData[dateKey].datas1 += sale.orderDetails.reduce(
        (total, currentValue) => total + Number(currentValue.foodItemPrice),
        0
      );
      //groupedData[dateKey].datas2 += sale.orderPercent.reduce(
       // (total, currentValue) => total + Number(currentValue.foodItemPrice),
       // 0
      //);
      groupedData[dateKey].datas3 += sale.stockaddorderDetails.reduce(
        (total, currentValue) => total + Number(currentValue.foodItemPrice),
        0
      );
      groupedData[dateKey].datas4 += sale.addorderDetails.reduce(
        (total, currentValue) => total + Number(currentValue.foodItemPrice),
        0
      );
      groupedData[dateKey].datas5 += sale.fancyitems.reduce(
        (total, currentValue) => total + Number(currentValue.foodItemPrice),
        0
      );
    });

    return groupedData;
  };

  const groupedData = groupByDate(salesDatasilver);
  const labelsilver = Object.keys(groupedData);

  const datas1 = labelsilver.map((date) => groupedData[date].datas1);
  //const datas2 = labelsilver.map((date) => groupedData[date].datas2);
  const datas3 = labelsilver.map((date) => groupedData[date].datas3);
  const datas4 = labelsilver.map((date) => groupedData[date].datas4);
  const datas5 = labelsilver.map((date) => groupedData[date].datas5);

  const combinedDatas = datas1.map(
    (value, index) =>
      value +  datas3[index] + datas4[index] + datas5[index]
  );
  //const data = data1 + data2
  const chartDatas = {
    labels: labelsilver,
    datasets: [
      {
        label: "SILVER",
        data: combinedDatas,
        tension: 0,
        pointRadius: 5,
        pointBorderColor: "transparent",
        pointBackgroundColor: "rgba(255, 255, 255, .8)",
        borderColor: "rgba(255, 255, 255, .8)",
        borderWidth: 4,
        backgroundColor: "transparent",
        fill: true,
        maxBarThickness: 6,
      },
    ],
  };

  const chartOptionss = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    scales: {
      y: {
        grid: {
          drawBorder: false,
          display: true,
          drawOnChartArea: true,
          drawTicks: false,
          borderDash: [5, 5],
          color: "rgba(255, 255, 255, .2)",
        },
        ticks: {
          display: true,
          color: "#f8f9fa",
          padding: 10,
          font: {
            size: 14,
            weight: 300,
            family: "Roboto",
            style: "normal",
            lineHeight: 2,
          },
        },
      },
      x: {
        grid: {
          drawBorder: true,
          display: true,
          drawOnChartArea: true,
          drawTicks: true,
          borderDash: [5, 5],
        },
        ticks: {
          maxTicksLimit: 31,
          display: true,
          color: "#f8f9fa",
          padding: 10,
          font: {
            size: 10,
            weight: 300,
            family: "Roboto",
            style: "Bold",
            lineHeight: 2,
          },
          angle: -45,
        },
      },
    },
  };

  const todays = new Date();

  // Find the last date with data (excluding today)
  const lastDateWithDatas = salesDatasilver.reduce((lastDate, sale) => {
    const saleDate = new Date(sale.hireDate);
    if (
      saleDate.toDateString() !== today.toDateString() &&
      saleDate > lastDate
    ) {
      return saleDate;
    }
    return lastDate;
  }, new Date(0));

  // Filter data for today and the last date with data
  const todayDatas = salesDatasilver.filter(
    (sale) => new Date(sale.hireDate).toDateString() === todays.toDateString()
  );
  const lastDateWithDataDatas = salesDatasilver.filter(
    (sale) =>
      new Date(sale.hireDate).toDateString() ===
      lastDateWithDatas.toDateString()
  );

  // Calculate total weight for today and the last date with data
  const todayWeights = todayDatas.reduce(
    (total, sale) => total + calculateTotalWeights(sale),
    0
  );
  const lastDateWithDataWeights = lastDateWithDataDatas.reduce(
    (total, sale) => total + calculateTotalWeights(sale),
    0
  );

  console.log(`Today's Weight: ${todayWeights}`);
  console.log(`Last Date with Data's Weight: ${lastDateWithDataWeights}`);

  // Calculate percentage change
  let salesIncreasePercentages;

  if (lastDateWithDataWeights !== todayWeights) {
    salesIncreasePercentages =
      ((todayWeights - lastDateWithDataWeights) / lastDateWithDataWeights) *
      100;
  } else {
    // No change or data for the last date, you may choose to handle it differently
    salesIncreasePercentages = 0; // or set it to a default value
  }

  const salesIncreasePercentagemins = Math.min(salesIncreasePercentages, 100);

  console.log(`Percentage Change: ${salesIncreasePercentages}%`);

  // Function to calculate total weight from orderPercent and addorderDetails
  function calculateTotalWeights(sale) {
    const orderWeight = sale.orderDetails.reduce(
      (total, currentValue) => total + Number(currentValue.foodItemPrice),
      0
    );
    const addOrderWeight = sale.orderPercent.reduce(
      (total, currentValue) => total + Number(currentValue.foodItemPrice),
      0
    );

    const orderWeights = sale.stockaddorderDetails.reduce(
      (total, currentValue) => total + Number(currentValue.foodItemPrice),
      0
    );
    const addOrderWeights = sale.addorderDetails.reduce(
      (total, currentValue) => total + Number(currentValue.foodItemPrice),
      0
    );
    const orderWeighta = sale.fancyitems.reduce(
      (total, currentValue) => total + Number(currentValue.foodItemPrice),
      0
    );

    return (
      orderWeight +
      addOrderWeight +
      orderWeights +
      addOrderWeights +
      orderWeighta
    );
  }
  const { sales, tasks } = reportsLineChartData;
  const [displaygoldstk, setdisplaygoldstk] = useState([]);
  const [displaysilverstk, setdisplaysilverstk] = useState([]);
  const [displaysterlingstk, setdisplaysterlingstk] = useState([]);

  const [follow, setfollow] = useState([]);
  const [ventors, setventors] = useState([]);
  const [currrate, setcurrrate] = useState([]);

  useEffect(() => {
    createAPIEndpoint(ENDPIONTS.GSTGOLDSTOCK)
      .fetchAll()
      .then((res) => {
        setdisplaygoldstk(res.data);
      })
      .catch((err) => console.log(err));

    createAPIEndpoint(ENDPIONTS.GSTSILVERSTOCK)
      .fetchAll()
      .then((res) => {
        setdisplaysilverstk(res.data);
      })
      .catch((err) => console.log(err));

    createAPIEndpoint(ENDPIONTS.FANCYITEMS)
      .fetchAll()
      .then((res) => {
        setdisplaysterlingstk(res.data);
      })
      .catch((err) => console.log(err));

    createAPIEndpoint(ENDPIONTS.BOOKS)
      .fetchAll()
      .then((res) => {
        setfollow(res.data);
      })
      .catch((err) => console.log(err));

    createAPIEndpoint(ENDPIONTS.VENTOR)
      .fetchAll()
      .then((res) => {
        setventors(res.data);
      })
      .catch((err) => console.log(err));

    createAPIEndpoint(ENDPIONTS.RATES)
      .fetchAll()
      .then((res) => {
        setcurrrate(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const Fetchrates = () => {
    createAPIEndpoint(ENDPIONTS.RATES)
      .fetchAll()
      .then((res) => {
        setcurrrate(res.data);
      })
      .catch((err) => console.log(err));
  };
  //var goldstk = displaygoldstk.reduce((total, currentValue) => total = total + Number(currentValue.itemWeight),0);
  var goldstk = displaygoldstk.reduce(
    (total, currentValue) => (total = total + Number(currentValue.itemWeight)),
    0
  );
  var silverstk = displaysilverstk.reduce(
    (total, currentValue) => (total = total + Number(currentValue.itemWeight)),
    0
  );
  var sterlingstk = displaysterlingstk.reduce(
    (total, currentValue) => (total = total + Number(currentValue.itemWeight)),
    0
  );
  var totalfollowers = follow.length;
  var totalventors = ventors.length;

  const ratesgol = currrate.map((item) => item.gold);
  const ratessil = currrate.map((item) => item.silver);

  const ratesgolpure = currrate.map((item) => item.goldpure);
  const ratessilpure = currrate.map((item) => item.silverpure);

  let goldrate = ratesgol;
  let silverrate = ratessil;

  let goldratepure = ratesgolpure;
  let silverratepure = ratessilpure;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="warning"
                icon={<GiGoldBar />}
                title="GOLD STOCK"
                count={roundTo2DecimalPoint(goldstk).toFixed(3) + "G"}
                percentage={{
                  color: "success",
                  amount: "100%",
                  label: "Current Updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="secondary"
                icon={<GiMissileMech />}
                title="SILVER STOCK"
                count={roundTo2DecimalPoint(silverstk).toFixed(3) + "G"}
                percentage={{
                  color: "success",
                  amount: "100%",
                  label: "Current Updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="info"
                icon={<GiGemChain />}
                title="FANCY STOCK"
                count={roundTo2DecimalPoint(sterlingstk).toFixed(3) + "G"}
                percentage={{
                  color: "success",
                  amount: "100%",
                  label: "Current Updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon={<FaUsers />}
                title="Followers"
                count={totalfollowers + "+"}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5} onClick={Fetchrates}>
              <ComplexStatisticsCard
                color="dark"
                icon={<IoMdPricetags />}
                title="GOLD RATE"
                extras={
                  <Box sx={{ color: "#FFA726" }}>{"24K:" + goldratepure}</Box>
                }
                count={
                  <Box sx={{ color: "#FFA726" }}>{"22CT:" + goldrate}</Box>
                }
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5} onClick={Fetchrates}>
              <ComplexStatisticsCard
                color="dark"
                icon={<IoMdPricetags />}
                title="SILVER RATE"
                extras={
                  <Box sx={{ color: "#495361" }}>
                    {"Fine:" + silverratepure}
                  </Box>
                }
                count={
                  <Box sx={{ color: "#495361" }}>{"Sell:" + silverrate}</Box>
                }
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <DefaultInfoCard
                color="error"
                title="Mode of Payment"
                icon={<BsCashCoin />}
                iconsecondary={<BsCreditCard2FrontFill />}
              />
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon={<FaUserTie />}
                title="Ventors"
                count={totalventors + "+"}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <Card sx={{ height: "100%" }}>
                  <MDBox padding="1rem">
                    {useMemo(() => (
                      <MDBox
                        variant="gradient"
                        bgColor="info"
                        borderRadius="lg"
                        coloredShadow="dark"
                        py={2}
                        pr={0.5}
                        mt={-5}
                        height="12.5rem"
                      >
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <PieChart />
                        </div>

                        {/*<Pie data={chartDatapie} options={chartOptionspie} redraw/>*/}
                      </MDBox>
                    ))}

                    <MDBox pt={3} pb={1} px={1}>
                      <MDTypography variant="h6" textTransform="capitalize">
                        INVENTORY
                      </MDTypography>
                      <MDTypography
                        component="div"
                        variant="button"
                        color="text"
                        fontWeight="light"
                      >
                        GOLD,SILVER AND STERLING
                      </MDTypography>
                      <Divider />
                      <MDBox display="flex" alignItems="center">
                        <MDTypography
                          variant="button"
                          color="text"
                          lineHeight={1}
                          sx={{ mt: 0.15, mr: 0.5 }}
                        >
                          <Icon>schedule</Icon>
                        </MDTypography>
                        <MDTypography
                          variant="button"
                          color="text"
                          fontWeight="light"
                        >
                          Updated Just now
                        </MDTypography>
                      </MDBox>
                    </MDBox>
                  </MDBox>
                </Card>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <Card sx={{ height: "100%" }}>
                  <MDBox padding="1rem">
                    {useMemo(() => (
                      <MDBox
                        variant="gradient"
                        bgColor="warning"
                        borderRadius="lg"
                        coloredShadow="warning"
                        py={2}
                        pr={0.5}
                        mt={-5}
                        height="12.5rem"
                      >
                        <Line data={chartData} options={chartOptions} redraw />
                      </MDBox>
                    ))}

                    <MDBox pt={3} pb={1} px={1}>
                      <MDTypography variant="h6" textTransform="capitalize">
                        Gold Invoice Daily Sales
                      </MDTypography>
                      <MDTypography
                        component="div"
                        variant="button"
                        color="text"
                        fontWeight="light"
                      >
                        {salesIncreasePercentagemin.toFixed(2) < 0 ? (
                          <Box sx={{ color: "red", fontWeight: "bold" }}>
                            {salesIncreasePercentagemin.toFixed(2)}% Decreases
                            in today sales
                          </Box>
                        ) : (
                          <Box sx={{ color: "green", fontWeight: "bold" }}>
                            {salesIncreasePercentagemin.toFixed(2)}% increase in
                            today sales.
                          </Box>
                        )}
                      </MDTypography>
                      <Divider />
                      <MDBox display="flex" alignItems="center">
                        <MDTypography
                          variant="button"
                          color="text"
                          lineHeight={1}
                          sx={{ mt: 0.15, mr: 0.5 }}
                        >
                          <Icon>schedule</Icon>
                        </MDTypography>
                        <MDTypography
                          variant="button"
                          color="text"
                          fontWeight="light"
                        >
                          Updated Just now
                        </MDTypography>
                      </MDBox>
                    </MDBox>
                  </MDBox>
                </Card>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <Card sx={{ height: "100%" }}>
                  <MDBox padding="1rem">
                    {useMemo(() => (
                      <MDBox
                        variant="gradient"
                        bgColor="secondary"
                        borderRadius="lg"
                        coloredShadow="secondary"
                        py={2}
                        pr={0.5}
                        mt={-5}
                        height="12.5rem"
                      >
                        <Line
                          data={chartDatas}
                          options={chartOptionss}
                          redraw
                        />
                      </MDBox>
                    ))}

                    <MDBox pt={3} pb={1} px={1}>
                      <MDTypography variant="h6" textTransform="capitalize">
                        Silver Invoice Daily Sales
                      </MDTypography>
                      <MDTypography
                        component="div"
                        variant="button"
                        color="text"
                        fontWeight="light"
                      >
                        {salesIncreasePercentages.toFixed(2) < 0 ? (
                          <Box sx={{ color: "red", fontWeight: "bold" }}>
                            {salesIncreasePercentagemins.toFixed(2)}% Decreases
                            in today sales
                          </Box>
                        ) : (
                          <Box sx={{ color: "green", fontWeight: "bold" }}>
                            {salesIncreasePercentagemins.toFixed(2)}% increase
                            in today sales.
                          </Box>
                        )}
                      </MDTypography>
                      <Divider />
                      <MDBox display="flex" alignItems="center">
                        <MDTypography
                          variant="button"
                          color="text"
                          lineHeight={1}
                          sx={{ mt: 0.15, mr: 0.5 }}
                        >
                          <Icon>schedule</Icon>
                        </MDTypography>
                        <MDTypography
                          variant="button"
                          color="text"
                          fontWeight="light"
                        >
                          Updated Just now
                        </MDTypography>
                      </MDBox>
                    </MDBox>
                  </MDBox>
                </Card>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                {/*  
                  
                  <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
                  */}
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                {/*  <MasterCard number={4562112245947852} holder="jewells and Silvers" expires={new Date().toLocaleDateString()} /> */}
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                {/*  
                  
                   <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
                  */}
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              {/*    <Projects />*/}
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              {/*  <OrdersOverview />*/}
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;

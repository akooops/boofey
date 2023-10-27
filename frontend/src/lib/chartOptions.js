export let CanteensOptions = {
    series: [  
        {
            name: "Average",
            type: "line",
            data: [],
        },
        {
            name: "Done",
            type: "line",
            data: [],
            
        },
    ],
    chart: {
        height: 370,
        type: "line",
        toolbar: {
            show: false,
        },
    },
    stroke: {
        curve: "smooth",
        width: [2, 2],
    },
    fill: {
        type: ["solid","solid"],
        // opacity:0.06
    },
    markers: {
        size: 0,
        style: "hollow",
    },
    xaxis: {
        categories: [],
        axisTicks: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
    },
    yaxis: [
        {
          title: {
            text: "Average",
            style: {
                color: "#5596f7"
            },
            rotate: 0,
            offsetY: -150, 
          },
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            // color: "#5596f7"
          },
          labels: {
            style: {
              colors: "#5596f7"
            }
          },
        },
        {
          opposite: true,
          title: {
            text: "Done",
            style: {
                color: "#695eef"
            },
            rotate: 0,
            offsetY: -150, 
          },
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            // color: "#695eef"
          },
          labels: {
            style: {
              colors: "#695eef"
            }
          },
        }
    ],
    grid: {
        show: true,
        xaxis: {
            lines: {
                show: true,
            },
        },
        yaxis: {
            lines: {
                show: true,
            },
        },
        padding: {
            top: 0,
            right: 10,
            bottom: 15,
            left: 10,
        },
    },
    legend: {
        show: true,
        horizontalAlign: "center",
        offsetX: 0,
        offsetY: -5,
        markers: {
            width: 9,
            height: 9,
            radius: 6,
        },
        itemMargin: {
            horizontal: 10,
            vertical: 0,
        },
    },
    plotOptions: {
        bar: {
            columnWidth: "30%",
            barHeight: "100%",
        },
    },
    colors: ["#5596f7","#695eef"],
    tooltip: {
        shared: true,
        y: [{
            formatter: function (y) {
                if (typeof y !== "undefined") {
                    return y.toFixed(0);
                }
                return y;
            },
        },
        {
            formatter: function (y) {
                if (typeof y !== "undefined") {
                    return  y.toFixed(2) + "Minutes";
                }
                return y;
            },
        },
        {
            formatter: function (y) {
                if (typeof y !== "undefined") {
                    return y.toFixed(0) + " Sales";
                }
                return y;
            },
        },
        ],
    },
};

export let dailyTotalOptions = {
    series: [  
        {
            name: "Total",
            data: [],
        },
    ],
    chart: {
        type: "area",
        height: 320,
        zoom: {
            autoScaleYaxis: true,
        },
        toolbar: {
            show: false,
        },
    },
    dataLabels: {
        enabled: false,
    },
    
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [20, 100, 100, 100],
        },
    },
    markers: {
        size: 0,
        style: "hollow",
    },
    xaxis: {
        categories: [],
        axisTicks: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
    },
    grid: {
        show: true,
        xaxis: {
            lines: {
                show: true,
            },
        },
        yaxis: {
            lines: {
                show: true,
            },
        },
        padding: {
            top: 0,
            right: -2,
            bottom: 15,
            left: 10,
        },
    },
    legend: {
        show: true,
        horizontalAlign: "center",
        offsetX: 0,
        offsetY: -5,
        markers: {
            width: 9,
            height: 9,
            radius: 6,
        },
        itemMargin: {
            horizontal: 10,
            vertical: 0,
        },
    },
    plotOptions: {
        bar: {
            columnWidth: "40%",
            barHeight: "70%",
        },
    },
    colors: linechartcustomerColors,
    tooltip: {
        shared: true,
        y: [{
            formatter: function (y) {
                if (typeof y !== "undefined") {
                    return y.toFixed(0);
                }
                return y;
            },
        },
        {
            formatter: function (y) {
                if (typeof y !== "undefined") {
                    return  y.toFixed(2) + "SAR";
                }
                return y;
            },
        },
        {
            formatter: function (y) {
                if (typeof y !== "undefined") {
                    return y.toFixed(0) + " Sales";
                }
                return y;
            },
        },
        ],
    },
};
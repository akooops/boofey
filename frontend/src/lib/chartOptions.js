export let CanteensOptions = {
    series: [  
        
    ],
    colors:['#E16F28', '#E1A228'],
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



export function Toggle(){

}



export let dailyTotalOptions = {
    series: [  
        {
            name: "Total",
            data: [],
        },
    ],
    colors:['#E16F28', '#E1A228'],
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
    // colors: linechartcustomerColors,
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
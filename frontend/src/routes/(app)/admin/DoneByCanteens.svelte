<script>
    import { PathGetDoneByCanteens} from "$lib/api/paths"
    import { redirector } from "$lib/api/auth";
	import { onMount } from "svelte";
	import Progress from "$lib/components/Progress.svelte";
    import ApexCharts from 'apexcharts'

    let canteensData = []
    let chartSpace
    let chart
    onMount(async () => {
        chart = new ApexCharts(chartSpace,options);
        chart.render();

        let res = await fetch(PathGetDoneByCanteens(),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            }
        })
        redirector(res)

        canteensData = (await res.json()).data 

        let proccessedData = prepareCanteenDate()
        options.xaxis.categories = proccessedData.categories
        options.series[0].data = proccessedData.values

        chart.updateOptions(options)
    })


    function prepareCanteenDate(){

        let categories = []
        let values = []

        for(let canteenData of canteensData){
            values.push(canteenData.count)
            categories.push(canteenData.canteen.name)
        }

        return {categories,values}

    }

    let options = {
        series: [  
            {
                name: "Meals",
                type: "bar",
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
            curve: "straight",
            dashArray: [0, 0, 8],
            width: [2, 0, 2.2],
        },
        fill: {
        },
        markers: {
            size: [0, 0, 0],
            strokeWidth: 2,
            hover: {
                size: 4,
            },
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
                        return "$" + y.toFixed(2) + "k";
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



</script>


<div class="col-xl-8">
    <div class="card">
        <div class="card-header border-0 align-items-center d-flex">
            <h4 class="card-title mb-0 flex-grow-1">Done By Canteens</h4>
            <div>
                <button type="button" class="btn btn-soft-secondary btn-sm">
                    ALL
                </button>
                <button type="button" class="btn btn-soft-secondary btn-sm">
                    1M
                </button>
                <button type="button" class="btn btn-soft-secondary btn-sm">
                    6M
                </button>
                <button type="button" class="btn btn-soft-primary btn-sm">
                    1Y
                </button>
            </div>
        </div><!-- end card header -->


        <div class="card-body p-0 pb-2">
            <div class="w-100">
                <!-- <div id="customer_impression_charts" data-colors='["--vz-info", "--vz-primary", "--vz-danger"]' class="apex-charts" dir="ltr"></div> -->
                <div bind:this={chartSpace}></div>
            </div>
        </div><!-- end card body -->
    </div><!-- end card -->
</div><!-- end col -->
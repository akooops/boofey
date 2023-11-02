<script>
    import { PathGetDashDailyTotal} from "$lib/api/paths"
    import { redirector } from "$lib/api/auth";
	import { onMount } from "svelte";
	import Progress from "$lib/components/Progress.svelte";
    import ApexCharts from 'apexcharts'
    import {dailyTotalOptions} from "$lib/chartOptions.js"
    import {loadDefaultDate,getDatesFromRange} from "$lib/init/initFlatpickr.js"


    let DailyTotalData = []
    let chartSpace
    let chart
    let range = "last7days"
    let start_date = ""
    let end_date = ""
    let selector
    let pending = false
    onMount(async () => {
        chart = new ApexCharts(chartSpace,dailyTotalOptions);
        chart.render();
        render()


      
    })


    function prepareDate(){

        let categories = []
        let values = []

        for(let day of DailyTotalData){
            values.push(day.total)
            categories.push(day.date)
        }

        return {categories,values}

    }

    function changeRange(newRange){
        if(range == newRange) return;
        range = newRange

        if(range == "custom" && start_date == "" && end_date == ""){
            let currentDate = new Date();
            let pastDate = new Date();
            pastDate.setDate(currentDate.getDate() - 7);

            loadDefaultDate(selector,[pastDate,currentDate])

            selector._flatpickr.config.maxDate = new Date();
            selector._flatpickr.config.onClose.push(applyRange);
        }

        render();
    }

    async function render(){
        pending = true


        let res = await fetch(PathGetDashDailyTotal({range,start_date,end_date}),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            }
        })
        redirector(res)
        DailyTotalData = (await res.json()).data 

        let proccessedData = prepareDate()
        dailyTotalOptions.xaxis.categories = proccessedData.categories
        dailyTotalOptions.series[0].data = proccessedData.values
        pending = false
        chart.updateOptions(dailyTotalOptions)


    }

    function applyRange(){
        [start_date,end_date] = getDatesFromRange(selector.value)

       render()
    }

</script>


<div class="col-xl-12">
    <div class="card">
        <div class="card-header border-0 align-items-center d-flex">
            <h4 class="card-title mb-0 flex-grow-1">Daily Total</h4>
            <div class="me-1 " class:d-none={range != "custom"}>
                <form action="javascript:void(0);">
                    <div class="row g-3 mb-0 align-items-center">
                        <div class="col-sm-auto">
                            <div class="input-group input-group-sm">
                                <input type="text" class="form-control border-1  dash-filter-picker "  data-provider="flatpickr" data-range-date="true" data-date-format="d M, Y"  bind:this={selector} >
                                <div class="input-group-text bg-primary border-primary text-white">
                                    <i class="ri-calendar-2-line"></i>
                                </div>
                            </div>
                        </div>
                        <!--end col-->
                        <!--end col-->
                    </div>
                    <!--end row-->
                </form>
            </div>
            <div>
                
                <button type="button" class="btn btn-soft-secondary btn-sm" class:active={range == "custom"} on:click={() => changeRange("custom")}>
                    Custom
                </button>
                <button type="button" class="btn btn-soft-secondary btn-sm" class:active={range == "last7days"} on:click={() => changeRange("last7days")}>
                    7D
                </button>
                <button type="button" class="btn btn-soft-secondary btn-sm" class:active={range == "last28days"} on:click={() => changeRange("last28days")}>
                    28D
                </button>
              
            </div>
                
        </div><!-- end card header -->


        <div class="card-body p-3 pb-2">
            <div class="w-100">
                <!-- <div id="customer_impression_charts" data-colors='["--vz-info", "--vz-primary", "--vz-danger"]' class="apex-charts" dir="ltr"></div> -->
                <div class:d-none={pending} bind:this={chartSpace}></div>
                {#if pending}
                <div class="text-center">
                    <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#695eef,secondary:#73dce9" style="width:120px;height:120px"></lord-icon>
                </div>
                {/if}
            </div>
        </div><!-- end card body -->
    </div><!-- end card -->
</div><!-- end col -->
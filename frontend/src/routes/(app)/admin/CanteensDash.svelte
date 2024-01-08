<script>
    import { PathGetDoneByCanteens,PathGetCanteens,PathGetAvgByCanteens} from "$lib/api/paths"
    import { redirector } from "$lib/api/auth";
	import { onMount } from "svelte";
	import Progress from "$lib/components/Progress.svelte";
    import ApexCharts from 'apexcharts'
    import {CanteensOptions} from "$lib/chartOptions.js"
    import {loadDefaultDate,getDatesFromRange} from "$lib/init/initFlatpickr.js"
    import DashPagination from "./DashPagination.svelte"
    import DashPerPage from "./DashPerPage.svelte";
import DashSearch from "./DashSearch.svelte";


    let canteensData = []
    let chartSpace
    let chart
    let canteens = []
    let selectedCanteen
    let range = "last7days"
    let start_date = ""
    let end_date = ""
    let selector
    let averageCheck = true 
    let doneCheck = true
    let canteensPagination
    let page = 1 
    let perPage = 10
    let searchQuery = ""
    let pending = false
    onMount(async () => {
        chart = new ApexCharts(chartSpace,CanteensOptions);
        chart.render();
        await getCanteens()

        await render()
        chart.updateOptions(CanteensOptions)
    })


    async function getDoneByCanteens(){
        if (!JSON.parse(sessionStorage.getItem("permissions")).includes("dashboards.doneByCanteens")) return;
        let res = await fetch(PathGetDoneByCanteens(selectedCanteen.id,{range,start_date,end_date}),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            }
        })
        redirector(res)

       let  data = (await res.json()).data.counts

        let values =  []
        let categories = []
        for(let obj of data){
           values.push(obj.count)
            categories.push(obj.date)
        }

        let index = 0

        if(JSON.parse(sessionStorage.getItem("permissions")).includes("dashboards.avgByCanteens")){
            index = 1
        }

        CanteensOptions.series[index] = {
            name: "Done",
            type: "line",
            data: values,            
        }
        CanteensOptions.yaxis[index] = {
            opposite: index == 1,
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
          }
        }

        CanteensOptions.xaxis.categories = categories
    }

    async function getAvgByCanteens(){
        if (!JSON.parse(sessionStorage.getItem("permissions")).includes("dashboards.avgByCanteens")) return;

        let res = await fetch(PathGetAvgByCanteens(selectedCanteen.id,{range,start_date,end_date}),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            }
        })
        redirector(res)

       let  data = (await res.json()).data.avgs

        let values =  []
        let categories = []
        for(let obj of data){
           values.push(obj.avg)
           categories.push(obj.date)

        }
        CanteensOptions.series[0] = {
            name: "Average",
            type: "line",
            data: values,
        }
        CanteensOptions.xaxis.categories = categories

        CanteensOptions.yaxis[0] = {
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
          }
        }

    }



    async function render(){
        pending = true
        await getDoneByCanteens()
        await getAvgByCanteens()
        pending = false
        chart.updateOptions(CanteensOptions)
    }



    async function getCanteens(){
        
        let res = await fetch(PathGetCanteens(null,{page,search:searchQuery}),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            }
        })
        redirector(res)

        let canteensResponse = await res.json() 
        canteens = canteensResponse.data.canteens
        canteensPagination = canteensResponse.pagination
        selectedCanteen = canteens[0]

    }


    function selectCanteen(canteen){
        if(selectedCanteen.id == canteen.id) return;
        selectedCanteen = canteen
        render()

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

    function applyRange(){
        [start_date,end_date] = getDatesFromRange(selector.value)

       render()
    }

    function toggleChart(name){
        if(name == "Average" && CanteensOptions.yaxis[1] != null){
            CanteensOptions.yaxis[1].opposite = !CanteensOptions.yaxis[1].opposite    
            chart.updateOptions(CanteensOptions)
        }
        chart.toggleSeries(name)

    }

    function changePerPage(e){
        perPage = e.detail
        getCanteens()

    }
    function changePage(e){
        page = e.detail
        getCanteens()

    }
    async function search(e){
        searchQuery = e.detail
        page = 1
        getCanteens()
    }

</script>
{#if canteens.length > 0}
<div class="col-xl-12">
    <div class="card">
        <div class="card-header border-0 align-items-center d-flex">
            <h4 class="card-title mb-0 flex-grow-1">{selectedCanteen?.name ? selectedCanteen.name : "No Canteen Selected"} <span data-bs-toggle="modal" data-bs-target="#selectCanteen"><a href="javascript:void(0);"  data-bs-toggle="tooltip" data-bs-original-title="Select" ><i class="ri-edit-2-line"></i></a></span></h4>
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
        


        <div class="card-body p-0 pb-2">
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("dashboards.avgByCanteens") && JSON.parse(sessionStorage.getItem("permissions")).includes("dashboards.doneByCanteens")}
            <div class="row ps-4 g-3 align-items-center justify-content-start">
                <!-- Switches Color -->
                <div class="form-check form-switch form-check-secondary  col-auto" >
                    <input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1" bind:checked={averageCheck} on:change={() => toggleChart("Average")}>
                    <label class="form-check-label" for="SwitchCheck1">Average</label>
                </div><!-- Switches Color -->
                <div class="form-check form-switch col-auto" >
                    <input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1" bind:checked={doneCheck} on:change={() => toggleChart("Done")}>
                    <label class="form-check-label" for="SwitchCheck1">Done</label>
                </div><!-- Switches Color -->

            </div>
            {:else}
            
            <h4 class="card-title mb-0 ps-3 flex-grow-1">{JSON.parse(sessionStorage.getItem("permissions")).includes("dashboards.avgByCanteens") ? "Avergage" : "Done"}</h4>
            {/if}
            <div class="w-100 p-1">
                <!-- <div id="customer_impression_charts" data-colors='["--vz-info", "--vz-primary", "--vz-danger"]' class="apex-charts" dir="ltr"></div> -->
                <div class:d-none={pending} bind:this={chartSpace}></div>
                {#if pending}
                <div class="text-center">
                    <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:120px;height:120px"></lord-icon>
                </div>
                {/if}
            </div>
            <div class="modal  fade" id="selectCanteen" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" style="display: none;" >

                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalgridLabel">Select Canteen</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                      
                        <div class="modal-body">
                          <!-- <div class="row mb-4">
                            
                            </div> -->
                            <DashSearch type={"Last Subscribed Students"} on:search={search}/>
                            
                            <div class="table-responsive table-card">
                                <table class="table table-nowrap table-centered align-middle mb-0">
                                    <thead class="bg-light text-muted">
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">School</th>
                                            <th scope="col">Action</th>
                                        </tr><!-- end tr -->
                                    </thead><!-- thead -->
                
                                    <tbody>
                                        {#each canteens as canteen}
                                        <tr class:bg-secondary-subtle={canteen.id == selectedCanteen?.id}>
                                            <td>{canteen.id}</td>
                                            <td>{canteen.name}</td>
                                            <td>
                                                <div class="d-flex gap-2 align-items-center">
                                                    <div class="flex-shrink-0">
                                                        <img src={canteen.school.logo.full_path} alt="" class="avatar-xs rounded-circle" />
                                                    </div>
                                                    <div class="flex-grow-1">
                                                        {canteen.school.name}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="hstack gap-3 flex-wrap">
                                                    <a href="javascript:void(0);" on:click={() => selectCanteen(canteen)} class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" data-bs-dismiss="modal"><i class="ri-check-line"></i></a>
                                                </div>
                                            </td>
                                        </tr><!-- end tr -->
                                        {/each} 
                                    </tbody><!-- end tbody -->
                                </table><!-- end table -->
                            </div>
                            <DashPagination {...canteensPagination} on:page={changePage}/>

                        </div>
                    </div>
                </div>
            </div>
        </div><!-- end card body -->
    </div><!-- end card -->
</div><!-- end col -->
{/if}



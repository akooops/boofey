<script>
    import { PathGetCanteensStatus} from "$lib/api/paths"
    import { redirector } from "$lib/api/auth";
	import { onMount } from "svelte";
	import Progress from "$lib/components/Progress.svelte";
    import DashPagination from "./DashPagination.svelte"
    import DashPerPage from "./DashPerPage.svelte";
    import DashSearch from "./DashSearch.svelte";

    let canteens = []
    let canteensPagination
    let page = 1
    let searchQuery = ""
    let perPage = 10
    onMount(async () => {
        getCanteensStatus()
    })
    function changePerPage(e){
        perPage = e.detail
        getCanteensStatus()

    }
    function changePage(e){
        page = e.detail
        getCanteensStatus()

    }

    async function getCanteensStatus(){
        let res = await fetch(PathGetCanteensStatus({page,perPage,searchQuery}),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            }
        })
        redirector(res)
        let canteensResponse = await res.json() 
        canteens = canteensResponse.data
        canteensPagination = canteensResponse.pagination

    }
    async function search(e){
        searchQuery = e.detail
        page = 1
        getCanteensStatus()
    }

</script>


    <div class="col-xl-4">
        <div class="card">
            <div class="card-header d-flex align-items-center">
                <h4 class="card-title flex-grow-1 mb-0">Canteens Status</h4>
                <div class="flex-shrink-0">
                    <DashPerPage on:perPage={changePerPage}/>
                </div>
            </div><!-- end cardheader -->
            <div class="card-body">
                <DashSearch type={"Last Subscribed Students"} on:search={search}/>

                <div class="table-responsive table-card">
                    <table class="table table-nowrap table-centered align-middle mb-0">
                        <thead class="bg-light text-muted">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Canteen</th>
                                <th scope="col">School</th>
                                <th scope="col">Status</th>
                            </tr><!-- end tr -->
                        </thead><!-- thead -->

                        <tbody>
                            {#each canteens as canteen}
                            <tr>
                                <td>{canteen.id}</td>
                                <td>{canteen.name}</td>
                                <td>
                                <img src={canteen.school.logo.full_path} class="avatar-xxs rounded-circle me-1" alt="">
                                <a href="" class="text-reset">{canteen.school.name}</a>
                                </td>
                                <td>
                                {#if canteen.status == "open"}
                                    <span class="badge bg-success-subtle text-success p-2">Open</span>
                                {:else}
                                    <span class="badge bg-danger-subtle text-danger p-2">Closed</span>
                                {/if}
                                </td>
                            </tr><!-- end tr -->
                            {/each} 
                        </tbody><!-- end tbody -->
                    </table><!-- end table -->
                </div>
                <DashPagination {...canteensPagination} on:page={changePage}/>


            </div><!-- end card body -->
        </div><!-- end card -->
    </div><!-- end col -->


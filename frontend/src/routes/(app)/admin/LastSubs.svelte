<script>
    import { PathGetLastSubs} from "$lib/api/paths"
    import { redirector } from "$lib/api/auth";
	import { onMount } from "svelte";
	import Progress from "$lib/components/Progress.svelte";
    import DashPagination from "./DashPagination.svelte"
	import DashPerPage from "./DashPerPage.svelte";

    let lastSubs = []
    let lastSubsPagination
    let page = 1
    let perPage = 10
    onMount(async () => {
      
        getLastSubs()
    })

    function changePerPage(e){
        perPage = e.detail
        getLastSubs()

    }
    function changePage(e){
        page = e.detail
        getLastSubs()

    }

    async function getLastSubs(){
        let res = await fetch(PathGetLastSubs({page,perPage}),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            }
        })
        redirector(res)
        let lastSubsResponse = await res.json()
        lastSubs = lastSubsResponse.data 
        lastSubsPagination = lastSubsResponse.pagination 
    }

</script>


    <div class="col-xl-8">
        <div class="card ">
            <div class="card-header d-flex align-items-center">
                <h4 class="card-title flex-grow-1 mb-0">Last Subscribed Students</h4>
                <div class="flex-shrink-0">
                    <DashPerPage on:perPage={changePerPage}/>
                </div>
            </div><!-- end cardheader -->
            <div class="card-body">
                <div class="table-responsive table-card">
                    <table class="table table-nowrap table-centered align-middle mb-0">
                        <thead class="bg-light text-muted">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Student</th>
                                <th scope="col" style="width: 30%;">Progress</th>
                                <th scope="col">Package</th>
                                <th scope="col" style="width: 10%;">Started At</th>
                            </tr><!-- end tr -->
                        </thead><!-- thead -->

                        <tbody>
                            {#each lastSubs as sub}
                            <tr>
                                <td>{sub.id}</td>
                                <td>
                                    <img src={sub.student.image.full_path} class="avatar-xxs rounded-circle me-1" alt="">
                                    <a href="" class="text-reset">{sub.student.fullname}</a>
                                </td>
                                <td>
                                    <Progress now={sub.balance} max={sub.days}/>
                                </td>
                                <td>
                                <img src={sub.package.school.full_path} class="avatar-xxs rounded-circle me-1" alt="">
                                <a href="" class="text-reset">{sub.package.school.name} - {sub.package.name}</a>
                                </td>
                                <td class="text-muted">{sub.started_at}</td>
                            </tr><!-- end tr -->
                            {/each} 
                        </tbody><!-- end tbody -->
                    </table><!-- end table -->
                </div>
                <DashPagination {...lastSubsPagination} on:page={changePage}/>

            </div><!-- end card body -->
        </div><!-- end card -->
    </div><!-- end col -->


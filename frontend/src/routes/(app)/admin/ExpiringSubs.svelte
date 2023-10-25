<script>
    import { PathGetExpiringSubs} from "$lib/api/paths"
    import { redirector } from "$lib/api/auth";
	import { onMount } from "svelte";
	import Progress from "$lib/components/Progress.svelte";
    import DashPagination from "./DashPagination.svelte"
	import DashPerPage from "./DashPerPage.svelte";

    let expiringSubs = []
    let expiringSubsPagination
    let page = 1
    let perPage = 10
    onMount(async () => {
        getExpiringStudents()

    })


    function changePerPage(e){
        perPage = e.detail
        getExpiringStudents()

    }
    function changePage(e){
        page = e.detail
        getExpiringStudents()

    }

    async function getExpiringStudents(){
        let res = await fetch(PathGetExpiringSubs({page,perPage}),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            }
        })
        redirector(res)
        let expiringSubsResponse = await res.json() 
        expiringSubs = expiringSubsResponse.data 
        expiringSubsPagination = expiringSubsResponse.pagination 
    }

</script>


    <div class="col-xl-7">
        <div class="card">
            <div class="card-header d-flex align-items-center">
                <h4 class="card-title flex-grow-1 mb-0">Expiring Soon Students</h4>
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
                            {#each expiringSubs as sub}
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
                <DashPagination {...expiringSubsPagination} on:page={changePage}/>


            </div><!-- end card body -->
        </div><!-- end card -->
    </div><!-- end col -->


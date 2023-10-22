<script>
    import { PathGetLastSubs} from "$lib/api/paths"
    import { redirector } from "$lib/api/auth";
	import { onMount } from "svelte";
	import Progress from "$lib/components/Progress.svelte";

    let lastSubs = []

    onMount(async () => {
        let res = await fetch(PathGetLastSubs(),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            }
        })
        redirector(res)

        lastSubs = (await res.json()).data 

    })

</script>


    <div class="col-xl-6">
        <div class="card ">
            <div class="card-header d-flex align-items-center">
                <h4 class="card-title flex-grow-1 mb-0">Last Subscribed Students</h4>
                <div class="flex-shrink-0">
                    <a href="javascript:void(0);" class="btn btn-soft-info btn-sm">Export Report</a>
                </div>
            </div><!-- end cardheader -->
            <div class="card-body">
                <div class="table-responsive table-card">
                    <table class="table table-nowrap table-centered align-middle mb-0">
                        <thead class="bg-light text-muted">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Student</th>
                                <th scope="col">Progress</th>
                                <th scope="col">Package</th>
                                <th scope="col" style="width: 10%;">Started At</th>
                            </tr><!-- end tr -->
                        </thead><!-- thead -->

                        <tbody>
                            {#each lastSubs as student}
                            <tr>
                                <td>{student.id}</td>
                                <td>
                                    <img src="assets/images/users/avatar-1.jpg" class="avatar-xxs rounded-circle me-1" alt="">
                                    <a href="javascript: void(0);" class="text-reset">{student.fullname}</a>
                                </td>
                                <td>
                                    <Progress now={student.active_subscription.balance} max={student.active_subscription.days}/>
                                </td>
                                <td>
                                 {student.active_subscription.package.name}
                                </td>
                                <td class="text-muted">{student.active_subscription.started_at}</td>
                            </tr><!-- end tr -->
                            {/each} 
                        </tbody><!-- end tbody -->
                    </table><!-- end table -->
                </div>


            </div><!-- end card body -->
        </div><!-- end card -->
    </div><!-- end col -->


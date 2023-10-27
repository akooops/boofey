<script>
    import { PathGetAbsentStudents} from "$lib/api/paths"
    import { redirector } from "$lib/api/auth";
	import { onMount } from "svelte";
	import Progress from "$lib/components/Progress.svelte";
    import DashPagination from "./DashPagination.svelte"
	import DashPerPage from "./DashPerPage.svelte";
    let absentStudents = []
    let absentStudentsPagination
    let page = 1
    let perPage = 10

    onMount(async () => {
     
        getAbsentStudents()

    })

    async function getAbsentStudents(){
        let res = await fetch(PathGetAbsentStudents({page,perPage}),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            }
        })
        redirector(res)
        let absentStudentsResponse = await res.json() 
        absentStudents = absentStudentsResponse.data 
        absentStudentsPagination = absentStudentsResponse.pagination 

    }

    function changePage(e){
        page = e.detail
        getAbsentStudents()
    }
    function changePerPage(e){
        perPage = e.detail
        getAbsentStudents()

    }


</script>


    <div class="col-xl-5">
        <div class="card ">
            <div class="card-header d-flex align-items-center">
                <h4 class="card-title flex-grow-1 mb-0">Absent Students</h4>
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
                                <th scope="col">Parent</th>
                                <th scope="col">School</th>
                            </tr><!-- end tr -->
                        </thead><!-- thead -->

                        <tbody>
                            {#each absentStudents as student}
                            <tr>
                                <td>{student.id}</td>
                                <td>
                                    <img src={student.image.full_path} class="avatar-xxs rounded-circle me-1" alt="">
                                    <a href="" class="text-reset">{student.fullname}</a>
                                </td>
                                <td>
                                    <img src={student.father.user.profile.image.full_path} class="avatar-xxs rounded-circle me-1" alt="">
                                    <a href="" class="text-reset">{student.father.user.profile.fullname}</a>
                                </td>
                                <td>
                                <img src={student.school.logo.full_path} class="avatar-xxs rounded-circle me-1" alt="">
                                <a href="" class="text-reset">{student.school.name}</a>
                                </td>
                            </tr><!-- end tr -->
                            {/each} 
                        </tbody><!-- end tbody -->
                    </table><!-- end table -->
                </div>
                <DashPagination {...absentStudentsPagination} on:page={changePage}/>


            </div><!-- end card body -->
        </div><!-- end card -->
    </div><!-- end col -->


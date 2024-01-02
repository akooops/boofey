<script>
    import { getContext } from "svelte"
    import {translation} from "$lib/translation.js"
    import { goto } from '$app/navigation';

    export let queueStudent

    let {queueStudentStore} = getContext("queueStudentStore")
    
    function setQueueStudent(){
        $queueStudentStore = JSON.parse(JSON.stringify(queueStudent));
    }




</script>


<div class="col-xxl-2 col-xl-2 col-lg-3  col-sm-4   col-xs-6">
    <div class="card card-animate p-3 py-2"   role="button">
        <div class="row g-0">
                <div class="card-body text-center">
                    <div class="avatar-md mb-3 mx-auto">
                        <img src={queueStudent.student.image.full_path} alt="" id="candidate-img" class="avatar-md rounded-circle">
                    </div>
                    <p class="text-muted mb-0 fs-6">#{queueStudent.number}</p>
                    <h5 id="candidate-name" class="mb-1 text-truncate">{queueStudent.student.fullname}</h5>
                    <p class="text-muted mb-0 fs-6">Started at : {queueStudent.started_at}</p>
                    <div class="d-flex gap-2  mt-4 flex-wrap">
                        {#if JSON.parse(sessionStorage.getItem("permissions")).includes("queueStudents.exit.simplified")}
                            <span  data-bs-toggle="modal" class="col-12" data-bs-target="#exitQueueStudent" on:click|stopPropagation={setQueueStudent} >
                                <button type="button" class="btn  col-12 text-start btn-soft-success btn-label  waves-effect waves-light">
                                    <i class="ri-logout-box-r-line label-icon align-middle fs-16 me-2"></i> Exit Queue
                                </button>
                            </span>
                        {/if}
                      
                    </div>
                </div>
        </div>
    </div>
    <!-- end card -->
</div>
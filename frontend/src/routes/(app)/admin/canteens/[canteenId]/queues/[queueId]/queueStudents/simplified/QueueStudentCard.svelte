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


<div class="col-xxl-3 col-xl-4  col-lg-5  col-sm-6   col-xs-12">
    <div class="card card-animate p-3 py-2"   role="button">
        <div class="row g-0">
                <div class="card-body text-center">
                    <div class="avatar-md mb-3 mx-auto">
                        <img src={queueStudent.student.image.full_path} alt="" id="candidate-img" class="avatar-md rounded-circle">
                    </div>

                    <h5 id="candidate-name" class="mb-1 text-truncate">{queueStudent.student.fullname}</h5>
                    <p class="text-muted mb-0 fs-6">Started at : {queueStudent.started_at}</p>
                    <div class="d-flex gap-2  mt-4 flex-wrap">

                        <span  data-bs-toggle="modal" class="col-12" data-bs-target="#exitQueueStudent" on:click|stopPropagation={setQueueStudent} >
                            <button type="button" class="btn  col-12 text-start btn-soft-success btn-label  waves-effect waves-light">
                                <i class="ri-logout-box-r-line label-icon align-middle fs-16 me-2"></i> Exit Queue
                            </button>
                        </span>

                        <span  data-bs-toggle="modal" class="col-12" data-bs-target="#viewQueueStudentModal" on:click|stopPropagation={setQueueStudent} >
                            <button type="button"  class="col-12 btn text-start btn-soft-secondary btn-label waves-effect waves-light" >
                                <i class="ri-eye-fill label-icon align-middle fs-16 me-2"></i> View Student
                            </button>
                        </span>

                        <span  data-bs-toggle="modal" class="col-12" data-bs-target="#deleteQueueStudentModal" on:click|stopPropagation={setQueueStudent} >
                            <button type="button"  class="col-12 btn text-start btn-soft-danger btn-label waves-effect waves-light">
                                <i class="ri-delete-bin-line label-icon align-middle fs-16 me-2"></i> Delete
                            </button>
                        </span>                        
                    </div>
                </div>
        </div>
    </div>
    <!-- end card -->
</div>
<script>
    import { getContext } from "svelte"
    import { goto } from '$app/navigation';

    export let queueStudent


    let {queueStudentStore} = getContext("queueStudentStore")
    
    function setQueueStudent(){
        $queueStudentStore = JSON.parse(JSON.stringify(queueStudent));
    }




</script>

<tr scope="row">
    <td>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1" >
        </div>
    </td>
    <td>{queueStudent.id}</td>
    <td>
        <div class="d-flex gap-2 align-items-center">
            <div class="flex-shrink-0">
                <img src={queueStudent.student.image.full_path} alt="" class="avatar-xs rounded-circle" />
            </div>
            <div class="flex-grow-1">
                {queueStudent.student.fullname}
            </div>
        </div>
    </td>
    <td>{queueStudent.started_at}</td>
    <td>{queueStudent.synced_at}</td>
    <td>
    {#if queueStudent.exited_at}
    {queueStudent.exited_at}
    {:else}
    <span class="badge bg-danger-subtle text-danger">Not Out Yet</span>
    {/if}
    </td>

    <td>
        <div class="hstack gap-3">
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("queueStudents.exit")}
            <span data-bs-toggle="modal" data-bs-target="#exitQueueStudent" on:click={setQueueStudent}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Exit Queue" ><i class="ri-logout-box-r-line"></i></a></span>
            {/if}
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("queueStudents.show")}
            <span data-bs-toggle="modal" data-bs-target="#viewQueueStudentModal" on:click={setQueueStudent}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View" ><i class="ri-eye-fill"></i></a></span>
            {/if}
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("queueStudents.update")}
            <span data-bs-toggle="modal" data-bs-target="#editQueueStudentModal" on:click={setQueueStudent}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit" ><i class="ri-edit-2-line"></i></a></span>
            {/if}
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("queueStudents.destroy")}
            <span data-bs-toggle="modal" data-bs-target="#deleteQueueStudentModal" on:click={setQueueStudent}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"><i class="ri-delete-bin-line"></i></a></span>
            {/if}
        
        </div>
    </td>
</tr>
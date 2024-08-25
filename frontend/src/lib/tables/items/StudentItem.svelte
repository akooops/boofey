<script>
    import { getContext } from "svelte"
    import { goto } from '$app/navigation';
    import { invalidate } from '$app/navigation';
    import { redirector } from "$lib/api/auth";

    export let student

    let notified = false
    let {studentStore} = getContext("studentStore")
    
    function setStudent(){
        $studentStore = JSON.parse(JSON.stringify(student));
    }

    let subsToolTip
    function openSubs(){
        let toolTipInstance = bootstrap.Tooltip.getOrCreateInstance(subsToolTip)
        goto(`/admin/students/${student.id}/subscriptions`)
        toolTipInstance.hide()
    }

    async function notifyStudent(){
        let res = await fetch(`https://backend.boofey.app/api/admin/students/${student.id}/notify-parent`,{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            },
            method:"POST",
        })
        redirector(res)

        res = await res.json()
        if(res.status == "success") {
            // invalidate("students:refresh")
            notified = true
        }else {
        }
    }


</script>

<tr scope="row">
    <td>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1" >
        </div>
    </td>
    <td>{student.id}</td>
    <td>
        <div class="d-flex gap-2 align-items-center">
            <div class="flex-shrink-0">
                <img src={student.image.full_path} alt="" class="avatar-xs rounded-circle" />
            </div>
            <div class="flex-grow-1">
                {student.fullname}
            </div>
        </div>
    </td>
    <td>
        <div class="d-flex gap-2 align-items-center">
            <div class="flex-shrink-0">
                <img src={student.father.user.profile.image.full_path} alt="" class="avatar-xs rounded-circle" />
            </div>
            <div class="flex-grow-1">
                {student.father.user.profile.fullname}
            </div>
        </div>
    </td>
    <td>
        <span class="badge 
        {student.subscribedStatus == 'Active Subscription' 
            ? 'bg-success-subtle text-success' 
            : student.subscribedStatus == 'Preactive Subscription' || student.subscribedStatus == 'Inactive Subscription'
                ? 'bg-warning-subtle text-warning' 
                : 'bg-danger-subtle text-danger'}">{student.subscribedStatus}</span>
    </td>
    <td>
        <div class="d-flex gap-2 align-items-center">
            <div class="flex-shrink-0">
                <img src={student.school.logo.full_path} alt="" class="avatar-xs rounded-circle" />
            </div>
            <div class="flex-grow-1">
                {student.school.name}
            </div>
        </div>
    </td>
    <td>
        {#if student.division}
        {student.division.name}
        {:else}
        <span class="badge bg-danger-subtle text-danger">No Division</span>
        {/if}
    </td>
    <td>{student.className}</td>

    <td>
        <div class="hstack gap-3 flex-wrap">
            <!-- <span data-bs-toggle="modal"><a href="/students/{student.id}/subscriptions" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Subscribtion" ><i class="ri-money-dollar-circle-line"></i></a></span> -->
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("students.notify-parent") && student.face_id == null && notified == false}
            <span on:click={notifyStudent}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Notify" ><i class="ri-notification-3-line"></i></a></span>
            {/if}
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("students.otp")}
                <span data-bs-toggle="modal" data-bs-target="#ViewQrStudentModal" on:click={setStudent}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Qr Code" ><i class="ri-qr-code-line"></i></a></span>
            {/if}
            <span on:click={openSubs}><a bind:this={subsToolTip} href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Subscribtion" ><i class="ri-money-dollar-circle-line"></i></a></span>
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("students.show")}
                <span data-bs-toggle="modal" data-bs-target="#viewStudentModal" on:click={setStudent}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View" ><i class="ri-eye-fill"></i></a></span>
            {/if}
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("students.update")}
                <span data-bs-toggle="modal" data-bs-target="#editStudentModal" on:click={setStudent}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit" ><i class="ri-edit-2-line"></i></a></span>
            {/if}
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("students.destroy")}
                <span data-bs-toggle="modal" data-bs-target="#deleteStudentModal" on:click={setStudent}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"><i class="ri-delete-bin-line"></i></a></span>
            {/if}
        </div>
    </td>
</tr>
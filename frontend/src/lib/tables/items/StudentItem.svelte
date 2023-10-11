<script>
    import { getContext } from "svelte"
    import { goto } from '$app/navigation';

    export let student


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
        {#if student.subscribed}
        <span class="badge bg-success-subtle text-success">Subscribed</span>
        {:else}
        <span class="badge bg-danger-subtle text-danger">Not Subscribed</span>
        {/if}
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
    <td>{student.className}</td>

    <td>
        <div class="hstack gap-3 flex-wrap">
            <!-- <span data-bs-toggle="modal"><a href="/students/{student.id}/subscriptions" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Subscribtion" ><i class="ri-money-dollar-circle-line"></i></a></span> -->
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
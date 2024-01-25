<script>
    import { getContext } from "svelte"
    import { goto } from '$app/navigation';
    import {translation} from "$lib/translation.js"
	import { onMount } from "svelte";
    import { page } from '$app/stores';


    export let student


    let {studentStore} = getContext("studentStore")
    
    function setStudent(){
        $studentStore = JSON.parse(JSON.stringify(student));
    }

    let subsToolTip
    async function openSubs(){
        let toolTipInstance = bootstrap.Tooltip.getOrCreateInstance(subsToolTip)        
        // goto(`/students/2/subscriptions`)
        goto(`/students/${student.id}/subscriptions`)
        toolTipInstance.hide()
    }

    let editBtn

    onMount(() => {
        initToolTip(studentsPage)

        // if($page.url.searchParams.get("noFace")){
        //     if($page.url.searchParams.get("id") == student.id){
        //         editBtn.click()
        //     }
        // }
        
        state = $page.url.searchParams.get("subscribed")
        if(state != null){
            subscribed = state == "true" ? "subscribed" : "not subscribed"
        }

    
        
        // InitFlatPickr()
    })



</script>

<tr scope="row">
    <td>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1" >
        </div>
    </td>
    <td >{student.id}</td>
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
        {#if student.subscribed}
        <span class="badge bg-success-subtle text-success">{translation.subscribed[localStorage.getItem("language")]}</span>
        {:else}
        <span class="badge bg-danger-subtle text-danger">{translation.notSubscribed[localStorage.getItem("language")]}</span>
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
    <td>{student.class}</td>
    <td>{localStorage.getItem("language") == "ar" ? student.classNameAr : student.className}</td>

    <td>
        <div class="hstack gap-3 flex-wrap">
            <span data-bs-toggle="modal" data-bs-target="#ViewQrStudentModal" on:click={setStudent}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="{translation.qrCode[localStorage.getItem("language")]}" ><i class="ri-qr-code-line"></i></a></span>
            <span on:click={openSubs}><a bind:this={subsToolTip} href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="{translation.subscription[localStorage.getItem("language")]}" ><i class="ri-money-dollar-circle-line"></i></a></span>
            <span data-bs-toggle="modal" data-bs-target="#viewStudentModal" on:click={setStudent}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="{translation.view[localStorage.getItem("language")]}" ><i class="ri-eye-fill"></i></a></span>
            <span data-bs-toggle="modal" data-bs-target="#editStudentModal" on:click={setStudent} bind:this={editBtn}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="{translation.edit[localStorage.getItem("language")]}" ><i class="ri-edit-2-line"></i></a></span>
            <span data-bs-toggle="modal" data-bs-target="#deleteStudentModal" on:click={setStudent}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="{translation.delete[localStorage.getItem("language")]}"><i class="ri-delete-bin-line"></i></a></span>
        </div>
    </td>
</tr>
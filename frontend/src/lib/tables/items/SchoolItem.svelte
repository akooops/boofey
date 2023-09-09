<script>
    import { getContext } from "svelte"
    import { goto } from '$app/navigation';

    export let school


    let {schoolStore} = getContext("schoolStore")
    
    function setSchool(){
        $schoolStore = JSON.parse(JSON.stringify(school));
    }

    let yearToolTip
    function openAcademicYears(){
        let toolTipInstance = bootstrap.Tooltip.getOrCreateInstance(yearToolTip)
        goto(`schools/${school.id}/academicYears`)
        toolTipInstance.hide()
    }

</script>

<tr scope="row">
    <td>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1" >
        </div>
    </td>
    <td>{school.id}</td>
    <td>
        <div class="d-flex gap-2 align-items-center">
            <div class="flex-shrink-0">
                <img src={school.logo.full_path} alt="" class="avatar-xs rounded-circle" />
            </div>
            <div class="flex-grow-1">
                {school.name}
            </div>
        </div>
    </td>

    <td>
        <div class="hstack gap-3 flex-wrap">
            <span on:click={openAcademicYears}><a bind:this={yearToolTip} href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Academic Years" ><i class="ri-calendar-2-fill"></i></a></span>
            <span data-bs-toggle="modal" data-bs-target="#viewSchoolModal" on:click={setSchool}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View" ><i class="ri-eye-fill"></i></a></span>
            <span data-bs-toggle="modal" data-bs-target="#editSchoolModal" on:click={setSchool}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit" ><i class="ri-edit-2-line"></i></a></span>
            <span data-bs-toggle="modal" data-bs-target="#deleteSchoolModal" on:click={setSchool}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"><i class="ri-delete-bin-line"></i></a></span>
        
        </div>
    </td>
</tr>
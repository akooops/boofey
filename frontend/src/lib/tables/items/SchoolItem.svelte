<script>
import { getContext } from "svelte"

    export let school
    let {schoolStore} = getContext("schoolStore")
    
    function setPermission(){
        $schoolStore = JSON.parse(JSON.stringify(school));
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
            <span data-bs-toggle="modal" data-bs-target="#viewSchoolModal" on:click={setPermission}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View" ><i class="ri-eye-fill"></i></a></span>
            <span data-bs-toggle="modal" data-bs-target="#editSchoolModal" on:click={setPermission}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit" ><i class="ri-edit-2-line"></i></a></span>
            <span data-bs-toggle="modal" data-bs-target="#deleteSchoolModal" on:click={setPermission}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"><i class="ri-delete-bin-line"></i></a></span>
        </div>
    </td>
</tr>
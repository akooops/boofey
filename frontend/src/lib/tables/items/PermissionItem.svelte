<script>
import { getContext } from "svelte"

    export let permission
    let {permissionStore} = getContext("permissionDelete")
    
    function deletePermission(){
        $permissionStore = permission
    }

</script>

<tr scope="row">
    <td>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1" >
        </div>
    </td>
    <td>{permission.id}</td>
    <td>{permission.name}</td>
    <td>
        <div class="hstack gap-3 flex-wrap">
            <span><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View" ><i class="ri-eye-fill"></i></a></span>
            <span><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit" ><i class="ri-edit-2-line"></i></a></span>
            <span data-bs-toggle="modal" data-bs-target="#deletePermissionModal" on:click={deletePermission}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"><i class="ri-delete-bin-line"></i></a></span>
        </div>
    </td>
</tr>
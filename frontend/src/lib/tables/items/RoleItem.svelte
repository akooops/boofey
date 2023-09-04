<script>
    import { getContext } from "svelte"
    let {roleStore} = getContext("roleDelete")
    
    export let role 
    function deleteRole(){
        $roleStore = role
    }

</script>
<tr scope="row">
    <td>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1" >
        </div>
    </td>
    <td>{role.id}</td>
    <td>{role.name}</td>
    <td>
        <div class="hstack gap-3 flex-wrap">
            <a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View" ><i class="ri-eye-fill"></i></a>
            <a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit" ><i class="ri-edit-2-line"></i></a>
            <span data-bs-toggle="modal" data-bs-target="#deleteRoleModal" on:click={deleteRole}><a href="" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"  on:click={deleteRole}><i class="ri-delete-bin-line"></i></a></span>
        </div>
    </td>
</tr>
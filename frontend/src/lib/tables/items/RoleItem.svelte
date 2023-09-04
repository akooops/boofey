<script>
    import { getContext } from "svelte"
    
    export let role 

    let {roleStore} = getContext("roleStore")
    function setRole(){
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
            <span data-bs-toggle="modal" data-bs-target="#viewRoleModal" on:click={setRole}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View" ><i class="ri-eye-fill"></i></a></span>
            <a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit" ><i class="ri-edit-2-line"></i></a>
            <span data-bs-toggle="modal" data-bs-target="#deleteRoleModal" on:click={setRole}><a href="" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"  ><i class="ri-delete-bin-line"></i></a></span>
        </div>
    </td>
</tr>
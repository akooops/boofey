<script>
    import { getContext } from "svelte"
    
    export let role 

    let {roleStore} = getContext("roleStore")
    function setRole(){
        $roleStore = JSON.parse(JSON.stringify(role))
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
        <div class="hstack gap-3">
            
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("roles.show")}
            <span data-bs-toggle="modal" data-bs-target="#viewRoleModal" on:click={setRole}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View" ><i class="ri-eye-fill"></i></a></span>
            {/if}
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("roles.update")}
            <span data-bs-toggle="modal" data-bs-target="#editRoleModal" on:click={setRole}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit" ><i class="ri-edit-2-line"></i></a></span>
            {/if}
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("roles.destroy")}
            <span data-bs-toggle="modal" data-bs-target="#deleteRoleModal" on:click={setRole}><a href="" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"  ><i class="ri-delete-bin-line"></i></a></span>
            {/if}
        </div>
    </td>
</tr>
<script>
    import { getContext } from "svelte";

    import { PathUpdateRole } from "$lib/api/paths";
    import {onMount} from "svelte"
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import { page } from '$app/stores';
    import { redirector } from "$lib/api/auth";

    let {roleStore} = getContext("roleStore")

    let close
    let permissions = []
    let roleName = ""
    let allChecked = false
    let errors
let loading = false
    async function save(){
loading = true
        errors = {}
        let selectedPermissions = []
        for(let permission of permissions){
            if(permission.checked){
                selectedPermissions.push(permission.id)
            }
        }
        
        let formData = new FormData()
        formData.append("name",roleName)
        formData.append("permissions",JSON.stringify(selectedPermissions))

        let res = await fetch(PathUpdateRole($roleStore.id),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            },
            method:"POST",
            body:formData
        })
        redirector(res)

        res = await res.json()
        loading = false
        if(res.status == "success"){
            close.click()
            let text = `Edited ${roleName} ` 
            toast(text,"success")
            invalidate("roles:refresh")
            reset()
        }else {
            errors = res.errors
        }


    }

    function checkAll(){
        allChecked = permissions.every((permission) => permission.checked === true); 
    }
    function checkAllToggle(e){
        permissions = permissions.map((permission) => {
            return {
                ...permission,
                checked:e.target.checked
            }
        })
        allChecked = e.target.checked
    }




    roleStore.subscribe(() => {
        allChecked = false
        roleName = $roleStore.name
        if($page?.data?.rolesResponse?.data?.permissions == undefined || $roleStore.permissions == undefined) return;
        permissions = $page.data.rolesResponse.data.permissions.map((permission) => {
            return {
                checked:$roleStore.permissions.some(rolePermission => {
                    return rolePermission.id == permission.id
                }),
                ...permission

            }
        })

        checkAll()
    
    })

    function reset(){
        errors = {}
    }

    </script>
    
    
    <div class="modal  fade" id="editRoleModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" on:hidden.bs.modal={reset}>
        <div class="modal-dialog modal-dialog-centered" >
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Add Role</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" >
                    {#if loading }
                    <div class="text-center">
                        <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:120px;height:120px"></lord-icon>
                    </div>
                    {/if}
                    <form  on:submit|preventDefault={save} class:d-none={loading}>
                        <div class="row g-3">
    
                                <div>
                                    <label for="firstName" class="form-label">Role Name</label>
                                    <input type="text" class="form-control" id="firstName" placeholder="Enter Role name" bind:value={roleName}>
                                </div>
                                {#if errors?.name}
                                <strong class="text-danger ms-1 my-2">{errors.name[0]}</strong>
                                {/if}
                                <label for="firstName" class="form-label">Assign Permissions</label>
                                <div class="row">
                                    <div class="table-responsive">
                                        <table class="table table-hover align-end table-nowrap mb-0 border-top">
                                            <thead class="table-light">
                                                <tr>
                                                    <th scope="col" style="width: 25px;">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" id="checkAll" value="option1" checked={allChecked} on:change={checkAllToggle}>
                                                        </div>
                                                    </th>
                                                    <th scope="col">ID</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Guard</th>
                                                </tr>
                                            </thead>
                                            <tbody class="list">
                                                {#each permissions as permission}
                                                    <tr scope="row">
                                                        <td>
                                                            <div class="form-check">
                                                                <input bind:checked={permission.checked} on:change={checkAll} class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1" >
                                                            </div>
                                                        </td>
                                                        <td>{permission.id}</td>
                                                        <td>{permission.name}</td>
                                                        <td>{permission.guard_name}</td>
                                                    </tr>
                                                {/each}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
    
    
                                <div class="hstack gap-2 justify-content-end">
                                    <button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal" bind:this={close}>Close</button>
                                    <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save">
                                </div>
                        </div><!--end row-->
                    </form>
                </div>
            </div>
        </div>
    </div>
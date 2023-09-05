<script>
    import { PathAddRole } from "$lib/api/paths";
    import {onMount} from "svelte"
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';

    
    let modal
    let roleName
    let close
    export let permissions = []
    async function save(){
        
        let selectedPermissions = []
        for(let permission of permissions){
            if(permission.checked){
                selectedPermissions.push(permission.id)
            }
        }
        
        let formData = new FormData()
        formData.append("name",roleName)
        formData.append("permissions",JSON.stringify(selectedPermissions))

        let res = await (await fetch(PathAddRole(),{
        method:"POST",
        body:formData
        })).json()

        if(res.status == "success"){
            close.click()
            let text = `Added ${roleName} as a new role` 
            toast(text,"success")
            invalidate("roles:refresh")
        }

    }
    onMount(() => {
        permissions = permissions.map((permission) => {
            return {
                checked:false,
                ...permission
            }
        })
    })
    </script>
    
    
    <div class="modal  fade" id="addRoleModal" bind:this={modal} tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" >
        <div class="modal-dialog modal-dialog-centered" >
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Add Role</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form  on:submit={save}>
                        <div class="row g-3">
    
                                <div>
                                    <label for="firstName" class="form-label">Role Name</label>
                                    <input type="text" class="form-control" id="firstName" placeholder="Enter Role name" bind:value={roleName}>
                                </div>
                                <label for="firstName" class="form-label">Assign Permissions</label>
                                <div class="row">
                                    <div class="table-responsive">
                                        <table class="table table-hover align-end table-nowrap mb-0 border-top">
                                            <thead class="table-light">
                                                <tr>
                                                    <th scope="col" style="width: 25px;">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" id="checkAll" value="option1">
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
                                                                <input bind:checked={permission.checked} class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1" >
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
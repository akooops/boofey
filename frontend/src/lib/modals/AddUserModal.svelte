<script>
    import { PathAddUser } from "$lib/api/paths";
    import {onMount} from "svelte"
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';

    let close
    let username
    let form 
    export let roles = []
    
    async function save(){
        // console.log(role)

        let formData = new FormData(form)
        console.log(formData)
    
        let res = await (await fetch(PathAddUser(),{
            method:"POST",
            body:formData
        })).json()
        if(res.status == "success") {
            close.click()
            let text = `Added ${username} as a new user` 
            toast(text,"success")
            invalidate("users:refresh")
        }

        
    }
    </script>
    
    
    <div class="modal  fade" id="addUserModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" >
        <div class="modal-dialog modal-dialog-centered" >
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Add User</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form  on:submit|preventDefault={save} bind:this={form}>
                        <div class="row g-3">
    
                                <div class="col-lg-12">
                                    <label for="username" class="form-label" >Username</label>
                                    <input type="text" name="username" class="form-control" id="username" placeholder="Enter Username name" bind:value={username} >
                                </div>
                                <div class="col-xxl-6">
                                    <div>
                                        <label for="firstName" class="form-label">First Name</label>
                                        <input type="text" name="firstname" class="form-control" id="firstName" placeholder="Enter Firstname">
                                    </div>
                                </div>
                                <!--end col-->
                                <div class="col-xxl-6">
                                    <div>
                                        <label for="lastName" class="form-label">Last Name</label>
                                        <input type="text" name="lastname" class="form-control" id="lastName" placeholder="Enter Lastname">
                                    </div>
                                </div>
                                <div class="col-xxl-6">
                                    <label for="email" class="form-label">Email</label>
                                    <input type="email" name="email" class="form-control" id="email" placeholder="Enter your Email">
                                </div>
                                <div class="col-xxl-6">
                                    <label for="phone" class="form-label">Phone</label>
                                    <input type="tel" name="phone" class="form-control" id="phone" placeholder="Enter your Phone no.">
                                </div>
                                <div class="col-xxl-6">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" name="password" class="form-control" id="password"  placeholder="Enter Password" />
                                </div>
                                <div class="col-xxl-6">
                                    <label for="passwordconfirm" class="form-label">Confirm Password</label>
                                    <input type="password" name="password_confirmation" class="form-control" id="passwordconfirm"  placeholder="Confirm Password" />
                                </div>

                                <div class="col-lg-12">
                                    <label for="role" class="form-label">Role</label>
                                    <select class="form-select" name="role_id" id="role" aria-label="Default select example">
                                        <option disabled selected value> -- select an role -- </option>
                                        {#each roles as role}
                                        <option value={role.id}>{role.name}</option>
                                        {/each}
                                    </select>
                                </div>
    
                                <div class="hstack gap-2 justify-content-end">
                                    <button type="button" class="btn btn-light" data-bs-dismiss="modal" bind:this={close}>Close</button>
                                    <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save">
                                </div>
                        </div><!--end row-->
                    </form>
                </div>
            </div>
        </div>
    </div>
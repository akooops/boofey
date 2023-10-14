<script>
    import { PathAddUser } from "$lib/api/paths";
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import { redirector } from "$lib/api/auth";
	import Password from "$lib/components/Password.svelte";

    
    let close
    let username
    let form 
    let selectRole
    export let roles = []
    let errors 
    let verified = true

    async function save(){
        errors = {}
        let formData = new FormData(form)
        formData.set("verified",verified)
    
        let res = await fetch(PathAddUser(),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            },
            method:"POST",
            body:formData
        })
        redirector(res)

        res = await res.json()
        if(res.status == "success") {
            close.click()
            let text = `Added ${username} as a new user` 
            toast(text,"success")
            invalidate("users:refresh")
            reset()
        }else {
            errors = res.errors
            console.log(errors)
        }

        

        
    }

    function reset(){
        form.reset()
        selectRole.selectedIndex = 0
        errors = {}
        verified = true
    }


    </script>
    
    
    <div class="modal  fade" id="addUserModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"  on:hidden.bs.modal={reset}>
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
                                    {#if errors?.username}
                                    <strong class="text-danger ms-1 my-2">{errors.username[0]}</strong>
                                    {/if}
                                </div>

                                <div class="col-xxl-6">
                                    <div>
                                        <label for="firstName" class="form-label">First Name</label>
                                        <input type="text" name="firstname" class="form-control" id="firstName" placeholder="Enter Firstname">
                                        {#if errors?.firstname}
                                        <strong class="text-danger ms-1 my-2">{errors.firstname[0]}</strong>
                                        {/if}
                                    </div>
                                </div>
                                <!--end col-->
                                <div class="col-xxl-6">
                                    <div>
                                        <label for="lastName" class="form-label">Last Name</label>
                                        <input type="text" name="lastname" class="form-control" id="lastName" placeholder="Enter Lastname">
                                        {#if errors?.lastname}
                                        <strong class="text-danger ms-1 my-2">{errors.lastname[0]}</strong>
                                        {/if}
                                    </div>
                                </div>
                                <div class="col-xxl-6">
                                    <label for="email" class="form-label">Email</label>
                                    <input type="email" name="email" class="form-control" id="email" placeholder="Enter your Email">
                                    {#if errors?.email}
                                    <strong class="text-danger ms-1 my-2">{errors.email[0]}</strong>
                                    {/if}
                                </div>
                                <div class="col-xxl-6">
                                    <label for="phone" class="form-label">Phone</label>
                                    <input type="tel" name="phone" class="form-control phone-input" id="phone" placeholder="Enter your Phone no.">
                                    {#if errors?.phone}
                                    <strong class="text-danger ms-1 my-2">{errors.phone[0]}</strong>
                                    {/if}
                                </div>
                                <div class="col-xxl-6">
                                    <label for="password" class="form-label">Password</label>
                                    <Password name={"password"} placeholder={"Enter Password"}/>
                                    {#if errors?.password}
                                    <strong class="text-danger ms-1 my-2">{errors.password[0]}</strong>
                                    {/if}
                                </div>
                                <div class="col-xxl-6">
                                    <label for="passwordconfirm" class="form-label">Confirm Password</label>
                                    <Password name={"password_confirmation"} placeholder={"Confirm Password"}/>
                                    {#if errors?.password_confirmation}
                                    <strong class="text-danger ms-1 my-2">{errors.password_confirmation[0]}</strong>
                                    {/if}
                                </div>

                                <div class="row ps-3 g-3">
                                    <!-- Switches Color -->
                                    <div class="form-check form-switch col" >
                                        <input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1" bind:checked={verified}>
                                        <label class="form-check-label" for="SwitchCheck1">Verified</label>
                                    </div><!-- Switches Color -->

                                </div>

                                <div class="col-lg-12">
                                    <label for="role" class="form-label">Role</label>
                                    <select class="form-select" name="role_id" id="role" aria-label="Default select example" bind:this={selectRole}>
                                        <option disabled selected value> -- select an role -- </option>
                                        {#each roles as role}
                                        <option value={role.id}>{role.name}</option>
                                        {/each}
                                    </select>
                                    {#if errors?.role_id}
                                    <strong class="text-danger ms-1 my-2">{errors.role_id[0]}</strong>
                                    {/if}
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
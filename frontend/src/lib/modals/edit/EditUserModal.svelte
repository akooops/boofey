<script>
    import { getContext } from "svelte";
    import { PathUpdateUser } from "$lib/api/paths";
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import { page } from '$app/stores';

    let {userStore} = getContext("userStore")
    
    let close
    let form 
    let firstName = ""
    let lastName = ""
    let password = ""
    let roles = []
    let role
    let editPassword = false;
    
    async function save(){

        let formData = new FormData(form)
        if(password == "" || editPassword == false){
            formData.delete("password")
        }
        let res = await (await fetch(PathUpdateUser($userStore.id),{
            method:"POST",
            body:formData
        })).json()
        if(res.status == "success") {
            close.click()
            let text = `Edited ${$userStore.username} ` 
            toast(text,"success")
            invalidate("users:refresh")
        }

        
    }

    userStore.subscribe(() => {
        firstName = $userStore?.profile?.firstname
        lastName = $userStore?.profile?.lastname
        roles = $page.data.usersResponse.data.roles
        password = ""
        if(!$userStore?.roles?.length) return;
        console.log("role")
        role = $userStore?.roles[0]
        console.log(role)
    }) 



    </script>
    
    
    <div class="modal  fade" id="editUserModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" >
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
                                    <input type="text" name="username" class="form-control" id="username" placeholder="Enter Username name" bind:value={$userStore.username} >
                                </div>
                                <div class="col-xxl-6">
                                    <div>
                                        <label for="firstName" class="form-label">First Name</label>
                                        {#if $userStore?.profile?.firstname}
                                        <input type="text" name="firstname" class="form-control" id="firstName" placeholder="Enter Firstname" bind:value={firstName}>
                                        {/if}
                                    </div>
                                </div>
                                <!--end col-->
                                <div class="col-xxl-6">
                                    <div>
                                        <label for="lastName" class="form-label">Last Name</label>
                                        <input type="text" name="lastname" class="form-control" id="lastName" placeholder="Enter Lastname" bind:value={lastName}>
                                    </div>
                                </div>
                                <div class="col-xxl-6">
                                    <label for="email" class="form-label">Email</label>
                                    <input type="email" name="email" class="form-control" id="email" placeholder="Enter your Email" bind:value={$userStore.email}>
                                </div>
                                <div class="col-xxl-6">
                                    <label for="phone" class="form-label">Phone</label>
                                    <input type="tel" name="phone" class="form-control" id="phone" placeholder="Enter your Phone no." bind:value={$userStore.phone}>
                                </div>
                               
                                <div class="mb-2 col-lg-12">
                                    <input class="form-check-input" type="checkbox" id="formCheck1" bind:checked={editPassword}>
                                    <label class="form-check-label" for="formCheck1">
                                        Edit Password 
                                    </label>
                                </div>
                                {#if editPassword}
                                <div class="col-xxl-6">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" name="password" class="form-control" id="password"  placeholder="Enter Password" bind:value={password}/>
                                </div>
                                {/if}
                                {#if editPassword}
                                <div class="col-xxl-6">
                                    <label for="passwordconfirm" class="form-label">Confirm Password</label>
                                    <input type="password" name="password_confirmation" class="form-control" id="passwordconfirm"  placeholder="Confirm Password" />
                                </div>
                                {/if}

                                <div class="col-lg-12">
                                    <label for="role" class="form-label">Role</label>
                                    {#if role}
                                    <select class="form-select" name="role_id" id="role" aria-label="Default select example" bind:value={role.id}>
                                        <!-- <option disabled selected value> -- select an role -- </option> -->
                                        {#each roles as role (role.id)}
                                            <option value={role.id}>{role.name}</option>
                                        {/each}
                                    </select>
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
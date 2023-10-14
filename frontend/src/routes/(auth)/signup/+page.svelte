<script>
    import {PathRegister} from "$lib/api/paths.js"
    import { goto } from '$app/navigation';
	import { onMount } from "svelte";
    import {initApp} from "$lib/init/initApp.js"
	import Password from "$lib/components/Password.svelte";

    export let data;
    let form 
    let message = ""
    let errors 
    async function signup(){
        errors = {}
        message = ""
        let formData = new FormData(form)

        let res = await fetch(PathRegister(),{
            method:"POST",
            body:formData
        })

        let resJson = await res.json()
        if(resJson.status == "success") {
            localStorage.setItem("SID", `Bearer ${resJson.data.token}`);
            goto("/verification")   
        }else {
            if(res.status == 422){
                errors = resJson.errors
            }else {
                message = resJson.message
            }
        }


    }

    onMount(() => {
        Array.from(document.querySelectorAll("form .auth-pass-inputgroup")).forEach(function(e){Array.from(e.querySelectorAll(".password-addon")).forEach(function(r){r.addEventListener("click",function(r){var o=e.querySelector(".password-input");"password"===o.type?o.type="text":o.type="password"})})});
    })

</script>



            <div class="row justify-content-center">
                <div class="col-md-9 col-lg-7 col-xl-6">
                    <div class="card mt-4">

                        <div class="card-body p-4">
                            <div class="text-center mt-2">
                                <h5 class="text-primary">Welcome Back !</h5>
                                <p class="text-muted">Sign in to continue to Boofey.</p>
                            </div>
                            <div class="p-2 mt-4">
                                <form on:submit|preventDefault={signup} bind:this={form}>

                                    <div class="row g-3">
    
                                        <div class="col-lg-12">
                                            <label for="username" class="form-label" >Username</label>
                                            <input type="text" name="username" class="form-control" id="username" placeholder="Enter Username name" >
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
                                            <input type="tel" name="phone" class="form-control" id="phone" placeholder="Enter your Phone no.">
                                            {#if errors?.phone}
                                            <strong class="text-danger ms-1 my-2">{errors.phone[0]}</strong>
                                            {/if}
                                        </div>
                                        <div class="col-xxl-6">
                                            <label for="password" class="form-label">Password</label>
                                            <div class="position-relative auth-pass-inputgroup mb-3">
                                                <Password name={"password"} placeholder={"Enter password"}/>
                                                <button class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon"><i class="ri-eye-fill align-middle"></i></button>
                                            </div>
                                            {#if errors?.password}
                                            <strong class="text-danger ms-1 my-2">{errors.password[0]}</strong>
                                            {/if}
                                        </div>
                                        <div class="col-xxl-6">
                                            <label for="passwordconfirm" class="form-label">Confirm Password</label>
                                            <div class="position-relative auth-pass-inputgroup mb-3">
                                                <Password name={"password_confirmation"} placeholder={"Confirm password"}/>
                                                <button class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon"><i class="ri-eye-fill align-middle"></i></button>
                                            </div>
                                            {#if errors?.password_confirmation}
                                            <strong class="text-danger ms-1 my-2">{errors.password_confirmation[0]}</strong>
                                            {/if}
                                        </div>
                                        {#if message != ""}
                                        <strong class="text-danger ms-1 my-2">{message}</strong>
                                        {/if}
                                    <div class="mt-4">
                                        <button class="btn btn-info w-100" type="submit">Sign up</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <!-- end card body -->
                    </div>
                    <!-- end card -->

                    <div class="mt-4 text-center">
                        <p class="mb-0">Already have an account ? <a href="/signin" class="fw-semibold text-primary text-decoration-underline"> Signin </a> </p>
                    </div>

                </div>
            </div>
            <!-- end row -->
 
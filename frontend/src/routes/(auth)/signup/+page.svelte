<script>
    import {PathRegister} from "$lib/api/paths.js"
    import { goto } from '$app/navigation';
	import { onMount } from "svelte";
    import {initApp} from "$lib/init/initApp.js"
	import Password from "$lib/components/Password.svelte";
    import { phoneMask } from "$lib/inputMasks.js";
    import {translation} from "$lib/translation.js"


    export let data;
    let form 
    let message = ""
    let errors
    let loading = false
    async function signup(){
        loading = true
        errors = {}
        message = ""
        let formData = new FormData(form)
        formData.set("lang",localStorage.getItem("language"))

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
        
    loading = false
    }

    onMount(() => {
        phoneMask()


    })

</script>



<div class="row justify-content-center">
    <div class="col-md-9 col-lg-7 col-xl-6">
        <div class="card mt-4">

            <div class="card-body p-4">
                <div class="text-center mt-2">
                    <h5 class="text-primary">Welcome Back !</h5>
                    <p class="text-muted">Sign up to continue to Boofey.</p>
                </div>
                <div class="p-2 mt-4">
                    <form on:submit|preventDefault={signup} bind:this={form}>

                        <div class="row g-3">

                            <div class="col-lg-12">
                                <label for="username" class="form-label" >Username</label>
                                <input type="text" name="username" class="form-control" id="username" placeholder="Enter Username" >
                                {#if errors?.username}
                                <strong class="text-danger ms-1 my-2">{errors.username[0]}</strong>
                                {/if}
                            </div>

                            <div class="col-xxl-6">
                                <div>
                                    <label for="firstName" class="form-label">First Name</label>
                                    <input type="text" name="firstname" class="form-control" id="firstName" placeholder="Enter First Name">
                                    {#if errors?.firstname}
                                    <strong class="text-danger ms-1 my-2">{errors.firstname[0]}</strong>
                                    {/if}
                                </div>
                            </div>
                            <!--end col-->
                            <div class="col-xxl-6">
                                <div>
                                    <label for="lastName" class="form-label">Last Name</label>
                                    <input type="text" name="lastname" class="form-control" id="lastName" placeholder="Enter Last Name">
                                    {#if errors?.lastname}
                                    <strong class="text-danger ms-1 my-2">{errors.lastname[0]}</strong>
                                    {/if}
                                </div>
                            </div>
                            <div class="col-xxl-6">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" name="email" class="form-control" id="email" placeholder="Enter Email">
                                {#if errors?.email}
                                <strong class="text-danger ms-1 my-2">{errors.email[0]}</strong>
                                {/if}
                            </div>
                            <div class="col-xxl-6">
                                <label for="phone" class="form-label">Phone</label>
                                <input type="tel" name="phone" class="form-control" id="phone" placeholder="Enter Phone Number">
                                {#if errors?.phone}
                                <strong class="text-danger ms-1 my-2">{errors.phone[0]}</strong>
                                {/if}
                            </div>
                            <div class="col-lg-12">
                                <label for="phone" class="form-label">Identity Number</label>
                                <input type="text" name="identity_number" class="form-control" id="phoneedit" placeholder="Enter Identity no.">
                                {#if errors?.identity_number}
                                <strong class="text-danger ms-1 my-2">{errors.identity_number[0]}</strong>
                                {/if}
                            </div>
                            <div class="col-xxl-6">
                                <label for="password" class="form-label">Password</label>
                                <div class="position-relative auth-pass-inputgroup mb-3">
                                    <Password name={"password"} placeholder="Enter Password"/>
                                </div>
                                {#if errors?.password}
                                <strong class="text-danger ms-1 my-2">{errors.password[0]}</strong>
                                {/if}
                            </div>
                            <div class="col-xxl-6">
                                <label for="passwordconfirm" class="form-label">Confirm Password</label>
                                <div class="position-relative auth-pass-inputgroup mb-3">
                                    <Password name={"password_confirmation"} placeholder="Confirm Password"/>
                                </div>
                                {#if errors?.password_confirmation}
                                <strong class="text-danger ms-1 my-2">{errors.password_confirmation[0]}</strong>
                                {/if}
                            </div>
                            {#if message != ""}
                            <strong class="text-danger ms-1 my-2">{message}</strong>
                            {/if}
                        <div class="mt-4">
                            <button class="btn btn-info w-100 btn-load" type="submit" disabled={loading}>
                                {#if loading}
                                <span class="spinner-border " role="status"></span>
                                {:else}
                                Sign Up

                                {/if}                                        
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <!-- end card body -->
        </div>
        <!-- end card -->

        <div class="mt-4 text-center">
            <p class="mb-0">Already have an account ? <a href="/signin" class="fw-semibold text-primary text-decoration-underline"> Sign In </a> </p>
        </div>

    </div>
</div>
<!-- end row -->

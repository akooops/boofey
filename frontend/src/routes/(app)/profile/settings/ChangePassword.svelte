<script>

    import { PathChangePass } from "$lib/api/paths";
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import { redirector } from "$lib/api/auth";
    import Password from "$lib/components/Password.svelte"
    import {translation} from "$lib/translation.js"

    let form
    let errors
let loading = false

    async function save(){
loading = true
        errors = {}
    
        let formData = new FormData(form)    
        formData.set("lang",localStorage.getItem("language"))
        
        let res = await fetch(PathChangePass(),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            },
            method:"POST",
            body:formData
        })
        redirector(res)

        res = await res.json()
    
        if(res.status == "success") {
            let text = `Paswword changed successfully` 
            toast(text,"success")
            invalidate("profile:refresh")
            reset()
            
        }else {
            errors = res.errors
        }

    }

    function reset(){
        form.reset()
    }



</script>

<div class="tab-pane" id="changePassword" role="tabpanel">
    <form on:submit|preventDefault={save} bind:this={form}>
        <div class="row g-2">
            <div class="col-lg-4">
                <div>
                    <label for="oldpasswordInput" class="form-label">{translation.currentPass[localStorage.getItem("language")]}</label>
                    <Password name={"old_password"} placeholder={translation.enterCurrentPass[localStorage.getItem("language")]}/>
                    {#if errors?.old_password}
                        <strong class="text-danger ms-1 my-2">{errors.old_password[0]}</strong>
                    {/if}
                </div>
            </div>
            <!--end col-->
            <div class="col-lg-4">
                <div>
                    <label for="newpasswordInput" class="form-label">{translation.newPass[localStorage.getItem("language")]}</label>
                    <Password name={"password"} placeholder={translation.enterNewPass[localStorage.getItem("language")]}/>
                    {#if errors?.password}
                        <strong class="text-danger ms-1 my-2">{errors.password[0]}</strong>
                    {/if}
                </div>
            </div>
            <!--end col-->
            <div class="col-lg-4">
                <div>
                    <label for="confirmpasswordInput" class="form-label">{translation.confirmPassword[localStorage.getItem("language")]}</label>
                    <Password name={"password_confirmation"} placeholder={translation.enterPasswordConfirmation[localStorage.getItem("language")]}/>
                    {#if errors?.password}
                        <strong class="text-danger ms-1 my-2">{errors.password[0]}</strong>
                    {/if}
                </div>
            </div>
            <!--end col-->
            <div class="col-lg-12 mt-4">
                <div class="text-end">
                    <button type="submit" class="btn btn-info">{translation.changePass[localStorage.getItem("language")]}</button>
                </div>
            </div>
            <!--end col-->
        </div>
    </form>
   
</div>
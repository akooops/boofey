<script>

    import { PathChangePass } from "$lib/api/paths";
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import { redirector } from "$lib/api/auth";
    
    let form
    let errors

    async function save(){
        errors = {}
    
        let formData = new FormData(form)    
        
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
                    <label for="oldpasswordInput" class="form-label">Old Password</label>
                    <input type="password" class="form-control" id="oldpasswordInput" name="old_password" placeholder="Enter current password">
                    {#if errors?.old_password}
                        <strong class="text-danger ms-1 my-2">{errors.old_password[0]}</strong>
                    {/if}
                </div>
            </div>
            <!--end col-->
            <div class="col-lg-4">
                <div>
                    <label for="newpasswordInput" class="form-label">New Password</label>
                    <input type="password" class="form-control" name="password" id="newpasswordInput" placeholder="Enter new password">
                    {#if errors?.password}
                        <strong class="text-danger ms-1 my-2">{errors.password[0]}</strong>
                    {/if}
                </div>
            </div>
            <!--end col-->
            <div class="col-lg-4">
                <div>
                    <label for="confirmpasswordInput" class="form-label">Confirm Password</label>
                    <input type="password" class="form-control" name="password_confirmation" id="confirmpasswordInput" placeholder="Confirm password">
                    {#if errors?.password}
                        <strong class="text-danger ms-1 my-2">{errors.password[0]}</strong>
                    {/if}
                </div>
            </div>
            <!--end col-->
            <div class="col-lg-12 mt-4">
                <div class="text-end">
                    <button type="submit" class="btn btn-info">Change Password</button>
                </div>
            </div>
            <!--end col-->
        </div>
    </form>
   
</div>
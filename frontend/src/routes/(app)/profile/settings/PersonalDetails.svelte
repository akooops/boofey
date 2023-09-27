<script>
    import { PathUpdateProfile } from "$lib/api/paths";
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import { redirector } from "$lib/api/auth";
    

    export let user 
    let fileinput
    let form
    let errors

    function selectImage(e){
        user.profile.image.full_path = URL.createObjectURL(fileinput.files[0]);
    }

   
    async function save(){
        errors = {}
    
        let formData = new FormData(form)    
        
        let res = await fetch(PathUpdateProfile(),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            },
            method:"POST",
            body:formData
        })
        redirector(res)

        res = await res.json()
    
        if(res.status == "success") {
            let text = `Profile updated successfully` 
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

<div class="tab-pane active" id="personalDetails" role="tabpanel">
    <form  on:submit|preventDefault={save} bind:this={form}>
        <div class="row">
            <div class="col-xxl-3">
                <div class="text-center">
                    <div class="profile-user position-relative d-inline-block mx-auto  mb-4">
                        <img src={user?.profile?.image?.full_path} class="rounded-circle avatar-xl img-thumbnail user-profile-image" alt="user-profile-image">
                        <div class="avatar-xs p-0 rounded-circle profile-photo-edit">
                            <input id="profile-img-file-input" name="file" type="file" bind:this={fileinput} class="profile-img-file-input" on:change={selectImage}>
                            <label for="profile-img-file-input" class="profile-photo-edit avatar-xs">
                                <span class="avatar-title rounded-circle bg-light text-body">
                                    <i class="ri-camera-fill"></i>
                                </span>
                            </label>
                        </div>
                    </div>
                    <h5 class="fs-16 mb-1">{user?.profile.fullname}</h5>
                    <p class="text-muted mb-0">{user?.roles[0]?.name}</p>
                </div>
            </div>
            <div class="col-xxl-9 row">

                <div class="col-xxl-6">
                    <div class="mb-3">
                        <label for="firstnameInput" class="form-label">First Name</label>
                        <input type="text" class="form-control" id="firstnameInput" placeholder="Enter your firstname" name="firstname" bind:value={user.profile.firstname}>
                        {#if errors?.firstname}
                        <strong class="text-danger ms-1 my-2">{errors.firstname[0]}</strong>
                    {/if}
                    </div>
                </div>
                <!--end col-->
                <div class="col-xxl-6">
                    <div class="mb-3">
                        <label for="lastnameInput" class="form-label">Last Name</label>
                        <input type="text" class="form-control" id="lastnameInput" placeholder="Enter your lastname"name="lastname" bind:value={user.profile.lastname}>
                        {#if errors?.lastname}
                        <strong class="text-danger ms-1 my-2">{errors.lastname[0]}</strong>
                    {/if}
                    </div>
                </div>
                <!--end col-->
                <div class="col-lg-12">
                    <div class="mb-3 pb-2">
                        <label for="exampleFormControlTextarea" class="form-label">Description</label>
                        <textarea class="form-control" id="exampleFormControlTextarea" placeholder="Enter your description" bind:value={user.profile.description} name="description" rows="4"></textarea>
                        {#if errors?.description}
                        <strong class="text-danger ms-1 my-2">{errors.description[0]}</strong>
                    {/if}
                    </div>
                </div>
                <!--end col-->
                <div class="col-lg-12">
                    <div class="hstack gap-2 justify-content-end">
                        <button type="submit" class="btn btn-primary">Update</button>
                    </div>
                </div>
                
            </div>
            <!--end col-->
        </div>
        <!--end row-->
    </form>
</div>
<script>
    import { PathAddCanteenUser } from "$lib/api/paths";
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import { redirector } from "$lib/api/auth";
    import Accordion from "$lib/components/Accordion.svelte";
    import CanteenTableCollapse from "$lib/modals/collapses/CanteenTableCollapse.svelte";

    
    let couponName
    let close
    let form
    let errors
let loading = false
    let canteenId
    let resetCanteenUser
    export let userId
    async function save(){
loading = true
        errors = {}
    
        let formData = new FormData(form)    

        formData.set("canteen_id",canteenId)
        
        let res = await fetch(PathAddCanteenUser(userId),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            },
            method:"POST",
            body:formData
        })
        redirector(res)

        res = await res.json()
        loading = false
        if(res.status == "success") {
            close.click()
            let text = `Added a new canteen to User` 
            toast(text,"success")
            invalidate("canteenUsers:refresh")
            reset()
            
        }else {
            errors = res.errors
        }

    }

    function reset(){
        form.reset()
        onHold = false
        errors = {}
        resetCanteenUser()

    }



    </script>
    
    
    <div class="modal  fade" id="addCanteenUserModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"  on:hidden.bs.modal={reset}>
        <div class="modal-dialog modal-dialog-centered modal-lg" >
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Add Canteen to user</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                            <div class="modal-body" >
                {#if loading }
                <div class="text-center">
                    <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#695eef,secondary:#73dce9" style="width:120px;height:120px"></lord-icon>
                </div>
                {/if}

                <form  on:submit|preventDefault={save} bind:this={form} class:d-none={loading}>
                        <div class="row g-3">
                            <!-- <Accordion id={"parent"} title={"Student's Parent"}> -->
                                <div>
                                    <CanteenTableCollapse on:select={(e) => canteenId = e.detail.canteenUser.id} bind:resetCanteenUser />            
                                </div>
                                {#if errors?.canteen_id}
                                <strong class="text-danger ms-1 my-2">{errors.canteen_id[0]}</strong>
                                {/if}

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
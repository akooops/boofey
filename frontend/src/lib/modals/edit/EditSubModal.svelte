<script>
    import { PathUpdateSub } from "$lib/api/paths";
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import { redirector } from "$lib/api/auth";
    import {loadDefaultDate} from "$lib/init/initFlatpickr.js"
    import Accordion from "$lib/components/Accordion.svelte";
	import CouponTableCollapse from "../collapses/CouponTableCollapse.svelte";
    import {getContext} from "svelte"
    import { bill } from "$lib/utils.js";

    
    let close
    let form 
    let errors
    export let student
    export let packages = []
    
    let excludeFromCalc = false
    let {subStore} = getContext("subStore")

    async function save(){
    
        errors = {}
        let formData = new FormData(form)
    
        formData.set("exclude_from_calculation",$subStore.exclude_from_calculation)


        let res = await fetch(PathUpdateSub($subStore.id),{
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
            let text = `Successfuly edited ` 
            toast(text,"success")
            invalidate("subs:refresh")
            reset()
        }else {
            errors = res.errors
        }
    
    
    }

    function reset(){
        form.reset()
        
        errors = {}
        excludeFromCalc = false
    }

    subStore.subscribe(() => {
        
    })

    </script>
    
    
    <div class="modal  fade" id="editSubModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"  on:hidden.bs.modal={reset}>
        <div class="modal-dialog modal-dialog-centered" >
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Edit  Subscription</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form  on:submit|preventDefault={save} bind:this={form}>
                        <div class="row g-3">
                            <div class="row ps-3 g-3">
                                <!-- Switches Color -->
                                <div class="form-check form-switch col" >
                                    <input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1" bind:checked={$subStore.exclude_from_calculation}>
                                    <label class="form-check-label" for="SwitchCheck1">Exclude from calculation</label>
                                </div><!-- Switches Color -->

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
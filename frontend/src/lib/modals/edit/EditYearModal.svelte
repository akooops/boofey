<script>
    import { PathUpdateAcademicYear } from "$lib/api/paths";
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import {loadDefaultDate} from "$lib/init/initFlatpickr.js"
    import { getContext } from "svelte";

    
    let {yearStore} = getContext("yearStore")

    let close
    let form
    let from 
    let to

    async function save(){
    
        let formData = new FormData(form)
        formData.set("current",+$yearStore.current)

        let res = await (await fetch(PathUpdateAcademicYear($yearStore.id),{
            method:"POST",
            body:formData
        })).json()
    
        if(res.status == "success") {
            close.click()
            let text = `Edited #${$yearStore.id} to ${$yearStore.name}` 
            toast(text,"success")
            invalidate("years:refresh")
        }
    
    }


    yearStore.subscribe(() => {
        if(Object.keys($yearStore).length == 0) return;
        loadDefaultDate(from,$yearStore.from)
        loadDefaultDate(to,$yearStore.to)
    })


    </script>
    
    
    <div class="modal  fade" id="editYearModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" >
        <div class="modal-dialog modal-dialog-centered" >
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Edit Permission</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form  on:submit|preventDefault={save} bind:this={form}>
                        <div class="row g-3">
    
                                <div>
                                    <label for="yearName" class="form-label">Year Name</label>
                                    <input type="text" class="form-control" id="yearName" name="name" placeholder="Enter Year name" bind:value={$yearStore.name}>
                                </div>
                                <div class="col-xxl-6">
                                    <label for="from" class="form-label">From</label>
                                    <input type="text" name="from" class="form-control" data-provider="flatpickr" data-date-format="Y-m-d" id="from" bind:this={from}>
                                </div>
                                <div class="col-xxl-6">
                                    <label for="to" class="form-label">To</label>
                                    <input type="text" name="to" class="form-control" data-provider="flatpickr" data-date-format="Y-m-d"  bind:this={to} id="to">
                                </div>
                                <div>
                                    <div class="form-switch form-switch-success">
                                        <input class="form-check-input" type="checkbox" role="switch" id="currentCheck" bind:checked={$yearStore.current}>
                                        <label class="form-check-label" for="currentCheck">Current Year</label>
                                    </div>
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
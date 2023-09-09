<script>
    import { PathUpdateAcademicBreak } from "$lib/api/paths";
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import {loadDefaultDate} from "$lib/init/initFlatpickr.js"
    import { getContext } from "svelte";

    
    let breakStore = getContext("breakStore")

    let close
    let form
    let from 
    let to
    export let year

    async function save(){
    
        let formData = new FormData(form)

        let res = await (await fetch(PathUpdateAcademicBreak($breakStore.id),{
            method:"POST",
            body:formData
        })).json()
    
        if(res.status == "success") {
            close.click()
            let text = `Edited #${$breakStore.id} to ${$breakStore.name}` 
            toast(text,"success")
            invalidate("breaks:refresh")
        }
    
    }


    breakStore.subscribe(() => {
        if(Object.keys($breakStore).length == 0) return;
        loadDefaultDate(from,$breakStore.from)
        loadDefaultDate(to,$breakStore.to)
    })


    </script>
    
    
    <div class="modal  fade" id="editBreakModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" >
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
                                <label for="name" class="form-label">Acedemic Beak Name</label>
                                <input type="text" class="form-control" id="name" name="name" placeholder="Enter break name" bind:value={$breakStore.name}>
                            </div>
                            <div class="col-xxl-6">
                                <label for="from" class="form-label">From</label>
                                <input type="text" name="from" class="form-control" placeholder="Insert start date" data-provider="flatpickr"  data-minDate="{year.from}" data-maxDate="{year.to}" data-date-format="Y-m-d" id="from" bind:this={from}>
                            </div>
                            <div class="col-xxl-6">
                                <label for="to" class="form-label">To</label>
                                <input type="text" name="to" class="form-control" placeholder="Insert end date" data-provider="flatpickr" data-minDate="{year.from}" data-maxDate="{year.to}" data-date-format="Y-m-d" id="to" bind:this={to}>
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
<script>
    import { PathAddAcademicYear } from "$lib/api/paths";
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import {loadDefaultDate} from "$lib/init/initFlatpickr.js"
    import { redirector } from "$lib/api/auth";
    
    let yearName
    let close
    let form
    let from 
    let to 
    export let schoolId
    let current = false;
    let errors

    async function save(){
        errors = {}
    
        let formData = new FormData(form)    
        formData.set("current",+current)
        
        let res = await fetch(PathAddAcademicYear(schoolId),{
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
            let text = `Added ${yearName} as a new year` 
            toast(text,"success")
            invalidate("years:refresh")
            reset()
            
        }else {
            errors = res.errors
        }

    }

    function reset(){
        loadDefaultDate(from,Date.now())
        loadDefaultDate(to,Date.now())
        form.reset()
        errors = {}

    }



    </script>
    
    
    <div class="modal  fade" id="addYearModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"  on:hidden.bs.modal={reset}>
        <div class="modal-dialog modal-dialog-centered" >
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Add Year</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form   on:submit|preventDefault={save} bind:this={form}>
                        <div class="row g-3">
    
                                <div>
                                    <label for="yearName" class="form-label">Year Name</label>
                                    <input type="text" class="form-control" id="yearName" name="name" placeholder="Enter Year name" bind:value={yearName}>
                                    {#if errors?.name}
                                    <strong class="text-danger ms-1 my-2">{errors.name[0]}</strong>
                                    {/if}
                                </div>
                                <div class="col-xxl-6">
                                    <label for="from" class="form-label">From</label>
                                    <input type="text" name="from" class="form-control" data-provider="flatpickr" data-date-format="Y-m-d" id="from" bind:this={from}>
                                    {#if errors?.from}
                                    <strong class="text-danger ms-1 my-2">{errors.from[0]}</strong>
                                    {/if}
                                </div>
                                <div class="col-xxl-6">
                                    <label for="to" class="form-label">To</label>
                                    <input type="text" name="to" class="form-control" data-provider="flatpickr" data-date-format="Y-m-d" id="to" bind:this={to}>
                                    {#if errors?.to}
                                    <strong class="text-danger ms-1 my-2">{errors.to[0]}</strong>
                                    {/if}
                                </div>
                                <div>
                                    <div class="form-switch form-switch-success">
                                        <input class="form-check-input" name="current" type="checkbox" role="switch" id="currentCheck" bind:checked={current}>
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
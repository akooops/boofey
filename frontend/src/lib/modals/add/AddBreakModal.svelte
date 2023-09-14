<script>
    import {PathAddAcademicBreak} from "$lib/api/paths.js"
    import {toast} from "$lib/components/toast.js"
    import { invalidate } from '$app/navigation';
    import { getContext, onMount } from 'svelte';
    import {loadDefaultDate} from "$lib/init/initFlatpickr.js"
    import { redirector } from "$lib/api/auth";



    let breakName
    let close
    let from
    let to 
    let form
    export let year
    let breakStore  = getContext("breakStore")
    let errors 

    async function save(){
        // console.log(role)
        errors = {}

        
        let formData = new FormData(form)
        let res = await fetch(PathAddAcademicBreak(year.id),{
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
            let text = `Added ${breakName} as a new break` 
            toast(text,"success")
            invalidate("breaks:refresh")
            reset()
        }else {
            errors = res.errors
        }


        
    }

    breakStore.subscribe(() => {
        if(Object.keys($breakStore).length == 0) return;
        form?.reset()
        if($breakStore?.fromBtn){
            loadDefaultDate(from,$breakStore.from)
        }
    })

    function reset(){
        form?.reset()
        loadDefaultDate(from,Date.now())
        loadDefaultDate(to,Date.now())
        delete $breakStore?.fromBtn
        errors = {}

    }

 

</script>

<div class="modal  fade" id="addBreakModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" on:hidden.bs.modal={reset}>
    <div class="modal-dialog modal-dialog-centered" >
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalgridLabel">Add Academic Break</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form  on:submit|preventDefault={save} bind:this={form}>
                    <div class="row g-3">

                            <div>
                                <label for="name" class="form-label">Acedemic Beak Name</label>
                                <input type="text" class="form-control" id="name" name="name" placeholder="Enter break name" bind:value={breakName}>
                                {#if errors?.name}
                                <strong class="text-danger ms-1 my-2">{errors.name[0]}</strong>
                                {/if}
                            </div>
                            <div class="col-xxl-6">
                                <label for="from" class="form-label">From</label>
                                <input type="text" name="from" class="form-control" placeholder="Insert start date" data-provider="flatpickr"  data-minDate="{year.from}" data-maxDate="{year.to}" data-date-format="Y-m-d" id="from" bind:this={from}>
                                {#if errors?.from}
                                <strong class="text-danger ms-1 my-2">{errors.from[0]}</strong>
                                {/if}
                            </div>
                            <div class="col-xxl-6">
                                <label for="to" class="form-label">To</label>
                                <input type="text" name="to" class="form-control" placeholder="Insert end date" data-provider="flatpickr" data-minDate="{year.from}" data-maxDate="{year.to}" data-date-format="Y-m-d" id="to" bind:this={to}>
                                {#if errors?.to}
                                <strong class="text-danger ms-1 my-2">{errors.to[0]}</strong>
                                {/if}
                            </div>

                            <div class="hstack gap-2 justify-content-end">
                                <button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal" bind:this={close} on:click={reset}>Close</button>
                                <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save">
                            </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
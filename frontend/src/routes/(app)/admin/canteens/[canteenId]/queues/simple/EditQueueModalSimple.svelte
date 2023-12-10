<script>
    import { PathUpdateQueue } from "$lib/api/paths";
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';
    import { redirector } from "$lib/api/auth";
    import { getContext } from 'svelte';
    let {queueStore} = getContext("queueStore")

    
    
    let queueName
    let close
    let errors
let loading = false
    let selectType
    let form 
    let type = 0
    async function save(){
loading = true
        errors = {}
    
        let formData = new FormData(form)
    
        let res = await fetch(PathUpdateQueue($queueStore.id),{
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
            let text = `Successfuly Edited` 
            toast(text,"success")
            invalidate("queues:refresh")  
            reset()
        }else {
            errors = res.errors
        }
    
    
    }
    function reset(){    
        form.reset()
        // selectType.selectedIndex = 0
        errors = {}
    }
    queueStore.subscribe(() => {
        type = $queueStore.type
    })
    
    </script>
    
    
    <div class="modal  fade" id="editQueueModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"  on:hidden.bs.modal={reset}>
        <div class="modal-dialog modal-dialog-centered" >
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Start Queue</h5>
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

                            <div class="col-lg-12">
                                <label for="role" class="form-label">Type</label>
                                <select class="form-select" name="type" id="role" aria-label="Default select example" bind:this={selectType}  bind:value={type}>
                                    <option value={0}>Main Meal</option>
                                    <option value={1}>Snack</option>
                                </select>
                                {#if errors?.type}
                                <strong class="text-danger ms-1 my-2">{errors.type[0]}</strong>
                                {/if}
                            </div>

                            {#if errors?.["422"] }
                            <strong class="text-danger ms-1 my-2">{errors["422"]}</strong>
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
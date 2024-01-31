<script>
    import { getContext } from "svelte";
    import {formatTimestamp} from "$lib/utils.js"
    import ViewRow from "$lib/components/ViewRow.svelte"

    let {divisionStore} = getContext("divisionStore")

    

</script>

<div class="modal  fade" id="viewDivisionModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" >
    <div class="modal-dialog modal-dialog-centered" >
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalgridLabel">View Coupon</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
             
            <ViewRow>
               Name : <span class="fw-normal">{$divisionStore.name}</span>
            </ViewRow>
            <ViewRow>
                Arabic Name : <span class="fw-normal">{$divisionStore.name_ar}</span>
            </ViewRow>
            <ViewRow>
                Created at : <span class="fw-normal">{formatTimestamp($divisionStore.created_at)}</span>
            </ViewRow>
            <ViewRow>
                Updated at : <span class="fw-normal">{formatTimestamp($divisionStore.updated_at)}</span>
            </ViewRow>

                    <div class="hstack gap-2 justify-content-end">
                        <button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">Close</button>
                    </div>
            </div>
        </div>
    </div>
</div>
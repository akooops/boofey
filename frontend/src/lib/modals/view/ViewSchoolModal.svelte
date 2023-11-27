<script>
    import { getContext } from "svelte";
    import {formatTimestamp} from "$lib/utils.js"
    import ViewRow from "$lib/components/ViewRow.svelte"


    let {schoolStore} = getContext("schoolStore")

    

</script>

<div class="modal  fade" id="viewSchoolModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" >
    <div class="modal-dialog modal-dialog-centered" >
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalgridLabel">View School</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
             
                        <!-- Rounded Image -->
                        <img class="rounded avatar-xl mb-3 object-fit-cover" alt="School logo" width="200" src={$schoolStore?.logo?.full_path}>
                        <div class="d-flex mb-2">
                            <div class="flex-grow-1 d-flex align-items-center">
                                <div class="flex-shrink-0 me-3">
                                    <i class=" ri-arrow-right-s-line text-muted fs-16"></i>
                                </div>
                                <div class="flex-grow-1">
                                    <h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Name : <span class="fw-normal">{$schoolStore.name}</span></h6>
                                </div>
                            </div>
                        </div>
                        <ViewRow>
                            Arabic Name : <span class="fw-normal">{$schoolStore.name_ar}</span>
                         </ViewRow>
                        <div class="d-flex mb-2">
                            <div class="flex-grow-1 d-flex align-items-center">
                                <div class="flex-shrink-0 me-3">
                                    <i class=" ri-arrow-right-s-line text-muted fs-16"></i>
                                </div>
                                <div class="flex-grow-1">
                                    <h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Created at : <span class="fw-normal">{formatTimestamp($schoolStore.created_at)}</span></h6>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex mb-2">
                            <div class="flex-grow-1 d-flex align-items-center">
                                <div class="flex-shrink-0 me-3">
                                    <i class=" ri-arrow-right-s-line text-muted fs-16"></i>
                                </div>
                                <div class="flex-grow-1">
                                    <h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Updated at : <span class="fw-normal">{formatTimestamp($schoolStore.updated_at)}</span></h6>
                                </div>
                            </div>
                        </div>
                    <!--end row-->
                    <div class="hstack gap-2 justify-content-end">
                        <button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">Close</button>
                    </div>
            </div>
        </div>
    </div>
</div>
<script>
    import { getContext } from "svelte";
    import {formatTimestamp} from "$lib/utils.js"


    let breakStore  = getContext("breakStore")


    breakStore.subscribe(() => {

    })


</script>

<div class="modal  fade" id="viewBreakModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" >
    <div class="modal-dialog modal-dialog-centered" >
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalgridLabel">View Event</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
                
                    <div class="text-end">
                    {#if JSON.parse(sessionStorage.getItem("permissions")).includes("academicBreaks.update")}
                        <a href="#" class="btn btn-sm btn-soft-primary" id="edit-event-btn" data-id="edit-event"  data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#editBreakModal" role="button">Edit</a>
                    {/if}
                    </div>
                    <div class="d-flex mb-2">
                        <div class="flex-grow-1 d-flex align-items-center">
                            <div class="flex-shrink-0 me-3">
                                <i class=" ri-arrow-right-s-line text-muted fs-16"></i>
                            </div>
                            <div class="flex-grow-1">
                                <h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Break Name : <span class="fw-normal">{$breakStore?.name}</span></h6>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex mb-2">
                        <div class="flex-grow-1 d-flex align-items-center">
                            <div class="flex-shrink-0 me-3">
                                <i class=" ri-arrow-right-s-line text-muted fs-16"></i>
                            </div>
                            <div class="flex-grow-1">
                                <h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">From : <span class="fw-normal">{$breakStore?.from}</span></h6>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex mb-2">
                        <div class="flex-grow-1 d-flex align-items-center">
                            <div class="flex-shrink-0 me-3">
                                <i class=" ri-arrow-right-s-line text-muted fs-16"></i>
                            </div>
                            <div class="flex-grow-1">
                                <h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">To : <span class="fw-normal">{$breakStore?.to}</span></h6>
                            </div>
                        </div>
                    </div>
                        <div class="d-flex mb-2">
                            <div class="flex-grow-1 d-flex align-items-center">
                                <div class="flex-shrink-0 me-3">
                                    <i class=" ri-arrow-right-s-line text-muted fs-16"></i>
                                </div>
                                <div class="flex-grow-1">
                                    <h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Created at : <span class="fw-normal">{formatTimestamp($breakStore?.created_at)}</span></h6>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex mb-2">
                            <div class="flex-grow-1 d-flex align-items-center">
                                <div class="flex-shrink-0 me-3">
                                    <i class=" ri-arrow-right-s-line text-muted fs-16"></i>
                                </div>
                                <div class="flex-grow-1">
                                    <h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Updated at : <span class="fw-normal">{formatTimestamp($breakStore?.updated_at)}</span></h6>
                                </div>
                            </div>
                        </div>
                    <!--end row-->
                    <div class="hstack gap-2 justify-content-end">
                        <button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">Close</button>
                        {#if JSON.parse(sessionStorage.getItem("permissions")).includes("academicBreaks.destroy")}
                        <button type="button" class="btn btn-soft-danger" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#deleteBreakModal" id="btn-delete-event"><i class="ri-close-line align-bottom"></i> Delete</button>
                        {/if}
                    </div>

                
            </div>
        </div>
    </div>
</div>
<script>
    import { getContext } from "svelte";
    import {formatTimestamp} from "$lib/utils.js"


    let {permissionStore} = getContext("permissionStore")

    

</script>

<div class="modal  fade" id="viewPermissionModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" >
    <div class="modal-dialog modal-dialog-centered" >
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalgridLabel">View Permission</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
             
                        <div class="d-flex mb-2">
                            <div class="flex-grow-1 d-flex align-items-center">
                                <div class="flex-shrink-0 me-3">
                                    <i class=" ri-arrow-right-s-line text-muted fs-16"></i>
                                </div>
                                <div class="flex-grow-1">
                                    <h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Name : <span class="fw-normal">{$permissionStore.name}</span></h6>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex mb-2">
                            <div class="flex-grow-1 d-flex align-items-center">
                                <div class="flex-shrink-0 me-3">
                                    <i class=" ri-arrow-right-s-line text-muted fs-16"></i>
                                </div>
                                <div class="flex-grow-1">
                                    <h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Created at : <span class="fw-normal">{formatTimestamp($permissionStore.created_at)}</span></h6>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex mb-2">
                            <div class="flex-grow-1 d-flex align-items-center">
                                <div class="flex-shrink-0 me-3">
                                    <i class=" ri-arrow-right-s-line text-muted fs-16"></i>
                                </div>
                                <div class="flex-grow-1">
                                    <h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Updated at : <span class="fw-normal">{formatTimestamp($permissionStore.updated_at)}</span></h6>
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
<script>
    import { getContext } from "svelte";
    import {formatTimestamp} from "$lib/utils.js"



    let {userStore} = getContext("userStore")


</script>

<div class="modal  fade" id="viewUserModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" >
    <div class="modal-dialog modal-dialog-centered" >
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalgridLabel">View User</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
             
                        <div class="d-flex mb-2">
                            <div class="flex-grow-1 d-flex align-items-center">
                                <div class="flex-shrink-0 me-3">
                                    <i class=" ri-arrow-right-s-line text-muted fs-16"></i>
                                </div>
                                <div class="flex-grow-1">
                                    <h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Username : <span class="fw-normal">{$userStore.username}</span></h6>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex mb-2">
                            <div class="flex-grow-1 d-flex align-items-center">
                                <div class="flex-shrink-0 me-3">
                                    <i class=" ri-arrow-right-s-line text-muted fs-16"></i>
                                </div>
                                <div class="flex-grow-1">
                                    <h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Email : <span class="fw-normal">{$userStore.email}</span></h6>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex mb-2">
                            <div class="flex-grow-1 d-flex align-items-center">
                                <div class="flex-shrink-0 me-3">
                                    <i class=" ri-arrow-right-s-line text-muted fs-16"></i>
                                </div>
                                <div class="flex-grow-1">
                                    <h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Email : <span class="fw-normal">{$userStore.phone}</span></h6>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex mb-2">
                            <div class="flex-grow-1 d-flex align-items-center">
                                <div class="flex-shrink-0 me-3">
                                    <i class=" ri-arrow-right-s-line text-muted fs-16"></i>
                                </div>
                                <div class="flex-grow-1">
                                    <h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Created at : <span class="fw-normal">{formatTimestamp($userStore.created_at)}</span></h6>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex mb-2">
                            <div class="flex-grow-1 d-flex align-items-center">
                                <div class="flex-shrink-0 me-3">
                                    <i class=" ri-arrow-right-s-line text-muted fs-16"></i>
                                </div>
                                <div class="flex-grow-1">
                                    <h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Updated at : <span class="fw-normal">{formatTimestamp($userStore.updated_at)}</span></h6>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex mb-2">
                            <div class="flex-grow-1 d-flex align-items-center">
                                <div class="flex-shrink-0 me-3">
                                    <i class=" ri-arrow-right-s-line text-muted fs-16"></i>
                                </div>
                                <div class="flex-grow-1">
                                    <h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Roles {@html $userStore?.roles?.length > 0 ? "" : ': <span class="badge bg-warning">no roles</span>'}</h6>
                                </div>
                            </div>
                        </div>
                        {#if $userStore?.roles?.length > 0}
                        <div class="row mb-4">
                            <div class="table-responsive">
                                <table class="table table-hover align-end table-nowrap mb-0 border-top">
                                    <thead class="table-light">
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Name</th>
                                        </tr>
                                    </thead>
                                    <tbody class="list">
                                        {#each $userStore.roles || [] as role}
                                            <tr>
                                                <td>{role.id}</td>
                                                <td>{role.name}</td>
                                            </tr>
                                        {/each}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/if}
                    <!--end row-->
                    <div class="hstack gap-2 justify-content-end">
                        <button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">Close</button>
                    </div>
            </div>
        </div>
    </div>
</div>
<script>
    import { getContext } from "svelte";
    import {formatTimestamp} from "$lib/utils.js"
    import ViewRow from "$lib/components/ViewRow.svelte"

    let {parentStore} = getContext("parentStore")

    

</script>

<div class="modal  fade" id="viewParentModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" >
    <div class="modal-dialog modal-dialog-centered" >
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalgridLabel">View Parent</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
                <img class="rounded avatar-xl mb-3 object-fit-cover" alt="School logo" width="200" src={$parentStore?.user?.profile?.image?.full_path}>
             
                <ViewRow>
                    Username : <span class="fw-normal">{$parentStore?.user?.username}</span>
                </ViewRow>
                <ViewRow>
                    First Name : <span class="fw-normal">{$parentStore?.user?.profile?.firstname}</span>
                </ViewRow>
                <ViewRow>
                    Last Name : <span class="fw-normal">{$parentStore?.user?.profile?.lastname}</span>
                </ViewRow>
                <ViewRow>
                    Email : <span class="fw-normal">{$parentStore?.user?.email}</span>
                </ViewRow>
                <ViewRow>
                    Phone : <span class="fw-normal">{$parentStore?.user?.phone}</span>
                </ViewRow>
                <ViewRow>
                    Child : <span class="badge bg-primary">{$parentStore?.childrenCount}</span>
                </ViewRow>
                <ViewRow>
                    Children  {@html $parentStore?.students?.length > 0 ? "" : ': <span class="badge bg-warning">no children</span>'}
                </ViewRow>

                {#if $parentStore?.students?.length > 0}
                <div class="row mb-4">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle table-nowrap mb-0 border-top">
                            <thead class="table-light">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Photo</th>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Subscribed</th>
                                </tr>
                            </thead>
                            <tbody class="list">
                                {#each $parentStore?.students || [] as student}
                                    <tr>
                                        <td>{student.id}</td>
                                        <td><img src={student.image.full_path} alt="" class="avatar-xs rounded-circle" /></td>
                                        <td>{student.firstname}</td>
                                        <td>{student.lastname}</td>
                                        <td>
                                            {#if student.subscribed}
                                            <span class="badge bg-success-subtle text-success">Subscribed</span>
                                            {:else}
                                            <span class="badge bg-danger-subtle text-danger">Not Subscribed</span>
                                            {/if}
                                        </td>

                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/if}


                <div class="hstack gap-2 justify-content-end">
                    <button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</div>
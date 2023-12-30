<script>
    import { getContext } from "svelte";
    import {formatTimestamp} from "$lib/utils.js"
    import ViewRow from "$lib/components/ViewRow.svelte"
    export let general = false
    let {packageStore} = getContext("packageStore")

    

</script>

<div class="modal  fade" id="viewPackageModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" >
    <div class="modal-dialog modal-dialog-centered" >
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalgridLabel">View Package</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
             
            <ViewRow>
               Name : <span class="fw-normal">{$packageStore.name}</span>
            </ViewRow>

            <ViewRow>
                Arabic Name : <span class="fw-normal">{$packageStore.name_ar}</span>
             </ViewRow>

             <ViewRow>
                Description : <span class="fw-normal">{$packageStore.description}</span>
             </ViewRow>

             <ViewRow>
                Arabic Description : <span class="fw-normal">{$packageStore.description_ar}</span>
             </ViewRow>
             <ViewRow>
                Should Start At : <span class="fw-normal">{$packageStore.should_start_at}</span>
             </ViewRow>

            <ViewRow>
               Code : <span class="badge border border-primary text-primary">{$packageStore.code}</span>
            </ViewRow>
            {#if general}
            <ViewRow>
                School :      
                        <img src={$packageStore?.school?.logo?.full_path} alt="" class="avatar-xs rounded-circle" />
                        {$packageStore?.school?.name}
            </ViewRow>
            {/if}

            <ViewRow>
                Price : <span class="fs-5">{$packageStore.price}</span> 
            </ViewRow>

            <ViewRow>
                Sale Price : {#if $packageStore.sale_price}
                <span class="fs-5">{$packageStore.sale_price}</span>
                {:else}
                <span class="badge bg-danger-subtle text-danger">not set</span>
                {/if} 
            </ViewRow>
            <ViewRow>
                Current Price : {#if $packageStore.sale_price}
                <span class="fs-6  text-decoration-line-through text-danger">{$packageStore.price}</span>
                <span class="fs-5">{$packageStore.sale_price}</span> 
                {:else}
                <span class="fs-5">{$packageStore.price}</span> 
                {/if}
            </ViewRow>                   

            <ViewRow>
                Tax : <span class="fw-normal">{$packageStore.tax}</span>
            </ViewRow>
            <ViewRow>
                Days : <span class="fw-normal">{$packageStore.days}</span>
            </ViewRow>
            <ViewRow>
                Yearly : {#if $packageStore.yearly}
                    <span class="badge bg-success-subtle text-success">Yearly</span>
                    {:else}
                    <span class="badge bg-warning-subtle text-warning">Not Yearly</span>
                    {/if}
            </ViewRow>
            <ViewRow>

                Popular : {#if $packageStore.popular}
                    <span class="badge bg-success-subtle text-success">Popular</span>
                    {:else}
                    <span class="badge bg-warning-subtle text-warning">Not Popular</span>
                    {/if}
            </ViewRow>
            <ViewRow>
                Hidden : {#if $packageStore.hidden}
                    <span class="badge bg-success-subtle text-success">Hidden</span>
                    {:else}
                    <span class="badge bg-warning-subtle text-warning">Not Hidden</span>
                    {/if}
            </ViewRow>
            <ViewRow>
                Created at : <span class="fw-normal">{formatTimestamp($packageStore.created_at)}</span>
            </ViewRow>
            <ViewRow>
                Updated at : <span class="fw-normal">{formatTimestamp($packageStore.updated_at)}</span>
            </ViewRow>

            <ViewRow>
                Features : {@html $packageStore?.package_features?.length > 0 ? "" : ': <span class="badge bg-warning">no features</span>'}
             </ViewRow>
             {#if $packageStore?.package_features?.length > 0}
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
                             {#each  $packageStore?.package_features || [] as feature}
                                 <tr>
                                     <td>{feature.id}</td>
                                     <td>{feature.name}</td>
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
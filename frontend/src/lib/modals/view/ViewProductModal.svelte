<script>
    import { getContext } from "svelte";
    import {formatTimestamp} from "$lib/utils.js"
    import ViewRow from "$lib/components/ViewRow.svelte"

    let {productStore} = getContext("productStore")

    

</script>

<div class="modal  fade" id="viewProductModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" >
    <div class="modal-dialog modal-dialog-centered" >
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalgridLabel">View Product</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
                <img class="rounded avatar-xl mb-3 object-fit-cover" alt="Product  Image" width="200" src={$productStore?.image?.full_path}>
            <ViewRow>
               Name : <span class="fw-normal">{$productStore.name}</span>
            </ViewRow>
            <ViewRow>
                Arabic Name : <span class="fw-normal">{$productStore.name_ar}</span>
             </ViewRow>
            <ViewRow>
                Category : <span class="fw-normal">{$productStore.category?.name}</span>
             </ViewRow>
             <ViewRow>
                Description : <span class="fw-normal">{$productStore.description == null ? "no Description" : $productStore.description}</span>
             </ViewRow>
             <ViewRow>
                Arabic Description : <span class="fw-normal">{$productStore.description_ar == null ? "no Description" : $productStore.description_ar}</span>
             </ViewRow>

             <ViewRow>
                Sale Price : {#if $productStore.sale_price}
                <span class="fs-5">{$productStore.sale_price}</span>
                {:else}
                <span class="badge bg-danger-subtle text-danger">not set</span>
                {/if} 
            </ViewRow>
            <ViewRow>
                Current Price : {#if $productStore.sale_price}
                <span class="fs-6  text-decoration-line-through text-danger">{$productStore.price}</span>
                <span class="fs-5">{$productStore.sale_price}</span> 
                {:else}
                <span class="fs-5">{$productStore.price}</span> 
                {/if}
            </ViewRow>                 
            <ViewRow>
                Created at : <span class="fw-normal">{formatTimestamp($productStore.created_at)}</span>
            </ViewRow>
            <ViewRow>
                Updated at : <span class="fw-normal">{formatTimestamp($productStore.updated_at)}</span>
            </ViewRow>

                    <div class="hstack gap-2 justify-content-end">
                        <button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">Close</button>
                    </div>
            </div>
        </div>
    </div>
</div>
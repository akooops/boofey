<script>
    import DeleteProductModal from "$lib/modals/delete/DeleteProductModal.svelte"
	import ViewProductModal from "$lib/modals/view/ViewProductModal.svelte";
	import EditProductModal from "$lib/modals/edit/EditProductModal.svelte";
    import ProductItem from "./items/ProductItem.svelte";
    
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
    
    export let productsList
    setContext('productStore', {
	    productStore: writable({})
    });

    export let categories = []

</script>


<div class="row pe-0">
    <div class="table-responsive">
        <table class="table align-middle table-nowrap mb-0 border-top">
            <thead class="table-light">
                <tr>
                    <th scope="col" style="width: 25px;">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="checkAll" value="option1">
                        </div>
                    </th>
                    <th scope="col">ID</th>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody class="list">
                {#each productsList as product}
                    <ProductItem {product} />
                {/each}
            </tbody>
        </table>
        <ViewProductModal />
        <EditProductModal {categories}/> 
        <DeleteProductModal />
        <!-- 
          -->
             

    </div>
</div>
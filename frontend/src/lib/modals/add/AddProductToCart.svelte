<script>
    import { PathGetProducts } from "$lib/api/paths";
    import { onMount } from "svelte"
    import { toast } from "$lib/components/toast.js";
	import Product from "$lib/components/Product.svelte";
    
    import ModalSearchTable from "$lib/components/ModalSearchTable.svelte";
    import ModalPagination from "$lib/components/ModalPagination.svelte";
    import { invalidate } from '$app/navigation';
    import { redirector } from "$lib/api/auth";
    
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let close

    let productsList = []
    let productsPagination
    let page = 1 
    let searchQuery = ""

    async function fetchProducts(){
        let res = await fetch(PathGetProducts({page,search:searchQuery},""),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            }
        })
        redirector(res)

        let productsResponse = await res.json() 
        $: productsList = productsResponse.data.products
        $: productsPagination = productsResponse.pagination
    }

    onMount(() => {
        fetchProducts()
    })



    function search(e){
        page = 1
        searchQuery = e.detail.searchQuery
        fetchProducts()
    }

    function switchPage(e){
        page = e.detail.page
        fetchProducts()
    }

    function select(product){
        dispatch("select",{product})
    }


    function reset(){}

</script>

    
<div class="modal  fade" id="addProductToCartModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"  on:hidden.bs.modal={reset}>
    <div class="modal-dialog modal-dialog-centered modal-lg" >
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalgridLabel">Add Product</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <ModalSearchTable type={"product"} on:search={search}/>
                <div class="row pe-0 mb-3">
                    <div class="table-responsive">
                        <table class="table align-middle table-nowrap mb-0 border-top">
                            <thead class="table-light">
                                <tr class="bg-secondary-subtle">
                                    <th scope="col">ID</th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody class="list">
                                {#each productsList as product}
                                <tr>
                                    <td>{product.id}</td>
                                    <td>
                                        
                                        <Product src={product.image.full_path} name={product.name} category={product?.category?.name}/>
                                    </td>
                                    <td>
                                        {#if product.sale_price}
                                            <span class="fs-6  text-decoration-line-through text-danger">{product.price}</span>
                                            <span class="fs-5">{product.sale_price}</span> 
                                        {:else}
                                            <span class="fs-5">{product.price}</span> 
                                        {/if}
                                    </td>
                                    <td>
                                        <div class="hstack gap-3 flex-wrap">
                                            <button type="button" class="btn btn-primary" on:click={() => select(product)} data-bs-dismiss="modal">Select</button>
                                        </div>
                                    </td>
                                </tr>

                                {/each}
                            </tbody>
                        </table>
                    </div>
                </div>
                <ModalPagination {...productsPagination} on:switchPage={switchPage}/>

                    
                <div class="row g-3">
                    <div class="hstack gap-2 justify-content-end">
                        <button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal" bind:this={close}>Close</button>
                    </div>
                </div>
            </div><!--end row-->
        </div>
    </div>
</div>




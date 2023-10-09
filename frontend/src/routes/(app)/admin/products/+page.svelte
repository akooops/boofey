<script>
    import Pagination from "$lib/components/Pagination.svelte";
    import SearchTable from "$lib/components/SearchTable.svelte";
    
    import ProductsTable from "$lib/tables/ProductsTable.svelte";
    import AddProductModal from "$lib/modals/add/AddProductModal.svelte";
    import { onMount } from "svelte";
    import {initToolTip} from "$lib/init/initToolTip.js"
	import CategoriesList from "$lib/components/CategoriesList.svelte";
import { fade } from 'svelte/transition';
    export let data
    
    $: productsList = data.productsResponse.data.products
    $: categoriesList = data.productsResponse.data.categories
    $: productsPagination = data.productsResponse.pagination
    let productsPage
    onMount(() => {
        initToolTip(productsPage)
    })
    
    </script>
    <div class="row" in:fade={{delay:200,duration: 200 }} out:fade={{duration: 200 }} bind:this={productsPage}>
        <CategoriesList {categoriesList} />
        <div class="col-xl-9 col-lg-8">
            <div class="card">
                <div class="card-header align-items-center d-flex">
                    <h4 class="card-title mb-0 flex-grow-1">Products Managment</h4>
                    <div class="flex-shrink-0">
                        {#if JSON.parse(sessionStorage.getItem("permissions")).includes("products.store")}

                        <button type="button" data-bs-toggle="modal" data-bs-target="#addProductModal" class="btn btn-primary waves-effect waves-light"><i class="ri-add-line align-bottom me-1"></i>Add Product</button>
                        <AddProductModal categories={categoriesList}/>
                        {/if}
                    </div>
                </div><!-- end card header -->
                {#if JSON.parse(sessionStorage.getItem("permissions")).includes("products.index")}
                <div class="card-body">
    
                    <!-- <div class="live-preview"> -->
                        <div class="row">
                                <!-- Input with Icon -->
                            <SearchTable type={"Product"}/>
                            <ProductsTable {productsList} categories={categoriesList}/>
                            <Pagination {...productsPagination} />
                            <!--end col-->
                        </div>
                        <!--end row-->
                    <!-- </div> -->
                </div><!-- end card-body -->
                {/if}
            </div><!-- end card -->
        </div>
        <!-- end col -->
    </div>
    
    
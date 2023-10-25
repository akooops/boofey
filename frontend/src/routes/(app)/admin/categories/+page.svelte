<script>
    import Pagination from "$lib/components/Pagination.svelte";
    import SearchTable from "$lib/components/SearchTable.svelte";
    
    import CategoriesTable from "$lib/tables/CategoriesTable.svelte";
    import AddCategoryModal from "$lib/modals/add/AddCategoryModal.svelte";
    import { onMount } from "svelte";
import { fade } from 'svelte/transition';
    import {initToolTip} from "$lib/init/initToolTip.js"
    export let data
    
    $: categoriesList = data.categoriesResponse.data  
    $: categoriesPagination = data.categoriesResponse.pagination
    let categoriesPage
    onMount(() => {
        initToolTip(categoriesPage)
    })
    
    </script>
    <div class="row"  in:fade={{duration: 200 }} bind:this={categoriesPage}>
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header align-items-center d-flex">
                    <h4 class="card-title mb-0 flex-grow-1">Categories Managment</h4>
                    <div class="flex-shrink-0">
                    {#if JSON.parse(sessionStorage.getItem("permissions")).includes("categories.store")}
                        <button type="button" data-bs-toggle="modal" data-bs-target="#addCategoryModal" class="btn btn-primary waves-effect waves-light"><i class="ri-add-line align-bottom me-1"></i>Add Category</button>
                        <AddCategoryModal />
                    {/if}
                    </div>
                </div><!-- end card header -->
                {#if JSON.parse(sessionStorage.getItem("permissions")).includes("categories.index")}
                <div class="card-body">
    
                    <!-- <div class="live-preview"> -->
                        <div class="row">
                                <!-- Input with Icon -->
                            <SearchTable type={"Categorie"}/>
                            <CategoriesTable {categoriesList}/>
                            <Pagination {...categoriesPagination} />
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
    
    
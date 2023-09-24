<script>
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
	import { getAllContexts, onMount } from 'svelte';

    export let categoriesList

    let activeCategory

    async function filterByCategory(categoryId){

        let query = new URLSearchParams($page.url.searchParams.toString());

        query.set('category', categoryId);
        
        await goto(`?${query.toString()}`);
        setActiveCategoty()
    }

    function setActiveCategoty(){
        let params = new URL(document.location).searchParams;
        activeCategory = params.get("category"); 
    }

    async function all(){
        const url = new URL($page.url);
        url.searchParams.delete("category")
        activeCategory = null
        await goto(url);
    }

    onMount(() => {
        setActiveCategoty()
    })


</script>

<div class="col-xl-3 col-lg-4">
    <div class="card">

        <div class="accordion accordion-flush filter-accordion">

            <div class="card-body border-bottom">
                <div>
                    <p class="text-muted text-uppercase fs-12 fw-medium mb-2">Categories</p>
                    <ul class="list-unstyled mb-0 filter-list">
                        <li on:click={all}>
                            <a href="#" class="d-flex py-1 align-items-center">
                                <div class="flex-grow-1">
                                    <h5 class="fs-13 mb-0 listname" class:text-primary={activeCategory == null}>All Categories</h5>
                                </div>
                            </a>
                        </li>

                        {#each categoriesList as category}
                        <li on:click={() => filterByCategory(category.id)}>
                            <a href="#" class="d-flex py-1 align-items-center">
                                <div class="flex-grow-1">
                                    <h5 class="fs-13 mb-0 listname" class:text-primary={activeCategory == category.id}>{category.name}</h5>
                                </div>
                                {#if category.productsCount}
                                <div class="flex-shrink-0 ms-2">
                                    <span class="badge bg-light text-muted">{category.productsCount}</span>
                                </div>
                                {/if}
                            </a>
                        </li>
                        {/each}
                    </ul>
                </div>
            </div>

            <!-- <div class="card-body border-bottom">
                <p class="text-muted text-uppercase fs-12 fw-medium mb-4">Price</p>

                <div id="product-price-range"></div>
                <div class="formCost d-flex gap-2 align-items-center mt-3">
                    <input class="form-control form-control-sm" type="text" id="minCost" value="0" /> <span class="fw-semibold text-muted">to</span> <input class="form-control form-control-sm" type="text" id="maxCost" value="1000" />
                </div>
            </div> -->
        </div>
    </div>
    <!-- end card -->
</div>
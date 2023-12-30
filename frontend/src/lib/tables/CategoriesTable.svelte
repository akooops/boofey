<script>
    import DeleteCategoryModal from "$lib/modals/delete/DeleteCategoryModal.svelte"
	import ViewCategoryModal from "$lib/modals/view/ViewCategoryModal.svelte";
	import EditCategoryModal from "$lib/modals/edit/EditCategoryModal.svelte";
    import CategoryItem from "./items/CategoryItem.svelte";
    
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
    import { navigating } from '$app/stores';

    
    export let categoriesList
    setContext('categoryStore', {
	    categoryStore: writable({})
    });

</script>


<div class="row pe-0">
    <div class="table-responsive">²
        <table class="table align-middle table-nowrap mb-0 border-top">
            <thead class="table-light">
                <tr>
                    <th scope="col" style="width: 25px;">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="checkAll" value="option1">
                        </div>
                    </th>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Arabic name</th>
                    <th scope="col">Products Count</th>
                    <th scope="col">Action</th>

                </tr>
             </thead>
            {#if $navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id}
            <tbody class="list">
                {#each categoriesList as category}
                    <CategoryItem {category} />
                {/each}
            </tbody>
            {/if}
        </table>
        <EditCategoryModal /> 
        <ViewCategoryModal />
        <DeleteCategoryModal />  
             

    </div>
</div>

{#if $navigating?.from?.route?.id == $navigating?.to?.route?.id  && $navigating}
    <div class="text-center">
        <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:120px;height:120px"></lord-icon>
    </div>
{/if}
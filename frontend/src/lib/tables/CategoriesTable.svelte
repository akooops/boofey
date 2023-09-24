<script>
    import DeleteCategoryModal from "$lib/modals/delete/DeleteCategoryModal.svelte"
	import ViewCategoryModal from "$lib/modals/view/ViewCategoryModal.svelte";
	import EditCategoryModal from "$lib/modals/edit/EditCategoryModal.svelte";
    import CategoryItem from "./items/CategoryItem.svelte";
    
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
    
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
            <tbody class="list">
                {#each categoriesList as category}
                    <CategoryItem {category} />
                {/each}
            </tbody>
        </table>
        <EditCategoryModal /> 
        <ViewCategoryModal />
        <DeleteCategoryModal />  
             

    </div>
</div>
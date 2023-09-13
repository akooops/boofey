<script>
    import DeleteCanteenModal from "$lib/modals/delete/DeleteCanteenModal.svelte"
	import ViewCanteenModal from "$lib/modals/view/ViewCanteenModal.svelte";
	import EditCanteenModal from "$lib/modals/edit/EditCanteenModal.svelte";
    import CanteenItem from "$lib/tables/items/CanteenItem.svelte";

    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
    
    export let canteensList
    setContext('canteenStore', {
	    canteenStore: writable({})
    });

</script>


<div class="row pe-0">
    <div class="table-responsive">
        <table class="table align-end table-nowrap mb-0 border-top">
            <thead class="table-light">
                <tr>
                    <th scope="col" style="width: 25px;">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="checkAll" value="option1">
                        </div>
                    </th>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Action</th>
                </tr>
            </thead> 
            <tbody class="list">
                {#each canteensList as canteen}
                    <CanteenItem {canteen} />
                {/each}
            </tbody>
        </table>
        <EditCanteenModal /> 
        <DeleteCanteenModal />
        <ViewCanteenModal /> 
    </div>
</div>
<script>
    import DeleteCanteenModal from "$lib/modals/delete/DeleteCanteenModal.svelte"
	import ViewCanteenModal from "$lib/modals/view/ViewCanteenModal.svelte";
	import ViewApiModal from "$lib/modals/view/ViewApiModal.svelte";

	import EditCanteenModal from "$lib/modals/edit/EditCanteenModal.svelte";
    import CanteenItem from "$lib/tables/items/CanteenItem.svelte";

    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
    import { navigating } from '$app/stores';
	import RevokeApiModal from "../modals/delete/RevokeApiModal.svelte";
    
    export let canteensList
    export let general = false

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
                    <th scope="col">Arabic Name</th>
                    {#if general}
                    <th scope="col">School</th>
                    {/if}
                    <th scope="col">Address</th>
                    <th scope="col">Arabic Address</th>
                    <th scope="col">Action</th>
                </tr>
             </thead>
            {#if $navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id} 
            <tbody class="list">
                {#each canteensList as canteen}
                    <CanteenItem {canteen} {general}/>
                {/each}
            </tbody>
            {/if}
        </table>
        <EditCanteenModal /> 
        <DeleteCanteenModal />
        <ViewCanteenModal {general}/> 
        <ViewApiModal /> 
        <RevokeApiModal />
    </div>
</div>

{#if $navigating?.from?.route?.id == $navigating?.to?.route?.id  && $navigating}
    <div class="text-center">
        <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#695eef,secondary:#73dce9" style="width:120px;height:120px"></lord-icon>
    </div>
{/if}
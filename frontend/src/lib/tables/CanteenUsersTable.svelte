<script>
    import DeleteCanteenUserModal from "$lib/modals/delete/DeleteCanteenUserModal.svelte"
	import ViewCanteenUserModal from "$lib/modals/view/ViewCanteenUserModal.svelte";
    import CanteenUserItem from "./items/CanteenUserItem.svelte";
    
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
    import { navigating } from '$app/stores';
    
    export let canteensList = []
    setContext('canteenUserStore', {
	    canteenUserStore: writable({})
    });

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
                    <th scope="col">Name</th>
                    <th scope="col">School</th>
                    <th scope="col">Address</th>
                    <th scope="col">Action</th>

                </tr>
             </thead>
            {#if $navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id}
            <tbody class="list">
                {#each canteensList as canteenUser}
                    <CanteenUserItem {canteenUser} />
                {/each}
            </tbody>
            {/if}
        </table>
        <ViewCanteenUserModal />
        <DeleteCanteenUserModal /> 

    </div>
</div>

{#if $navigating?.from?.route?.id == $navigating?.to?.route?.id  && $navigating}
    <div class="text-center">
        <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:120px;height:120px"></lord-icon>
    </div>
{/if}
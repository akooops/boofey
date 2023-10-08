<script>
    import DeleteYearModal from "$lib/modals/delete/DeleteYearModal.svelte"
	import ViewYearModal from "$lib/modals/view/ViewYearModal.svelte";
	import EditYearModal from "$lib/modals/edit/EditYearModal.svelte";
    import YearItem from "$lib/tables/items/YearItem.svelte";

    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
    import { navigating } from '$app/stores';
    
    export let yearsList
    setContext('yearStore', {
	    yearStore: writable({})
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
                    <th scope="col">From</th>
                    <th scope="col">To</th>
                    <th scope="col">Academic Days</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            {#if $navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id}
            <tbody class="list">
                {#each yearsList as year}
                    <YearItem {year} />
                {/each}
            </tbody>
            {/if}
        </table>
        <DeleteYearModal />
            <EditYearModal /> 
            <ViewYearModal />
    </div>
</div>

{#if $navigating?.from?.route?.id == $navigating?.to?.route?.id  && $navigating}
    <div class="text-center">
        <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#695eef,secondary:#73dce9" style="width:120px;height:120px"></lord-icon>
    </div>
{/if}
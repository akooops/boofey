<script>
    import DeletePackageModal from "$lib/modals/delete/DeletePackageModal.svelte"
	import ViewPackageModal from "$lib/modals/view/ViewPackageModal.svelte";
	import EditPackageModal from "$lib/modals/edit/EditPackageModal.svelte";
    import PackageItem from "$lib/tables/items/PackageItem.svelte";

    import { setContext } from 'svelte';
    import { navigating } from '$app/stores';
    import { writable } from 'svelte/store';
    
    export let packagesList
    export let general = false
    setContext('packageStore', {
	    packageStore: writable({})
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
                    <th scope="col">Code</th>
                    {#if general}
                    <th scope="col">School</th>
                    {/if}
                    <th scope="col">Price</th>
                    <th scope="col">Tax</th>
                    <th scope="col">Days</th>
                    <th scope="col">Yearly</th>
                    <th scope="col">Popular</th>
                    <th scope="col">Hidden</th>
                    <th scope="col">Actions</th>
                </tr>
             </thead>
            {#if $navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id}
            <tbody class="list">
                {#each packagesList as packageObj}
                    <PackageItem {general} {packageObj} />
                {/each}
            </tbody>
            {/if}
        </table>
        <EditPackageModal /> 
        <DeletePackageModal />
        <ViewPackageModal {general}/>
    </div>
</div>

{#if $navigating?.from?.route?.id == $navigating?.to?.route?.id  && $navigating}
    <div class="text-center">
        <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#695eef,secondary:#73dce9" style="width:120px;height:120px"></lord-icon>
    </div>
{/if}
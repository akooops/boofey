<script>
    import DeletePackageModal from "$lib/modals/delete/DeletePackageModal.svelte"
	import ViewPackageModal from "$lib/modals/view/ViewPackageModal.svelte";
	import EditPackageModal from "$lib/modals/edit/EditPackageModal.svelte";
    import PackageItem from "$lib/tables/items/PackageItem.svelte";

    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
    
    export let packagesList
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
                    <th scope="col">Price</th>
                    <th scope="col">Tax</th>
                    <th scope="col">Days</th>
                    <th scope="col">Yearly</th>
                    <th scope="col">Popular</th>
                    <th scope="col">Hidden</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody class="list">
                {#each packagesList as packageObj}
                    <PackageItem {packageObj} />
                {/each}
            </tbody>
        </table>
        <EditPackageModal /> 
        <DeletePackageModal />
        <ViewPackageModal />
    </div>
</div>
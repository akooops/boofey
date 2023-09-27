<script>
    // import DeleteSubModal from "$lib/modals/delete/DeleteSubModal.svelte"
	// import EditSubModal from "$lib/modals/edit/EditSubModal.svelte";
    import SubItem from "./items/SubItem.svelte";
    
    import { writable } from 'svelte/store';
    
    
    export let subsList
  


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
                    <th scope="col">Package</th>
                    <th scope="col">Days</th>
                    <th scope="col">Balance</th>
                    <th scope="col">Should Start At</th>
                    <th scope="col">Started At</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody class="list">
                {#each subsList as sub}
                    <SubItem {sub} />
                {/each}
            </tbody>
        </table>

    </div>
</div>
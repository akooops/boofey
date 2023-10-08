<script>
    // import DeleteQueueModal from "$lib/modals/delete/DeleteQueueModal.svelte"
	// import EditQueueModal from "$lib/modals/edit/EditQueueModal.svelte";
    import QueueItem from "./items/QueueItem.svelte";
    import { navigating } from '$app/stores';
    
    
    export let queuesList
  

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
                    <th scope="col">Type</th>
                    <th scope="col">Started At</th>
                    <th scope="col">Students Count</th>
                    <th scope="col">Students In</th>
                    <th scope="col">Students Out</th>
                    <th scope="col">Last Synced At</th>
                    <th scope="col">Actions</th>

                </tr>
             </thead>
            {#if $navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id}
            <tbody class="list">
                {#each queuesList as queue}
                    <QueueItem {queue} />
                {/each}
            </tbody>
            {/if}
        </table>

    </div>
</div>

{#if $navigating?.from?.route?.id == $navigating?.to?.route?.id  && $navigating}
    <div class="text-center">
        <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#695eef,secondary:#73dce9" style="width:120px;height:120px"></lord-icon>
    </div>
{/if}
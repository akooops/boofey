<script>
    import DeleteQueueStudentModal from "$lib/modals/delete/DeleteQueueStudentModal.svelte"
	import ViewQueueStudentModal from "$lib/modals/view/ViewQueueStudentModal.svelte";
	import EditQueueStudentModal from "$lib/modals/edit/EditQueueStudentModal.svelte";
    import QueueStudentItem from "./items/QueueStudentItem.svelte";
    
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
    import { navigating } from '$app/stores';
import ExitQueueStudent from "$lib/modals/confirmation/ExitQueueStudent.svelte";
    
    export let queueStudentsList = []


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
                    <th scope="col">Student</th>
                    <th scope="col">Started At</th>
                    <th scope="col">Synced At</th>
                    <th scope="col">Exited At</th>
                    <th scope="col">Action</th>
                </tr>
             </thead>
            {#if $navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id}
            <tbody class="list">
                {#each queueStudentsList as queueStudent}
                    <QueueStudentItem {queueStudent} />
                {/each}
            </tbody>
            {/if}
        </table>
        <ViewQueueStudentModal /> 
        <EditQueueStudentModal />
        <DeleteQueueStudentModal />
        <ExitQueueStudent />
        <!-- 
              -->
    </div>
</div>

{#if $navigating?.from?.route?.id == $navigating?.to?.route?.id  && $navigating}
    <div class="text-center">
        <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#695eef,secondary:#73dce9" style="width:120px;height:120px"></lord-icon>
    </div>
{/if}
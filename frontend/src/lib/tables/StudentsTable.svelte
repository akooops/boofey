<script>
    import DeleteStudentModal from "$lib/modals/delete/DeleteStudentModal.svelte"
	import ViewStudentModal from "$lib/modals/view/ViewStudentModal.svelte";
	import EditStudentModal from "$lib/modals/edit/EditStudentModal.svelte";
    import StudentItem from "./items/StudentItem.svelte";
    
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
	import Qr from "$lib/modals/view/Qr.svelte";
    import { navigating } from '$app/stores';
    
    export let studentsList
    setContext('studentStore', {
	    studentStore: writable({})
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
                    <th scope="col">Student</th>
                    <th scope="col">Father</th>
                    <th scope="col">Status</th>
                    <th scope="col">School</th>
                    <th scope="col">Class</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            {#if $navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id}
            <tbody class="list">
                {#each studentsList as student}
                    <StudentItem {student}  />
                {/each}
            </tbody>
            {/if}
        </table>
              <Qr />
             <ViewStudentModal /> 
             <DeleteStudentModal />
             <EditStudentModal />
    </div>
</div>

{#if $navigating?.from?.route?.id == $navigating?.to?.route?.id  && $navigating}
    <div class="text-center">
        <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#695eef,secondary:#73dce9" style="width:120px;height:120px"></lord-icon>
    </div>
{/if}
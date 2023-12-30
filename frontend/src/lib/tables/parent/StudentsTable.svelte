<script>
    import DeleteStudentModal from "$lib/modals/delete/DeleteStudentModal.svelte"
	import ViewStudentModal from "$lib/modals/view/parent/ViewStudentModal.svelte";
	import EditStudentModal from "$lib/modals/edit/parent/EditStudentModal.svelte";
    import StudentItem from "$lib/tables/items/parent/StudentItem.svelte";
	import Qr from "$lib/modals/view/Qr.svelte";
    import {translation} from "$lib/translation.js"

    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
    import { navigating } from '$app/stores';
    
    export let studentsList
  
 

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
                    <th scope="col">{translation.id[localStorage.getItem("language")]}</th>
                    <th scope="col">{translation.student[localStorage.getItem("language")]}</th>
                    <th scope="col">{translation.status[localStorage.getItem("language")]}</th>
                    <th scope="col">{translation.school[localStorage.getItem("language")]}</th>
                    <th scope="col">{translation.class[localStorage.getItem("language")]}</th>
                    <th scope="col">{translation.className[localStorage.getItem("language")]}</th>
                    <th scope="col">{translation.actions[localStorage.getItem("language")]}</th>
                </tr>
             </thead>
            {#if $navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id}
            <tbody class="list">
                {#each studentsList as student,_ (student.id)}
                    <StudentItem {student} />
                {/each}
            </tbody>
            {/if}
        </table>
             <Qr type={"parent"}/>
             <ViewStudentModal /> 
             <DeleteStudentModal />
             <EditStudentModal />
    </div>
</div>

{#if $navigating?.from?.route?.id == $navigating?.to?.route?.id  && $navigating}
    <div class="text-center">
        <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:120px;height:120px"></lord-icon>
    </div>
{/if}
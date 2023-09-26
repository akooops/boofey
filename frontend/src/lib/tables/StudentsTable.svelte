<script>
    import DeleteStudentModal from "$lib/modals/delete/DeleteStudentModal.svelte"
	import ViewStudentModal from "$lib/modals/view/ViewStudentModal.svelte";
	import EditStudentModal from "$lib/modals/edit/EditStudentModal.svelte";
    import StudentItem from "./items/StudentItem.svelte";
    
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
    
    export let studentsList
    export let type
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
                    {#if type != "parent"}
                    <th scope="col">Father</th>
                    {/if}
                    <th scope="col">Status</th>
                    <th scope="col">School</th>
                    <th scope="col">Class</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody class="list">
                {#each studentsList as student}
                    <StudentItem {student} {type} />
                {/each}
            </tbody>
        </table>
             <ViewStudentModal {type}/> 
             <DeleteStudentModal />
             <EditStudentModal {type}/>
    </div>
</div>
<script>
    import DeleteStudentModal from "$lib/modals/delete/DeleteStudentModal.svelte"
	import ViewStudentModal from "$lib/modals/view/parent/ViewStudentModal.svelte";
	import EditStudentModal from "$lib/modals/edit/parent/EditStudentModal.svelte";
    import StudentItem from "$lib/tables/items/parent/StudentItem.svelte";
    
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
    
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
                    <th scope="col">Status</th>
                    <th scope="col">School</th>
                    <th scope="col">Class</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody class="list">
                {#each studentsList as student,_ (student.id)}
                    <StudentItem {student} />
                {/each}
            </tbody>
        </table>
             <ViewStudentModal /> 
             <DeleteStudentModal />
             <EditStudentModal />
    </div>
</div>
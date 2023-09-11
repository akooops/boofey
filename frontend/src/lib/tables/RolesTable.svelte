<script>
    import RoleItem from "./items/RoleItem.svelte";
    import DeleteRoleModal from "$lib/modals/delete/DeleteRoleModal.svelte"
	import ViewRoleModal from "$lib/modals/view/ViewRoleModal.svelte";
	import EditRoleModal from "$lib/modals/edit/EditRoleModal.svelte";
    export let rolesList

    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';

    setContext('roleStore', {
	    roleStore: writable({})
    });

</script>


<div class="row pe-0">
    <div class="table-responsive pe-0">
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
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {#each rolesList as role,i}
                   <RoleItem {role}/>
                {/each}
            </tbody>
        </table>
        <DeleteRoleModal />
        <ViewRoleModal />
        <EditRoleModal />


    </div>
</div>
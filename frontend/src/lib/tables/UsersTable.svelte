<script>
import UserItem from "./items/UserItem.svelte";
import DeleteUserModal from "$lib/modals/delete/DeleteUserModal.svelte"
import ViewUserModal from "$lib/modals/view/ViewUserModal.svelte"
import EditUserModal from "$lib/modals/edit/EditUserModal.svelte";

export let usersList
import { setContext } from 'svelte';
import { writable } from 'svelte/store';
import { navigating } from '$app/stores';

    setContext('userStore', {
	    userStore: writable({})
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
                    <th scope="col">Username</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Role</th>
                    <th scope="col" class="text-end" >Action</th>
                    
                </tr>
            </thead>
            {#if $navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id}
            <tbody>
                {#each usersList as user,i}
                  <UserItem {user}/>
                {/each}
            </tbody>
            {/if}
        </table>
        <DeleteUserModal />
        <ViewUserModal />
        <EditUserModal />


    </div>
</div>

{#if $navigating?.from?.route?.id == $navigating?.to?.route?.id  && $navigating}
    <div class="text-center">
        <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#695eef,secondary:#73dce9" style="width:120px;height:120px"></lord-icon>
    </div>
{/if}
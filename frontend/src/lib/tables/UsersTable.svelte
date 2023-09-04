<script>
import UserItem from "./items/UserItem.svelte";
import DeleteUserModal from "$lib/modals/delete/DeleteUserModal.svelte"
export let usersList
import { setContext } from 'svelte';
import { writable } from 'svelte/store';

    setContext('userDelete', {
	    userStore: writable({})
    });

</script>


<div class="row">
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
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Action</th>
                    
                </tr>
            </thead>
            <tbody>
                {#each usersList as user,i}
                  <UserItem {user}/>
                {/each}
            </tbody>
        </table>
        <DeleteUserModal />
    </div>
</div>
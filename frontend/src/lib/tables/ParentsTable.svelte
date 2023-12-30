<script>
    import ParentItem from "./items/ParentItem.svelte";
    import DeleteParentModal from "$lib/modals/delete/DeleteParentModal.svelte"
    import ViewParentModal from "$lib/modals/view/ViewParentModal.svelte"
    import EditParentModal from "$lib/modals/edit/EditParentModal.svelte"
    
    import { setContext } from 'svelte';
    import { navigating } from '$app/stores';
    import { writable } from 'svelte/store';
    
    export let parentsList
    setContext('parentStore', {
            parentStore: writable({})
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
                        <th scope="col">Identity Number</th>
                        <th scope="col">Username</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Children Count</th>
                        <th scope="col">Action</th>
                        
                    </tr>
                 </thead>
            {#if $navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id}
                <tbody>
                    {#each parentsList as parent,i}
                      <ParentItem {parent}/>
                    {/each}
                </tbody>
                {/if}
            </table>
            <DeleteParentModal />
            <ViewParentModal />
            <EditParentModal />
    
    
        </div>
    </div>

    {#if $navigating?.from?.route?.id == $navigating?.to?.route?.id  && $navigating}
    <div class="text-center">
        <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:120px;height:120px"></lord-icon>
    </div>
{/if}
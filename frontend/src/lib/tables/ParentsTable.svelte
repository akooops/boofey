<script>
    import ParentItem from "./items/ParentItem.svelte";
    import DeleteParentModal from "$lib/modals/delete/DeleteParentModal.svelte"
    import ViewParentModal from "$lib/modals/view/ViewParentModal.svelte"
    
    import { setContext } from 'svelte';
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
                        <th scope="col">Username</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Children Count</th>
                        <th scope="col">Action</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {#each parentsList as parent,i}
                      <ParentItem {parent}/>
                    {/each}
                </tbody>
            </table>
            <DeleteParentModal />
            <ViewParentModal />
    
    
        </div>
    </div>
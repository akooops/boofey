<script>
    import Pagination from "$lib/components/Pagination.svelte";    
    import SearchTable from "$lib/components/SearchTable.svelte";    
    import UsersTable from "$lib/tables/UsersTable.svelte";
    import AddUserModal from "$lib/modals/add/AddUserModal.svelte";

    export let data
    $: usersList = data.usersResponse.data.users
    $: usersPagination = data.usersResponse.pagination
    $: roles = data.usersResponse.data.roles

</script>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header align-items-center d-flex">
                    <h4 class="card-title mb-0 flex-grow-1">Users Managment</h4>
                    <div class="flex-shrink-0">
                        <button type="button" data-bs-toggle="modal" data-bs-target="#addUserModal" class="btn btn-primary waves-effect waves-light"><i class="ri-add-line align-bottom me-1"></i> Add User</button>
                        <AddUserModal {roles}/>
                        
                    </div>
                </div><!-- end card header -->
    
                <div class="card-body">
    
                    <!-- <div class="live-preview"> -->
                        
                            <SearchTable type={"User"}/>
                            <UsersTable {usersList}/>
                            <Pagination {...usersPagination} />
                            <!--end col-->
                        
                        <!--end row-->
                    <!-- </div> -->
                </div><!-- end card-body -->
            </div><!-- end card -->
        </div>
        <!-- end col -->
    </div>
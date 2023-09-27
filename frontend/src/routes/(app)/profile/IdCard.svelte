<script>
    export let user 
</script>

<div class="card">
    <div class="card-body">
        <h5 class="card-title mb-3 text-primary">Info</h5>
        <div class="table-responsive">
            <table class="table table-borderless mb-0">
                <tbody>
                    <tr>
                        <th class="ps-0" scope="row">Username :</th>
                        <td class="text-muted">{user?.username}</td>
                    </tr>
                    <tr>
                        <th class="ps-0" scope="row">First Name :</th>
                        <td class="text-muted">{user?.profile?.firstname}</td>
                    </tr>
                    <tr>
                        <th class="ps-0" scope="row">Last Name :</th>
                        <td class="text-muted">{user?.profile?.lastname}</td>
                    </tr>
                    <tr>
                        <th class="ps-0" scope="row">Mobile :</th>
                        <td class="text-muted">{user?.phone}</td>
                    </tr>
                    <tr>
                        <th class="ps-0" scope="row">E-mail :</th>
                        <td class="text-muted">{user?.email}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div><!-- end card body -->
</div><!-- end card -->
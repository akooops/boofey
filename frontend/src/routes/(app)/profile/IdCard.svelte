<script>
    import {translation} from "$lib/translation.js"

    export let user 
</script>

<div class="card">
    <div class="card-body">
        <h5 class="card-title mb-3 text-primary">{translation.info[localStorage.getItem("language")]}</h5>
        <div class="table-responsive">
            <table class="table table-borderless mb-0">
                <tbody>
                    <tr>
                        <th class="ps-0" scope="row">{translation.username[localStorage.getItem("language")]} :</th>
                        <td class="text-muted">{user?.username}</td>
                    </tr>
                    <tr>
                        <th class="ps-0" scope="row">{translation.firstName[localStorage.getItem("language")]} :</th>
                        <td class="text-muted">{user?.profile?.firstname}</td>
                    </tr>
                    <tr>
                        <th class="ps-0" scope="row">{translation.lastName[localStorage.getItem("language")]} :</th>
                        <td class="text-muted">{user?.profile?.lastname}</td>
                    </tr>
                    <tr>
                        <th class="ps-0" scope="row">{translation.phone[localStorage.getItem("language")]} :</th>
                        <td class="text-muted">{user?.phone}</td>
                    </tr>
                    <tr>
                        <th class="ps-0" scope="row">{translation.email[localStorage.getItem("language")]} :</th>
                        <td class="text-muted">{user?.email}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div><!-- end card body -->
</div><!-- end card -->
<script>
    export let permissionsList
</script>


<div class="row">
    <div class="table-responsive">
        <table class="table table-hover align-end table-nowrap mb-0 border-top">
            <thead>
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
            <tbody class="list">
                {#each permissionsList as permission}
                    <tr scope="row">
                        <td>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1" checked>
                            </div>
                        </td>
                        <td>{permission.id}</td>
                        <td>{permission.name}</td>
                        <td><a href="javascript:void(0);"><i class="ri-download-2-line fs-17 lh-1 align-middle"></i></a></td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
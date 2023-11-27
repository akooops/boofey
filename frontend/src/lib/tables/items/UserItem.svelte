<script>
    import { getContext } from "svelte"
    import { goto } from '$app/navigation';
    export let user

    let {userStore} = getContext("userStore")
    
    function setUser(){
        $userStore = JSON.parse(JSON.stringify(user))

    }

</script>

<tr scope="row">
    <td>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1">
        </div>
    </td>
    <td>{user.id}</td>
    <td>
    <div class="d-flex gap-2 align-items-center">
        <div class="flex-shrink-0">
            <img src={user.profile.image.full_path} alt="" class="avatar-xs rounded-circle" />
        </div>
        <div class="flex-grow-1">
            {user.username}
        </div>
    </div>
    </td>
    <td>{user.profile.firstname}</td>
    <td>{user.profile.lastname}</td>
    <td>{user.email}</td>
    <td>{user.phone}</td>
    <td>{user.role}</td>

    <td class="text-end">
        <div class="hstack gap-3 flex-wrap justify-content-end">
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("canteenUsers.index") && user.roles[0].name != "parent"}
                <a  href="users/{user.id}/canteens" target="_blank" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Canteens" ><i class="ri-restaurant-2-fill"></i></a>

            {/if}
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("users.show")}            
            <span data-bs-toggle="modal" data-bs-target="#viewUserModal" on:click={setUser}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View" ><i class="ri-eye-fill"></i></a></span>
            {/if}
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("users.update")}
            <span data-bs-toggle="modal" data-bs-target="#editUserModal" on:click={setUser}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit" ><i class="ri-edit-2-line"></i></a></span>
            {/if}
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("users.destroy")}
            <span data-bs-toggle="modal" data-bs-target="#deleteUserModal" on:click={setUser}><a href="" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete" ><i class="ri-delete-bin-line"></i></a></span>
            {/if}
        </div>
    </td>
</tr>
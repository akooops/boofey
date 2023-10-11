<script>
    import { getContext } from "svelte"
    import { redirector } from "$lib/api/auth";
    import { goto } from '$app/navigation';

    export let canteenUser
    let {canteenUserStore} = getContext("canteenUserStore")

    
    function setCanteenUser(){
        $canteenUserStore = JSON.parse(JSON.stringify(canteenUser));
    }
    
    </script>
    
    <tr scope="row">
        <td>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1" >
            </div>
        </td>
        <td>{canteenUser.pivot.id}</td>
        <td>{canteenUser.name}</td>
        <td>
            <div class="d-flex gap-2 align-items-center">
                <div class="flex-shrink-0">
                    <img src={canteenUser.school.logo.full_path} alt="" class="avatar-xs rounded-circle" />
                </div>
                <div class="flex-grow-1">
                    {canteenUser.school.name}
                </div>
            </div>
        </td>
        <td>{canteenUser.address}</td>
        <td>
            <div class="hstack gap-3 flex-wrap">
                {#if JSON.parse(sessionStorage.getItem("permissions")).includes("canteenUsers.show")}
                    <span data-bs-toggle="modal" data-bs-target="#viewCanteenUserModal" on:click={setCanteenUser}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View" ><i class="ri-eye-fill"></i></a></span>
                {/if}
                {#if JSON.parse(sessionStorage.getItem("permissions")).includes("canteenUsers.destroy")}
                    <span data-bs-toggle="modal" data-bs-target="#deleteCanteenUserModal" on:click={setCanteenUser}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"><i class="ri-delete-bin-line"></i></a></span>
                {/if}
            </div>
        </td>
    </tr>


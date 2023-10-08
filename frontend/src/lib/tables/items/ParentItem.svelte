<script>
    import { getContext } from "svelte"
    export let parent

    let {parentStore} = getContext("parentStore")
    
    function setParent(){
        $parentStore = JSON.parse(JSON.stringify(parent))
    }

</script>

<tr scope="row">
    <td>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1">
        </div>
    </td>
    <td>{parent.id}</td>
    <td>
    <div class="d-flex gap-2 align-items-center">
        <div class="flex-shrink-0">
            <img src={parent.user.profile.image.full_path} alt="" class="avatar-xs rounded-circle" />
        </div>
        <div class="flex-grow-1">
            {parent.user.username}
        </div>
    </div>
    </td>
    <td>{parent.user.profile.firstname}</td>
    <td>{parent.user.profile.lastname}</td>
    <td>{parent.user.email}</td>
    <td>{parent.user.phone}</td>

    <td><span class="badge bg-primary">{parent.childrenCount}</span></td>
    <td>
        <div class="hstack gap-3 flex-wrap">
            
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("fathers.show")}
            <span data-bs-toggle="modal" data-bs-target="#viewParentModal" on:click={setParent}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View" ><i class="ri-eye-fill"></i></a></span>
            {/if}
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("fathers.destroy")}
            <span data-bs-toggle="modal" data-bs-target="#deleteParentModal" on:click={setParent}><a href="" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete" ><i class="ri-delete-bin-line"></i></a></span>
            {/if}
        </div>
    </td>
</tr>
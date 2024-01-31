<script>
    import { getContext } from "svelte"

    export let division


    let {divisionStore} = getContext("divisionStore")
    
    function setDivision(){
        $divisionStore = JSON.parse(JSON.stringify(division));
    }






</script>

<tr scope="row">
    <td>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1" >
        </div>
    </td>
    <td>{division.id}</td>
    <td>{division.name}</td>
    <td>{division.name_ar}</td>
    <td>
        <div class="hstack gap-3 flex-wrap">
            
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("divisions.show")}
            <span data-bs-toggle="modal" data-bs-target="#viewDivisionModal" on:click={setDivision}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View" ><i class="ri-eye-fill"></i></a></span>
            {/if}
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("divisions.update")}
            <span data-bs-toggle="modal" data-bs-target="#editDivisionModal" on:click={setDivision}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit" ><i class="ri-edit-2-line"></i></a></span>
            {/if}
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("divisions.destroy")}
            <span data-bs-toggle="modal" data-bs-target="#deleteDivisionModal" on:click={setDivision}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"><i class="ri-delete-bin-line"></i></a></span>
            {/if}
        
        </div>
    </td>
</tr>
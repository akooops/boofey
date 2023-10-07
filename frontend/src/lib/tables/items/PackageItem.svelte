<script>
    import { getContext } from "svelte"
    export let general = false
    export let packageObj
    let {packageStore} = getContext("packageStore")

    function setPackage(){
        $packageStore = JSON.parse(JSON.stringify(packageObj));
    }
    
    </script>
    
    <tr scope="row" class="{packageObj.current ? "table-active bg-success-subtle": ""}">
        <td>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1" >
            </div>
        </td>
        <td>{packageObj.id}</td>
        <td>{packageObj.name}</td>
        <td><span class="badge border border-primary text-primary">{packageObj.code}</span></td>
        {#if general}
        <td>
            <div class="d-flex gap-2 align-items-center">
                <div class="flex-shrink-0">
                    <img src={packageObj.school.logo.full_path} alt="" class="avatar-xs rounded-circle" />
                </div>
                <div class="flex-grow-1">
                    {packageObj.school.name}
                </div>
            </div>
        </td>
        {/if}
        <td>
            {#if packageObj.sale_price}
                <span class="fs-6  text-decoration-line-through text-danger">{packageObj.price}</span>
                <span class="fs-5">{packageObj.sale_price}</span> 
            {:else}
            <span class="fs-5">{packageObj.price}</span> 
            {/if}
        </td>
        <td>{packageObj.tax}</td>
        <td>{packageObj.days}</td>
        <td>
            {#if packageObj.yearly}
            <span class="badge bg-success-subtle text-success">Yearly</span>
            {:else}
            <span class="badge bg-warning-subtle text-warning">Not Yearly</span>
            {/if}
        </td>
        <td>
            {#if packageObj.popular}
            <span class="badge bg-success-subtle text-success">Popular</span>
            {:else}
            <span class="badge bg-warning-subtle text-warning">Not Popular</span>
            {/if}
        </td>
        <td>
            {#if packageObj.hidden}
            <span class="badge bg-success-subtle text-success">Hidden</span>
            {:else}
            <span class="badge bg-warning-subtle text-warning">Not Hidden</span>
            {/if}
        </td>
            <td>
            <div class="hstack gap-3 flex-wrap">
                
                
                
                {#if JSON.parse(sessionStorage.getItem("permissions")).includes("packages.show")}
                    <span data-bs-toggle="modal" data-bs-target="#viewPackageModal" on:click={setPackage}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View" ><i class="ri-eye-fill"></i></a></span>
                {/if}
                {#if JSON.parse(sessionStorage.getItem("permissions")).includes("packages.update")}
                    <span data-bs-toggle="modal" data-bs-target="#editPackageModal" on:click={setPackage}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit" ><i class="ri-edit-2-line"></i></a></span>
                {/if}
                {#if JSON.parse(sessionStorage.getItem("permissions")).includes("packages.destroy")}
                    <span data-bs-toggle="modal" data-bs-target="#deletePackageModal" on:click={setPackage}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"><i class="ri-delete-bin-line"></i></a></span>
                {/if}
            </div>
        </td>
    </tr>
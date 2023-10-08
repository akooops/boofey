<script>
    import { getContext } from "svelte"

    export let category


    let {categoryStore} = getContext("categoryStore")
    
    function setCategory(){
        $categoryStore = JSON.parse(JSON.stringify(category));
    }






</script>

<tr scope="row">
    <td>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1" >
        </div>
    </td>
    <td>{category.id}</td>
    <td>{category.name}</td>
    <td>{category.name_ar}</td>
    <td><span class="badge bg-primary">{category.productsCount}</span></td>
    <td>
        <div class="hstack gap-3 flex-wrap">
            
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("categories.show")}
            <span data-bs-toggle="modal" data-bs-target="#viewCategoryModal" on:click={setCategory}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View" ><i class="ri-eye-fill"></i></a></span>
            {/if}
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("categories.update")}
            <span data-bs-toggle="modal" data-bs-target="#editCategoryModal" on:click={setCategory}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit" ><i class="ri-edit-2-line"></i></a></span>
            {/if}
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("categories.destroy")}
            <span data-bs-toggle="modal" data-bs-target="#deleteCategoryModal" on:click={setCategory}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"><i class="ri-delete-bin-line"></i></a></span>
            {/if}
        
        </div>
    </td>
</tr>
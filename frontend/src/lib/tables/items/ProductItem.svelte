<script>
    import { getContext } from "svelte"
    import { goto } from '$app/navigation';
	import Product from "$lib/components/Product.svelte";

    export let product


    let {productStore} = getContext("productStore")
    
    function setProduct(){
        $productStore = JSON.parse(JSON.stringify(product));
    }






</script>

<tr scope="row">
    <td>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1" >
        </div>
    </td>
    <td>{product.id}</td>
    <td>
        <Product src={product.image.full_path} name={product.name} category={product?.category?.name}/>
    </td>
    <td>
        {#if product.sale_price}
            <span class="fs-6  text-decoration-line-through text-danger">{product.price}</span>
            <span class="fs-5">{product.sale_price}</span> 
        {:else}
            <span class="fs-5">{product.price}</span> 
        {/if}
    </td>
    <td>
        <div class="hstack gap-3 flex-wrap">
            <span data-bs-toggle="modal" data-bs-target="#viewProductModal" on:click={setProduct}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View" ><i class="ri-eye-fill"></i></a></span>
            <span data-bs-toggle="modal" data-bs-target="#editProductModal" on:click={setProduct}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit" ><i class="ri-edit-2-line"></i></a></span>
            <span data-bs-toggle="modal" data-bs-target="#deleteProductModal" on:click={setProduct}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"><i class="ri-delete-bin-line"></i></a></span>
        
        </div>
    </td>
</tr>
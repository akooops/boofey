<script>
    import { getContext } from "svelte"
    import { goto } from '$app/navigation';

    export let order


    let {orderStore} = getContext("orderStore")
    
    function setOrder(){
        $orderStore = JSON.parse(JSON.stringify(order));
    }






</script>

<tr scope="row">
    <td>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1" >
        </div>
    </td>
    <td>{order.id}</td>
    <td><span class="badge border border-primary text-primary">{order.ref}</span></td>
    <td>+ {order.tax}%</td>
    <td>+ {order.taxCalculated}</td>
    <td>- {order.discount}%</td>
    <td>{order.subtotal} SAR</td>
    <td>{order.total} SAR</td>
    <td>
        <div class="hstack gap-3 flex-wrap">
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("orders.show")}
            <a href="/admin/orders/{order.id}" target="_blank" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View" ><i class="ri-eye-fill"></i></a>
            {/if}
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("orders.update")}
            <a href="/admin/orders/{order.id}/edit" target="_blank" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit" ><i class="ri-edit-2-line"></i></a>
            {/if}
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("orders.destroy")}
            <span data-bs-toggle="modal" data-bs-target="#deleteOrderModal" on:click={setOrder}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"><i class="ri-delete-bin-line"></i></a></span>
            {/if}
        
        </div>
    </td>
</tr>
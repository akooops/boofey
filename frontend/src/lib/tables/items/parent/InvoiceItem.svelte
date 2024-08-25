<script>
    import { getContext } from "svelte"
    import { goto } from '$app/navigation';
    import {translation} from "$lib/translation.js"

    export let invoice


    let {invoiceStore} = getContext("invoiceStore")
    
    function setInvoice(){
        $invoiceStore = JSON.parse(JSON.stringify(invoice));
    }

  




</script>

<tr scope="row">
    <td>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1" >
        </div>
    </td>
    <td>{invoice.id}</td>
    <td> 
        {#if invoice?.ref == null}
        <span class="badge bg-danger-subtle text-danger">not found</span> 
        {:else}
        {invoice.ref}
        {/if}
    </td>
    <td> 
        {#if invoice?.subscription?.ref == null}
        <span class="badge bg-danger-subtle text-danger">not found</span> 
        {:else}
        {invoice.subscription.ref}
        {/if}
    </td>
    <td>{invoice.generated_at}</td>
    <td>
        {#if invoice?.subscription?.ref == null}
        <span class="badge bg-danger-subtle text-danger">not found</span> 
        {:else}
        <div class="d-flex gap-2 align-items-center">
            <div class="flex-shrink-0">
                <img src={invoice.subscription.package.school.logo.full_path} alt="" class="avatar-xs rounded-circle" />
            </div>
            {#if localStorage.getItem("language") == "ar"}
            <div class="flex-grow-1">
                {invoice.subscription.package.school.name_ar} - {invoice.subscription.package.name_ar}
            </div>
            {:else}
            <div class="flex-grow-1">
                {invoice.subscription.package.school.name} - {invoice.subscription.package.name}
            </div>
            {/if}
        </div>
        {/if}
    </td>

    <td>
        {#if invoice?.subscription?.ref == null}
        <span class="badge bg-danger-subtle text-danger">not found</span> 
        {:else}
        <div class="d-flex gap-2 align-items-center">
            <div class="flex-shrink-0">
                <img src={invoice.subscription.student.image.full_path} alt="" class="avatar-xs rounded-circle" />
            </div>
            <div class="flex-grow-1">
                {invoice.subscription.student.fullname}
            </div>
        </div>
        {/if}
    </td>
    <td>
        <div class="hstack gap-3">
            
            <a href="/invoices/{invoice.id}" target="_blank" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="{translation.print[localStorage.getItem("language")]}" ><i class="ri-printer-line"></i></a>
        </div>
    </td>
</tr>
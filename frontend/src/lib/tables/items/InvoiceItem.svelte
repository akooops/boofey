<script>
    import { getContext } from "svelte"
    import { goto } from '$app/navigation';

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
            <div class="flex-grow-1">
                {invoice.subscription.package.school.name} - {invoice.subscription.package.name}
            </div>
        </div>
        {/if}
    </td>
    <td>
        <div class="d-flex gap-2 align-items-center">
            <div class="flex-shrink-0">
                <img src={invoice.father.user.profile.image.full_path} alt="" class="avatar-xs rounded-circle" />
            </div>
            <div class="flex-grow-1">
                {invoice.father.user.profile.fullname}
            </div>
        </div>
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
        <div class="hstack gap-3 flex-wrap">
            
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("invoices.show")}
            <a href="/admin/invoices/{invoice.id}" target="_blank" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Print" ><i class="ri-printer-line"></i></a>
            {/if}
        </div>
    </td>
</tr>
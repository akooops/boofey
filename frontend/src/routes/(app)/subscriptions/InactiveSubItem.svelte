<script>
    import { getContext } from "svelte"
    import { goto } from '$app/navigation';
	import Progress from "$lib/components/Progress.svelte";
    import {translation} from "$lib/translation.js"

    export let sub


    let {subStore} = getContext("subStore")
    
    function setSub(){
        $subStore = JSON.parse(JSON.stringify(sub));
    }



</script>

<tr scope="row">
    <td>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1" >
        </div>
    </td>
    <td>{sub.id}</td>
    <td>
        <img src={sub.student.image.full_path} alt="" class="avatar-xs rounded-circle" />
        {sub.student.fullname}

    </td>

    <td>
        <div class="d-flex gap-2 align-items-center">
            <div class="flex-shrink-0">
                <img src={sub.package.school.logo.full_path} alt="" class="avatar-xs rounded-circle" />
            </div>
            {#if localStorage.getItem("language") == "ar"}
            <div class="flex-grow-1">
                {sub.package.school.name_ar} - {sub.package.name_ar}
            </div>
            {:else}
            <div class="flex-grow-1">
                {sub.package.school.name} - {sub.package.name}
            </div>
            {/if}
        </div>
    </td>
    <td>{sub.days}</td>
    <td>
        <Progress now={sub.balance} max={sub.days}/>
    </td>
    <td>
    {#if sub.should_started_at == null}
            <span class="badge bg-warning-subtle text-warning">{translation.notScheduled[localStorage.getItem("language")]}</span>
    {:else}
        sub.started_at
    {/if}
    </td>
    <td>{sub.started_at == null ? "unset" : sub.started_at}</td>
    <!-- <td>
        {#if sub.status == "scheduled"}
        <span class="badge bg-info-subtle text-info ms-1">Scheduled</span>
        {:else if sub.status == "expired"}
        <span class="badge bg-danger-subtle text-danger ms-1">Expired</span>
        {:else if sub.status == "disabled"}
        <span class="badge bg-warning-subtle text-warning ms-1">Disabled</span>
        {:else if sub.status == "inactive"}
        <span class="badge bg-dark-subtle text-dark ms-1">Inactive</span>
        {/if}
    </td> -->


    <td>
        <div class="hstack gap-3 flex-wrap">
            <!-- {#if JSON.parse(sessionStorage.getItem("permissions")).includes("orders.show")} -->
            {#if sub?.invoice == null}
                <span data-bs-toggle="modal" data-bs-target="#genSubInvoiceModal" on:click={setSub}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="{translation.genInvoice[localStorage.getItem("language")]}" ><i class="ri-file-paper-2-line"></i></a></span>
            {:else}
                <a href="/invoices/{sub.invoice.id}" target="_blank" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="{translation.print[localStorage.getItem("language")]}" ><i class="ri-file-paper-2-line"></i></a>
            {/if}            <!-- {/if} -->
          
            <span data-bs-toggle="modal" data-bs-target="#viewSubModal" on:click={setSub}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="{translation.view[localStorage.getItem("language")]}" ><i class="ri-eye-fill"></i></a></span>
            <!-- {/if} -->
            <!-- {#if JSON.parse(sessionStorage.getItem("permissions")).includes("subscriptions.show")}
            <span data-bs-toggle="modal" data-bs-target="#viewSubModal" on:click={setSub}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View" ><i class="ri-eye-fill"></i></a></span>
            {/if}
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("subscriptions.update")}
            <span data-bs-toggle="modal" data-bs-target="#editSubModal" on:click={setSub}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit" ><i class="ri-edit-2-line"></i></a></span>
            {/if}
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("subscriptions.destroy")}
            <span data-bs-toggle="modal" data-bs-target="#deleteSubModal" on:click={setSub}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"><i class="ri-delete-bin-line"></i></a></span>
            {/if} -->
        </div>
    </td>
</tr>
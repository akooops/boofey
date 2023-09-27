<script>
    import { getContext } from "svelte"
    import { goto } from '$app/navigation';
	import Progress from "$lib/components/Progress.svelte";

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
        <div class="d-flex gap-2 align-items-center">
            <div class="flex-shrink-0">
                <img src={sub.payment.package.school.logo.full_path} alt="" class="avatar-xs rounded-circle" />
            </div>
            <div class="flex-grow-1">
                {sub.payment.package.school.name} - {sub.payment.package.name}
            </div>
        </div>
    </td>
    <td>{sub.days}</td>
    <td>
        <Progress now={sub.balance} max={sub.days}/>
    </td>
    <td>{sub.should_start_at == null ? "unset" : sub.should_start_at}</td>
    <td>{sub.started_at == null ? "unset" : sub.started_at}</td>
    <td>
        {#if sub.status == "scheduled"}
        <span class="badge bg-info-subtle text-info ms-1">Scheduled</span>
        {:else if sub.status == "expired"}
        <span class="badge bg-danger-subtle text-danger ms-1">Expired</span>
        {/if}
    </td>


    <td>
        <div class="hstack gap-3 flex-wrap">
            <span data-bs-toggle="modal" data-bs-target="#viewSubModal" on:click={setSub}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View" ><i class="ri-eye-fill"></i></a></span>
        </div>
    </td>
</tr>
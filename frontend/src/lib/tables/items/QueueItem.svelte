<script>
    import { getContext } from "svelte"
    import { goto } from '$app/navigation';

    export let queue


    let {queueStore} = getContext("queueStore")
    let queueStudentsToolTip
    function setQueue(){
        $queueStore = JSON.parse(JSON.stringify(queue));
    }

    function openQueueStudents(){
        let toolTipInstance = bootstrap.Tooltip.getOrCreateInstance(queueStudentsToolTip)
        goto(`/admin/queues/${queue.id}/queueStudents`)
        toolTipInstance.hide()
    }

</script>

<tr scope="row">
    <td>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1" >
        </div>
    </td>
    <td>{queue.id}</td>
    <td><span class="badge bg-primary-subtle text-primary">{queue.type == 1 ? "Snack" : ":Main Meal"}</span></td>
    <td>{queue.started_at}</td>
    <td>{queue.studentsCount}</td>
    <td>{queue.studentsInCount}</td>
    <td>{queue.studentsExitedCount}</td>
    <td>{queue.lastSyncedAt}</td>
    
    <td>
        <div class="hstack gap-3 flex-wrap">
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("queueStudents.index")}
            <span on:click={openQueueStudents} bind:this={queueStudentsToolTip}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Queues" ><i class="bx bxs-graduation"></i></a></span>
            {/if}
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("queues.show")}
            <span data-bs-toggle="modal" data-bs-target="#viewQueueModal" on:click={setQueue}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View" ><i class="ri-eye-fill"></i></a></span>
            {/if}
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("queues.update")}
            <span data-bs-toggle="modal" data-bs-target="#editQueueModal" on:click={setQueue}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit" ><i class="ri-edit-2-line"></i></a></span>
            {/if}
            {#if JSON.parse(sessionStorage.getItem("permissions")).includes("queues.destroy")}
            <span data-bs-toggle="modal" data-bs-target="#deleteQueueModal" on:click={setQueue}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"><i class="ri-delete-bin-line"></i></a></span>
            {/if}
        </div>
    </td>
</tr>
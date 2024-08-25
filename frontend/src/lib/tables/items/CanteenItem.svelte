<script>
    import { getContext } from "svelte"
    import {PathGenCanteenAPi} from "$lib/api/paths.js"
    import { redirector } from "$lib/api/auth";
    import { goto } from '$app/navigation';

    export let canteen
    export let general
    let {canteenStore} = getContext("canteenStore")
    let {apiStore} = getContext("apiStore")

    let queuesToolTip

    
    function setCanteen(){
        $canteenStore = JSON.parse(JSON.stringify(canteen));
    }

    async function setApi(){
        let res = await fetch(PathGenCanteenAPi(canteen.id),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            },
            method:"POST",
        })
        redirector(res)

        res = await res.json()
        $apiStore = res.data.api_key    
    }

    function openQueues(){
        let toolTipInstance = bootstrap.Tooltip.getOrCreateInstance(queuesToolTip)
        goto(`/admin/canteens/${canteen.id}/queues`)
        toolTipInstance.hide()
    }

    let qrExit

    function openQrExit(){
        let toolTipInstance = bootstrap.Tooltip.getOrCreateInstance(qrExit)
        // goto(`/admin/queues/${queue.id}/queueStudents`)
        goto(`/admin/canteens/${canteen.id}/qr-exit`)
        
        toolTipInstance.hide()
    }

    let orderToolTip

    function openOrders(){
        let toolTipInstance = bootstrap.Tooltip.getOrCreateInstance(orderToolTip)
        // goto(`/admin/queues/${queue.id}/queueStudents`)
        goto(`/admin/canteens/${canteen.id}/orders`)
        
        toolTipInstance.hide()
    }


    
    </script>
    
    <tr scope="row">
        <td>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1" >
            </div>
        </td>
        <td>{canteen.id}</td>
        <td>{canteen.name}</td>
        <td>{canteen.name_ar}</td>
        {#if general}
        <td>
            <div class="d-flex gap-2 align-items-center">
                <div class="flex-shrink-0">
                    <img src={canteen.school.logo.full_path} alt="" class="avatar-xs rounded-circle" />
                </div>
                <div class="flex-grow-1">
                    {canteen.school.name}
                </div>
            </div>
        </td>
        {/if}
        <td>{canteen.address}</td>
        <td>{canteen.address_ar}</td>
        <td>
            <div class="hstack gap-3">
                {#if JSON.parse(sessionStorage.getItem("permissions")).includes("orders.index")}
                    <span on:click={openOrders} bind:this={orderToolTip}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Orders" ><i class="ri-survey-line"></i></a></span>
                {/if}
                {#if JSON.parse(sessionStorage.getItem("permissions")).includes("queues.exit")}
                    <span on:click={openQrExit} bind:this={qrExit}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Qr Exit" ><i class="ri-qr-code-line"></i></a></span>
                {/if}
                {#if JSON.parse(sessionStorage.getItem("permissions")).includes("queues.index")}
                <span on:click={openQueues} bind:this={queuesToolTip}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Queues" ><i class="ri-team-line"></i></a></span>
                {/if}
                {#if JSON.parse(sessionStorage.getItem("permissions")).includes("canteens.revoke")}
                    <span data-bs-toggle="modal" data-bs-target="#RevokeApiModal" on:click={setCanteen}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Revoke API Key" ><i class="ri-eraser-line"></i></a></span>
                {/if}
                {#if JSON.parse(sessionStorage.getItem("permissions")).includes("canteens.generate")}
                    <span data-bs-toggle="modal" data-bs-target="#ApiModal" on:click={setApi}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Generate API Key" ><i class="ri-refresh-line"></i></a></span>
                {/if}
                {#if JSON.parse(sessionStorage.getItem("permissions")).includes("canteens.show")}
                    <span data-bs-toggle="modal" data-bs-target="#viewCanteenModal" on:click={setCanteen}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View" ><i class="ri-eye-fill"></i></a></span>
                {/if}
                {#if JSON.parse(sessionStorage.getItem("permissions")).includes("canteens.update")}
                    <span data-bs-toggle="modal" data-bs-target="#editCanteenModal" on:click={setCanteen}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit" ><i class="ri-edit-2-line"></i></a></span>
                {/if}
                {#if JSON.parse(sessionStorage.getItem("permissions")).includes("canteens.destroy")}
                    <span data-bs-toggle="modal" data-bs-target="#deleteCanteenModal" on:click={setCanteen}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"><i class="ri-delete-bin-line"></i></a></span>
                {/if}
            </div>
        </td>
    </tr>


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
    
    </script>
    
    <tr scope="row">
        <td>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1" >
            </div>
        </td>
        <td>{canteen.id}</td>
        <td>{canteen.name}</td>
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
        <td>
            <div class="hstack gap-3 flex-wrap">
                <span on:click={openQueues} bind:this={queuesToolTip}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Queues" ><i class="ri-team-line"></i></a></span>
                <span data-bs-toggle="modal" data-bs-target="#RevokeApiModal" on:click={setCanteen}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Revoke API Key" ><i class="ri-eraser-line"></i></a></span>
                <span data-bs-toggle="modal" data-bs-target="#ApiModal" on:click={setApi}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Generate API Key" ><i class="ri-refresh-line"></i></a></span>
                <span data-bs-toggle="modal" data-bs-target="#viewCanteenModal" on:click={setCanteen}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View" ><i class="ri-eye-fill"></i></a></span>
                <span data-bs-toggle="modal" data-bs-target="#editCanteenModal" on:click={setCanteen}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit" ><i class="ri-edit-2-line"></i></a></span>
                <span data-bs-toggle="modal" data-bs-target="#deleteCanteenModal" on:click={setCanteen}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"><i class="ri-delete-bin-line"></i></a></span>
            </div>
        </td>
    </tr>


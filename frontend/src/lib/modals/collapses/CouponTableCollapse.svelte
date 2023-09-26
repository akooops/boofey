<script>
    import DeleteStudentModal from "$lib/modals/delete/DeleteStudentModal.svelte"

    import ModalSearchTable from "$lib/components/ModalSearchTable.svelte";
    import ModalPagination from "$lib/components/ModalPagination.svelte";
    import {PathGetCoupons} from "$lib/api/paths.js"
    import {redirector} from "$lib/api/auth.js"
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();


    import { onMount } from "svelte";
        
    let couponsList = []
    let couponsPagination
    let page = 1 
    let searchQuery = ""
    export let selected = {}

    async function fetchCoupons(){
        console.log(page,searchQuery)
        let res = await fetch(`${PathGetCoupons({page,search:searchQuery})}&expired=false`,{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            }
        })
        redirector(res)


        let couponsResponse = await res.json() 
        couponsList = couponsResponse.data
        couponsPagination = couponsResponse.pagination
    }

    onMount(() => {
        fetchCoupons()
    })

    function selectCoupon(coupon){
        selected = coupon
        dispatch("select",{coupon:selected})
    }

    function unSelectCoupon(){
        selected = {}
        dispatch("select",{coupon:selected})

    }  

    function search(e){
        page = 1
        searchQuery = e.detail.searchQuery
        fetchCoupons()
    }

    function switchPage(e){
        page = e.detail.page
        fetchCoupons()
    }

    export function resetCoupon(){
        selected = {}
    }



</script>

{#if selected?.id}
<div class="row pe-0 mb-3">
    <div class="table-responsive">
        <table class="table align-middle table-nowrap mb-0 border-top">
            <tbody class="list align-middle">
                <tr class="bg-secondary-subtle">
                    <th>{selected.id}</th>
                    <th>{selected.name}</th>
                    <th><span class="badge border border-primary text-primary">{selected.code}</span></th>
                    <th>{selected.discount}%</th>
                    <th>{selected.used}</th>
                    <th scope="col">
                        <div class="hstack gap-3 flex-wrap">
                            <a href="javascript:void(0);" on:click={unSelectCoupon} class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" ><i class="ri-close-line"></i></a>
                        </div>
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
</div>
{/if}

<ModalSearchTable type={"Coupon"} on:search={search}/>
<div class="row pe-0">
    <div class="table-responsive">
        <table class="table align-middle table-nowrap mb-0 border-top">
            <thead class="table-light">
                <tr scope="row">
                    <td scope="col">ID</td>
                    <td scope="col">Name</td>
                    <td scope="col">Code</td>
                    <td scope="col">Discount</td>
                    <td scope="col">Used</td>
                    <td scope="col">Action</td>
                </tr>
            </thead>
            <tbody class="list">
                {#each couponsList as coupon}
                <tr scope="row" class:bg-secondary-subtle={coupon.id == selected?.id}>
                    <td>{coupon.id}</td>
                    <td>{coupon.name}</td>
                    <td><span class="badge border border-primary text-primary">{coupon.code}</span></td>
                    <td>{coupon.discount}%</td>
                    <td>{coupon.used}</td>
                    <td>
                        <div class="hstack gap-3 flex-wrap">
                            <a href="javascript:void(0);" on:click={() => selectCoupon(coupon)} class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" ><i class="ri-check-line"></i></a>
                        </div>
                    </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
<ModalPagination {...couponsPagination} on:switchPage={switchPage}/>
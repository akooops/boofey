<script>
    import Pagination from "$lib/components/Pagination.svelte";
    import PaymentMethodsTable from "$lib/tables/parent/PaymentMethodsTable.svelte";
    import SearchTable from "$lib/components/SearchTable.svelte";
    import { goto } from '$app/navigation';
    import { navigating } from '$app/stores';
    import {translation} from "$lib/translation.js"
	import Progress from "$lib/components/Progress.svelte";

    // import PaymentMethodsTable from "$lib/tables/PaymentMethodsTable.svelte";
    // import AddPaymentMethodModal from "$lib/modals/add/AddPaymentMethodModal.svelte";
    import { onMount } from "svelte";
    import {initToolTip} from "$lib/init/initToolTip.js"
    import { fade } from 'svelte/transition';
    import { getContext } from "svelte"
    
    export let data
    let {selectedSchool} = getContext("selectedSchoolStore")
    let {currentFilter} = getContext("currentFilterStore")
    
    $: count = data.todaySubs.data.count
    $: date = data.todaySubs.data.date
    $: studentsList = data.todaySubs.data.students
    $: $selectedSchool = data.todaySubs.data.school
    

</script>
    

{#if $navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id}
    <div class="fw-medium align-items-center d-flex gap-4 mb-4">
        {#if $selectedSchool}
        <div class="d-flex gap-2 align-items-center">
            <div class="flex-shrink-0">
                <img src={$selectedSchool?.logo?.full_path} alt="" class="avatar-xs rounded-circle" />
            </div>
            <div class="">
                {$selectedSchool?.name} - {$currentFilter}
            </div>
        </div>
        {:else}
        Filter : {$currentFilter}
        {/if}
        <div class="d-flex gap-3 align-items-center">

        <p class="col-auto mb-0">Count: {count} </p>
        <p class="col-auto mb-0">Date:  {date}</p>

        </div>
    </div>
    <div class="row">
        <div class="">
            <table class="table align-middle mb-0 border-top">
                <thead class="table-light">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Student</th>
                        <th scope="col">School - package</th>
                        <th scope="col">Class</th>
                        <th scope="col">Status</th>
                        <th scope="col">Plan User</th>
    
                    </tr>
                 </thead>
                {#if $navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id}
                <tbody class="list">
                    {#each studentsList as student}
                    <tr scope="row">
                        <td>{student.id}</td>
                        <td>
                            <div class="d-flex gap-2 align-items-center">
                                <div class="flex-shrink-0">
                                    <img src={student.image.full_path} alt="" class="avatar-xs rounded-circle" />
                                </div>
                                <div class="flex-grow-1">
                                    {student.fullname}
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="d-flex gap-2 align-items-center">
                                <div class="flex-shrink-0">
                                    <img src={student.school?.logo?.full_path} alt="" class="avatar-xs rounded-circle" />
                                </div>
                                <div class="flex-grow-1">
                                    {student.school?.name} - {student.active_subscription.package?.name}
                                </div>
                            </div>
                        </td>
                        <td>{student.className}</td>
                        <td>
                            {#if student.subscribed}
                                <span class="badge bg-success-subtle text-success">{translation.subscribed[localStorage.getItem("language")]}</span>
                            {:else}
                                <span class="badge bg-danger-subtle text-danger">{translation.notSubscribed[localStorage.getItem("language")]}</span>
                            {/if}
                        </td>
                       
                        <td class="col-2">
                            <Progress now={student.active_subscription.balance} max={student.active_subscription.days}/>
                        </td>
                    </tr>
                    {/each}
                </tbody>
                {/if}
            </table>
    
        </div>
    </div>
    <div class="hstack gap-2 justify-content-end d-print-none mt-4">
        <a href="javascript:window.print()" class="btn btn-info"><i class="ri-printer-line align-bottom me-1"></i> {translation.print[localStorage.getItem("language")]}</a>
    </div>
{/if}






{#if $navigating?.from?.route?.id == $navigating?.to?.route?.id  && $navigating}
    <div class="text-center">
        <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#695eef,secondary:#73dce9" style="width:120px;height:120px"></lord-icon>
    </div>
{/if}
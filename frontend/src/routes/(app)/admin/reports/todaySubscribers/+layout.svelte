<script>
    import { goto } from '$app/navigation';
    import {translation} from "$lib/translation.js"
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';

    import { onMount } from "svelte";
    import {initToolTip} from "$lib/init/initToolTip.js"
    import { fade } from 'svelte/transition';
    import SchoolsTableCollapse from '$lib/modals/collapses/SchoolsTableCollapse.svelte';
    import DivisionsTableCollapse from "$lib/modals/collapses/DivisionsTableCollapse.svelte";

    import { page } from '$app/stores';

    export let data

    let close
    let level = "all"
    let grade = "all"
    let filterType = "level"
    onMount(() => {

        level = $page.url.searchParams.get("level")
        if(level == null){
            grade = $page.url.searchParams.get("grade")
            if(grade){
                filterType = "grade"
            }
        }
        level = level == null ? "all" : parseInt(level)
        grade = grade == null ? "all" : parseInt(grade)
    })

    let grades = [
        { value: 0, name: 'Primary School Grade 1' },
        { value: 1, name: 'Primary School Grade 2' },
        { value: 2, name: 'Primary School Grade 3' },
        { value: 3, name: 'Primary School Grade 4' },
        { value: 4, name: 'Primary School Grade 5' },
        { value: 5, name: 'Primary School Grade 6' },
        { value: 6, name: 'Middle School Grade 7' },
        { value: 7, name: 'Middle School Grade 8' },
        { value: 8, name: 'Middle School Grade 9' },
        { value: 9, name: 'Secondary School Grade 10' },
        { value: 10, name: 'Secondary School Grade 11' },
        { value: 11, name: 'Secondary School Grade 12' }
    ]
    let levels = [
        { value: 0, name: 'Primary School' },
        { value: 1, name: 'Meduim School' },
        { value: 2, name: 'Secondary School' },
    ]



    let selectedSchool = writable({})
    let selectedDivision = writable({})
    let currentFilter = writable("All")
    setContext('selectedSchoolStore', {
        selectedSchool,
        selectedDivision
    });
    setContext('currentFilterStore', {
        currentFilter,
    });

    function selectSchool(e){
        $selectedSchool = e.detail.school
        // if(e.detail.school != null){
        //     close.click()
        //     goto(`/admin/reports/todaySubscribers/${e.detail.school.id}`)
        // }
    }


    function applyFilters(){
        const url = new URL($page.url);
        if(filterType == "level"){
            
            url.searchParams.delete("grade")
            url.searchParams.set("level",level)
        }else {
            url.searchParams.delete("level")
            url.searchParams.set("grade",grade)
        }
        level == "all" && url.searchParams.delete("level")
        grade == "all" && url.searchParams.delete("grade")

        $currentFilter = "All"
        if(filterType == "level" && level != "all") {
            $currentFilter = levels.find(levelObj => levelObj.value == level).name;
        }else if(filterType == "grade" && grade != "all"){
            $currentFilter = grades.find(gradeObj => gradeObj.value == grade).name;
        }

        goto(url)

    }
    function applySchool(){
            close.click()
            goto(`/admin/reports/todaySubscribers/${$selectedSchool.id}?division=${$selectedDivision.id}`)
    }

    </script>
    <div class="row"  in:fade={{duration: 200 }}>
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header align-items-center d-flex d-print-none">
                    <h4 class="card-title mb-0 flex-grow-1">Daily Preparation</h4>
                    <div class="flex-shrink-0">
                        <!-- <AddPaymentMethodModal /> -->
                    </div>
                </div><!-- end card header -->
            </div><!-- end card -->

            <div class="card">
                <div class="card-header align-items-center d-flex d-print-none flex-wrap">
                    {#if $selectedSchool?.logo != null}
                    <img src={$selectedSchool?.logo?.full_path} alt="" class="avatar-xs rounded-circle me-2" />
                    {/if}
                    <h4 class="card-title mb-0">{$selectedSchool?.name ? $selectedSchool.name : "No School Selected"} <span data-bs-toggle="modal" data-bs-target="#selectSchool"><a href="javascript:void(0);"  data-bs-toggle="tooltip" data-bs-original-title="Select" ><i class="ri-edit-2-line"></i></a></span></h4>

                    <div class=" d-flex align-items-center ms-auto">
                        <!-- <AddPaymentMethodModal /> -->
                        <!-- Select -->
                        <div class="d-flex align-items-center gap-2">
                            <label for="firstName" class="form-label mb-0 text-nowrap">Filter By : </label>
                            <select class="form-select" name="class" id="class" aria-label="Default select example" bind:value={filterType}>
                                <option value={"level"}>Level</option>
                                <option value={"grade"}>Grade</option>
                            </select>
                        </div>
                        <span class="ms-3">
                        {#if filterType == "level"}
                            <div class="d-flex align-items-center gap-2">
                                <label for="firstName" class="form-label mb-0">Level</label>
                                <select class="form-select" name="class" id="class" aria-label="Default select example" bind:value={level}>
                                    <option value={"all"}>All</option>
                                    <option value={0}>Primary School</option>
                                    <option value={1}>Meduim School</option>
                                    <option value={2}>Secondary School</option>
                                </select>
                            </div>
                            {:else}
                            <div class="d-flex align-items-center gap-2">
                                <label for="firstName" class="form-label mb-0">Grade</label>
                                <select class="form-select" name="class" id="class" aria-label="Default select example" bind:value={grade}>
                                    <option value={"all"}>All</option>
                                    {#each grades as grade}
                                        <option value={grade.value}>{grade.name}</option>
                                    {/each}
                                </select>
                            </div>
                            {/if}
                        </span>
                        
                        <button type="button"  class="btn btn-primary waves-effect waves-light ms-3" on:click={applyFilters}>Apply</button>
                    </div>
                </div><!-- end card header -->
                <div class="card-body">
                    
                    <slot />
    
                </div>
            </div><!-- end card -->
        </div>
        
    </div>

    <div class="modal  fade" id="selectSchool" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="exampleModalgridLabel" aria-modal="true" style="display: none;" >

        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Select School</h5>
                    <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
                </div>
              
                <div class="modal-body">
                  <!-- <div class="row mb-4">
                    
                    </div> -->
                        <div class="row g-3">
                        <SchoolsTableCollapse collapse={false} on:select={selectSchool} selected={$selectedSchool} title={"Schools"}/>        
                        
                        <DivisionsTableCollapse collapse={true} schoolId={$selectedSchool.id} on:select={(e) => $selectedDivision = e.detail.division}  selected={$selectedDivision} title={"Division"}/>
                            
                        </div>
                        <div class="hstack gap-2 justify-content-end mt-4">
                            <button type="button" class="btn btn-light fw-light hidden" data-bs-dismiss="modal" bind:this={close}>Close</button>
                            <button type="button" class="btn btn-primary waves-effect waves-light" on:click={applySchool}>Apply</button>
                        </div>
                </div>
        </div>
    </div>
    </div>
    
    
<script>
    import { onMount } from "svelte";
    import {initToolTip} from "$lib/init/initToolTip.js"
    import { fade } from 'svelte/transition';
    import { setContext } from 'svelte';
    import { toast } from "$lib/components/toast.js";
    import { invalidate } from '$app/navigation';

    import { writable } from 'svelte/store';
    import { PathSMSNumbers, PathSMSParents, PathGetParents, PathSMSCondition} from "$lib/api/paths";
    import { redirector } from "$lib/api/auth";
    import { phoneMask } from "$lib/inputMasks.js";
import Pagination from "./pagination.svelte";
import Accordion from "../../../../lib/components/Accordion.svelte";


    export let data
    let form 
    let errors
    let loading = false 
    let numberInput
    let parentInput
    let selectedMethod = ""
    let parents = []
    let parentsPagination
    let page = 1
    let conditionType = "all"
    
    let smsContent = writable({
        message:"",
        numbers:[],
        parents:[]
    })
    setContext('smsContentStore', {
        smsContent
    });

    let smsPage
    onMount(async () => {
        initToolTip(smsPage)
        
        if(JSON.parse(sessionStorage.getItem("permissions")).includes("sms.sendSMS")){
            selectedMethod = "numbers"
        }else if(JSON.parse(sessionStorage.getItem("permissions")).includes("sms.sendParentsSMS")){
            selectedMethod = "parents"
        }
        if(JSON.parse(sessionStorage.getItem("permissions")).includes("sms.sendParentsSMS")){
            await searchParents()
        }
    })

    function addNumber(){
        if(numberInput.value.length != 10){
            errors = {
                numbers:["number needs to be 10 digits"]
            }
            return;
        }

        if(numberInput.value != ""){
            $smsContent.numbers = [...$smsContent.numbers,numberInput.value]
            numberInput.value = ""
            phoneMask()
        }
    }

    function removeNumber(i){
        $smsContent.numbers.splice(i,1)
        $smsContent.numbers = $smsContent.numbers
    }

    async function searchParents(){
        parents = []
        page = 1
        let value = parentInput?.value ? parentInput.value : ""
        let res = await fetch(PathGetParents({page,search:value}),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            }
        })
        redirector(res)


        let parentsResponse = await res.json() 
        parents = parentsResponse.data.fathers
        parentsPagination = parentsResponse.pagination
    }


    async function compose(){
        loading = true
        errors = {}
        let formData = new FormData(form)
        let path
        if(selectedMethod == "parents"){
            let parentIds = $smsContent.parents.map(parent => parent.id);
            formData.set("parents",JSON.stringify(parentIds))
            path = PathSMSParents()
        }else if(selectedMethod == "numbers"){
            formData.set("numbers",JSON.stringify($smsContent.numbers))
            path = PathSMSNumbers()
        }else if(selectedMethod == "condition"){
            path = PathSMSCondition()

        }
        
        let res = await fetch(path,{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            },
            method:"POST",
            body:formData
        })
        redirector(res)
    
    
        

        res = await res.json()
        loading = false
        if(res.status == "success") {
            let text = `Sent SMS successfully` 
            toast(text,"success")
            invalidate("sms:refresh")
            $smsContent = {
                message:"",
                numbers:[],
                parents:[]
            }
        }else {
            errors = res.errors
        }

        

        
    }

    function changePage(e){
        page = e.detail
        searchParents()
    }

    function addParent(id){
        let parentExist = $smsContent.parents.some(parent => parent.id == id);
        if(!parentExist){
            let targetParent = parents.find(parent => parent.id == id);
    
            $smsContent.parents =  [...$smsContent.parents,targetParent]
        }
    }

    function removeParent(id){
        $smsContent.parents = $smsContent.parents.filter(parent => parent.id != id);
    }

    function addAlias(alias){
        $smsContent.message += ` ${alias} `
    }


</script>
    <div class="row"  in:fade={{duration: 200 }} bind:this={smsPage}>
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header align-items-center d-flex">
                    <h4 class="card-title mb-0 flex-grow-1">SMS</h4>
                </div><!-- end card header -->
                <!-- {#if JSON.parse(sessionStorage.getItem("permissions")).includes("fathers.index")} -->
                <div class="card-body">
    
                    <!-- <div class="live-preview"> -->
                        <!-- Example Textarea -->
                        <form  on:submit|preventDefault={compose} bind:this={form} class="">
                            <div class="row g-3 col-lg-9 col-xs-12">
                                <div>
                                    <label for="exampleFormControlTextarea5" class="form-label">Message</label>
                                    <textarea class="form-control" name="message" id="exampleFormControlTextarea5" bind:value={$smsContent.message} rows="3"></textarea>
                                    {#if errors?.message}
                                    <strong class="text-danger ms-1 my-2">{errors.message[0]}</strong>
                                    {/if}
                                    {#if selectedMethod == "condition"}
                                        <div class="hstack gap-2 mt-2">
                                            <button class="btn btn-soft-info waves-effect waves-light" type="button" id="button-addon2" on:click={() => addAlias("%%parent_name%%")}>Parent Name</button>
                                        
                                            {#if conditionType == "subscribed"}

                                            <button class="btn btn-soft-info waves-effect waves-light" type="button" id="button-addon2" on:click={() => addAlias("%%student_name%%")}>Student Name</button>
                                            <button class="btn btn-soft-info waves-effect waves-light" type="button" id="button-addon2" on:click={() => addAlias("%%remaining_days%%")}>Remaining Days</button>

                                            {:else if conditionType == "not_subscribed"}
                                            <button class="btn btn-soft-info waves-effect waves-light" type="button" id="button-addon2" on:click={() => addAlias("%%student_name%%")}>Student Name</button>

                                            {/if}
                                        </div>
                                    {/if}

                                </div>
                                <div>
                                    <label  class="form-label">SMS Type</label>
                                    <select class="form-select mb-3" bind:value={selectedMethod}>
                                        {#if JSON.parse(sessionStorage.getItem("permissions")).includes("sms.sendSMS")}
                                        <option value="numbers">Numbers</option>
                                        {/if}
                                        {#if JSON.parse(sessionStorage.getItem("permissions")).includes("sms.sendParentsSMS")}
                                        <option value="parents">Parents</option>
                                    {/if}
                                    <option value="condition">Condition</option>
                                    </select>
                                </div>
                                
                                {#if selectedMethod == "numbers" && JSON.parse(sessionStorage.getItem("permissions")).includes("sms.sendSMS")}
                                    <div class="col-xs-12 col-lg-6">
                                        <div class="input-group">
                                            <input type="tel" class="form-control col-1" bind:this={numberInput} use:phoneMask aria-describedby="button-addon2">
                                            <button class="btn btn-primary waves-effect waves-light" type="button" id="button-addon2" on:click={addNumber}><i class="ri-add-line align-bottom me-1" ></i>Add</button>
                                        </div>
                                        {#if errors?.numbers}
                                        <strong class="text-danger ms-1 my-2">{errors.numbers[0]}</strong>
                                        {/if}
                                    </div>
                                    <div class="col-xs-12 col-lg-6"></div>
                                    <div class="col-12">
                                        {#each $smsContent.numbers as number,i}
                                            <span class="ms-1 badge bg-primary numberBadge" type="button" on:click={() => removeNumber(i)}>{number} <i class="ri-close-line align-bottom"></i></span>
                                        {/each}
                                    </div>
                                {:else if selectedMethod == "parents" && JSON.parse(sessionStorage.getItem("permissions")).includes("sms.sendParentsSMS")}
                                


                                    <div class="col-xs-12 col-lg-6">
                                        <div class="input-group">
                                            <input type="text" class="form-control col-1" bind:this={parentInput} aria-describedby="button-addon2">
                                            <button class="btn btn-primary waves-effect waves-light" type="button" id="button-addon2" on:click={searchParents}>Search</button>
                                        </div>
                                        {#if errors?.parents}
                                        <strong class="text-danger ms-1 my-2">{errors.parents[0]}</strong>
                                        {/if}
                                    </div>

                                    <div class="col-xs-12 col-lg-6"></div>

                                    <Accordion title="Parents" id="parentsSms">
                                        <span class="row g-3">
                                            <div class="col-xs-12 col-lg-6">
                                                <label for="role" class="form-label">Parents</label>
                                                <ul class="list-group">
                                                    {#each parents as parent,i (parent.id)}
                                                    {#if $smsContent.parents.some(selectedParent => selectedParent.id == parent.id)}
                                                    <li class="list-group-item disabled bg-primary-subtle" type="button" on:click={() => addParent(parent.id)}>
                                                        <div class="d-flex align-items-center">
                                                            <div class="flex-shrink-0">
                                                                <img src={parent.user.profile.image.full_path} alt="" class="avatar-xs rounded-circle">
                                                            </div>
                                                            <div class="flex-grow-1 ms-2 text-truncate">
                                                                {parent.user.username}
                                                            </div>
                                                        </div>
                                                    </li>
                                                    {:else}
                                                    <li class="list-group-item list-group-item-action" type="button" on:click={() => addParent(parent.id)}>
                                                        <div class="d-flex align-items-center">
                                                            <div class="flex-shrink-0">
                                                                <img src={parent.user.profile.image.full_path} alt="" class="avatar-xs rounded-circle">
                                                            </div>
                                                            <div class="flex-grow-1 ms-2 text-truncate">
                                                                {parent.user.username}
                                                            </div>
                                                        </div>
                                                    </li>
                                                    {/if}
                                                    {/each}
    
                                                </ul>
                                                {#if parentsPagination}
                                                <Pagination {...parentsPagination} on:page={changePage}/>
                                                {/if}
                                            </div>
                                            <div class="col-xs-12 col-lg-6">
                                                <label for="role" class="form-label">Selected Parents</label>
                                                <ul class="list-group">
                                                    {#each $smsContent.parents as parent}
                                                    <li class="list-group-item list-group-item-action selectedParent" type="button" on:click={() => removeParent(parent.id)}>
                                                        <div class="d-flex align-items-center">
                                                            <div class="flex-shrink-0">
                                                                <img src={parent.user.profile.image.full_path} alt="" class="avatar-xs rounded-circle">
                                                            </div>
                                                            <div class="flex-grow-1 ms-2">
                                                                {parent.user.username}
                                                            </div>
                                                        </div>
                                                    </li>
                                                    {/each}
    
                                                </ul>
    
    
                                            </div>

                                        </span>


                                    </Accordion>
                                {:else if selectedMethod == "condition" }
                                    <div>
                                    <label  class="form-label">Condition Type</label>
                                        <select class="form-select mb-3" name="condition" bind:value={conditionType}>
                                            <option value="all">All</option>
                                            <option value="subscribed">Subscribed</option>
                                            <option value="not_subscribed">Not Subscribed</option>
                                        </select>
                                    </div>
                                    
                                    

                                {/if}


                                <div class="hstack gap-2 justify-content-end">
                                    <input type="submit" class="btn btn-primary waves-effect waves-light" value="Compose">
                                </div>
                            </div>

                           

                        </form>
                            <!--end col-->
                        
                        <!--end row-->
                    <!-- </div> -->
                </div><!-- end card-body -->
                <!-- {/if} -->
            </div><!-- end card -->
        </div>
        <!-- end col -->
    </div>


    <style>
        .numberBadge:hover {
            background-color: #E12828 !important;
        }
        .selectedParent:hover {
            background-color: var(--vz-danger-bg-subtle) !important;
        }
    </style>
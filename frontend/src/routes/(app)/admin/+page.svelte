<script>
	import CountCard from "$lib/components/cards/CountCard.svelte";
	import LastSubs from "./LastSubs.svelte";
    import ExpiringSubs from "./ExpiringSubs.svelte"
    import DoneByCanteens from "./DoneByCanteens.svelte"


    export let data 
    $:count = data.count 


</script>

<div class="row mb-3 pb-1">
    <div class="col-12">
        <div class="d-flex align-items-lg-center flex-lg-row flex-column">
            <div class="flex-grow-1">
                <h4 class="fs-16 mb-1">Good Morning, Anna!</h4>
                <p class="text-muted mb-0">Here's what's happening with your store today.</p>
            </div>
            <div class="mt-3 mt-lg-0">
                <form action="javascript:void(0);">
                    <div class="row g-3 mb-0 align-items-center">
                        <div class="col-sm-auto">
                            <div class="input-group">
                                <input type="text" class="form-control border-0 dash-filter-picker shadow" data-provider="flatpickr" data-range-date="true" data-date-format="d M, Y" data-deafult-date="01 Jan 2022 to 31 Jan 2022">
                                <div class="input-group-text bg-primary border-primary text-white">
                                    <i class="ri-calendar-2-line"></i>
                                </div>
                            </div>
                        </div>
                        <!--end col-->
                        <!--end col-->
                    </div>
                    <!--end row-->
                </form>
            </div>
        </div><!-- end card header -->
    </div>
    <!--end col-->
</div>


<div class="row">
<CountCard title={"Subscribers"} icon={"ri-refund-2-line"} {...count.subscribersCount}/>
<CountCard title={"Students"} icon={"ri-user-2-line"} {...count.studentsCount}/>
<CountCard title={"Parents"} icon={"bx-user-circle"} {...count.fathersCount}/>
<CountCard title={"Subscriptions Total"} symbol="SAR" icon={"bx-dollar-circle"} {...count.subscriptionsTotal}/>
<CountCard title={"Orders Total"} symbol="SAR" icon={"ri-survey-line"} {...count.ordersTotal}/>
</div> <!-- end row-->

<div class="row">
<DoneByCanteens />
</div>

<div class="row">
    <LastSubs/>
    <ExpiringSubs />
</div>
<script>

import { Calendar, formatDate } from 'fullcalendar'
import {staticCalendarOptions,ResponsiveView,addDay,subDay} from "$lib/init/initCalendar.js"
import { PathUpdateAcademicBreak } from "$lib/api/paths";
import { toast } from "$lib/components/toast.js";
import { invalidate } from '$app/navigation';
import { getContext } from 'svelte';
import { createEventDispatcher } from 'svelte';
import { redirector } from "$lib/api/auth";


const dispatch = createEventDispatcher();

let calendarInstance

export let year

let breaksListStore  = getContext("breaksListStore")
let breakStore  = getContext("breakStore")
let addBtn
let viewBtn

let calendarBreaks
function Init(node){
    let staticOptions = staticCalendarOptions()


    calendarInstance = new Calendar(node,{
        ...staticOptions,
        validRange: {
            start: year.from,
            end: addDay(undefined,year.to)
        },
        windowResize:(view) => ResponsiveView(calendarInstance,view),
        dateClick:(info) => {
            
            $breakStore.from = info.dateStr
            $breakStore.fromBtn = true
            addBtn.click()
        },
        eventClick: (info) => {
            $breakStore = JSON.parse(JSON.stringify(info.event.extendedProps))
            $breakStore.id = info.event.id
            // console.log(info.event.startStr , info.event.endStr)
            viewBtn.click()
        },
        eventResize:editEvent,
        eventDrop:editEvent

        // events: calendarBreaks
    })
    calendarInstance.render();
    calendarInstance.addEventSource(calendarBreaks)

}
breaksListStore.subscribe(() => {
    calendarBreaks = $breaksListStore.map(breakObj => ({
        ...breakObj,
        start: breakObj.from,
        end: addDay(breakObj.from,breakObj.to),
        title:breakObj.name,
        className: "bg-danger-subtle",
        // allDay:true
    }));
    
    calendarInstance?.removeAllEvents()
    calendarInstance?.addEventSource(calendarBreaks)

})

async function editEvent(info){
    let formData = new FormData()
    formData.append("name",info.event.title)
    formData.append("from",info.event.startStr)
    let to = subDay(info.event.startStr,info.event.endStr)
    
    formData.append("to",to)

    let res = await fetch(PathUpdateAcademicBreak(info.event.id),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        },
        method:"POST",
        body:formData
    })
    redirector(res)

    res = await res.json()
    

    if(res.status == "success") {
        let text = `Edited #${info.event.id}  ${info.event.title}` 
        toast(text,"success")
        invalidate("breaks:refresh")
    }





}


</script>




<!-- <button on:click={add}>Click</button> -->
<div class="calendar" use:Init  ></div>

<button bind:this={addBtn}  class="btn btn-primary w-100 d-none" id="btn-new-event" data-bs-toggle="modal" data-bs-target="#addBreakModal"><i class="mdi mdi-plus"></i> New Academic Break</button>
<button bind:this={viewBtn} class="btn btn-primary w-100 d-none" id="btn-new-event" data-bs-toggle="modal" data-bs-target="#viewBreakModal"><i class="mdi mdi-plus"></i> New Academic Break</button>

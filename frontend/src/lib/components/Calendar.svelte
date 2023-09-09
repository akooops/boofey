<script>

import { Calendar, formatDate } from 'fullcalendar'
import {staticCalendarOptions,ResponsiveView} from "$lib/init/initCalendar.js"
import { PathUpdateAcademicBreak } from "$lib/api/paths";
import { toast } from "$lib/components/toast.js";
import { invalidate } from '$app/navigation';
import { getContext } from 'svelte';
import { createEventDispatcher } from 'svelte';

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
            end: year.to
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
        end: breakObj.to,
        title:breakObj.name,
        className: "bg-danger-subtle",
    }));
    
    calendarInstance?.removeAllEvents()
    calendarInstance?.addEventSource(calendarBreaks)

})

async function editEvent(info){
    let formData = new FormData()
    formData.append("name",info.event.title)
    formData.append("from",info.event.startStr)
    formData.append("to",info.event.endStr)

    let res = await (await fetch(PathUpdateAcademicBreak(info.event.id),{
        method:"POST",
        body:formData
    })).json()

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

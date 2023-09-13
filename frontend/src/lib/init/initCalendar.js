// import { Calendar } from 'fullcalendar'


function getInitialView() {
    if (window.innerWidth >= 768 && window.innerWidth < 1200) {
        return 'timeGridWeek';
    } else if (window.innerWidth <= 768) {
        return 'listMonth';
    } else {
        return 'dayGridMonth';
    }
}
export function staticCalendarOptions(){
    let options = {
        timeZone: 'local',
        editable: true,
        droppable: true,
        selectable: true,
        navLinks: true,
        defaultAllDay:true,
        initialView: getInitialView(),
        themeSystem: 'bootstrap',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,listMonth'
        }
    } 
    return options;
}

export function ResponsiveView(calendar,view){
    var newView = getInitialView();
    calendar.changeView(newView);
}

export function addDay(from,to){
    if(from == to){
        return from
    }

    const date = new Date(to);

    // Add a day to the date
    date.setDate(date.getDate() + 1);

    // Get the new year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export function subDay(from,to){
    if(from == to || to == ""){
        return from
    }

    const date = new Date(to);

    // Add a day to the date
    date.setDate(date.getDate() - 1);

    // Get the new year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

}


// export function InitCalendar(node){

//     const calendar = new Calendar(node,{
        
//         windowResize: function (view) {
//             var newView = getInitialView();
//             calendar.changeView(newView);
//         },
//         eventResize: function(info) {
//         },
//         eventClick: function (info) {},
//         dateClick: function (info) {
//         },
//         events: defaultEvents,
//         eventReceive: function (info) {
//             var newid = parseInt(info.event.id);
//             var newEvent = {
//                 id: newid,
//                 title: info.event.title,
//                 start: info.event.start,
//                 allDay: info.event.allDay,
//                 className: info.event.classNames[0]
//             };
//             defaultEvents.push(newEvent);
//             upcomingEvent(defaultEvents);
//         },
//         eventDrop: function (info) {
//             var indexOfSelectedEvent = defaultEvents.findIndex(function (x) {
//                 return x.id == info.event.id
//             });
//             if (defaultEvents[indexOfSelectedEvent]) {
//                 defaultEvents[indexOfSelectedEvent].title = info.event.title;
//                 defaultEvents[indexOfSelectedEvent].start = info.event.start;
//                 defaultEvents[indexOfSelectedEvent].end = (info.event.end) ? info.event.end : null;
//                 defaultEvents[indexOfSelectedEvent].allDay = info.event.allDay;
//                 defaultEvents[indexOfSelectedEvent].className = info.event.classNames[0];
//                 defaultEvents[indexOfSelectedEvent].description = (info.event._def.extendedProps.description) ? info.event._def.extendedProps.description : '';
//                 defaultEvents[indexOfSelectedEvent].location = (info.event._def.extendedProps.location) ? info.event._def.extendedProps.location : '';
//             }
//             upcomingEvent(defaultEvents);
//         }
//     })

// }

function Calendar() {
    "use strict"
    
    $('#calendar').fullCalendar({
        height: "auto",
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listWeek'
        },

        events: [],

        
        //additional feature to add your own events
        dayClick: function (calEvent, jsEvent, view) {
            neweventclick(calEvent); 
        },
        
        //to update event
        eventClick: function (calEvent, jsEvent, view) {
            updateeventclick(calEvent);
        },

        //render event information correctly
        eventRender: function (event, element) {
            element.find('.fc-title').html("<br/>" + event.title + "<br/>" + event.description);
            var nextEventLeft = element.offset().left + element.width() + 5;
            element.parent().children().eq(element.index() + 1).css('left', nextEventLeft);
        },

        displayEventEnd: true,
        timeFormat: 'HH:mm',

    });
}
    

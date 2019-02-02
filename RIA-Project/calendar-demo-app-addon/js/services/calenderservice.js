"use strict"

var CalendarService = { //calendar functions

    //iterate over array with exams and add every cours to the calendar
    addExamDates: function (examArray) {
        examArray.forEach(function (exam) {
            var title = exam.Title;
            var description = "Status: " + exam.ExamStatusReadable;
            var date = DateParser.examDateParse(exam.Date);
            var color = "#fce000";
            var editable = true;
            CalendarService.createEvent(title, description, date.start, date.end, color);
        });
    },

    //iterate over array with courses and add every cours to the calendar
    addCourseDates: function (courseArray) {
        courseArray.forEach(function (course) {
            if (course.Type === "VO" || course.Type === user.group) {
                var title = course.Title;
                var description = course.Type;
                var start = DateParser.secondsToDate(course.Start);
                var end = DateParser.secondsToDate(course.End);
                var color = "#449eff";
                CalendarService.createEvent(title, description, start, end, color);
            }
        });
    },

    //create event on calendar
    createEvent: function (title, description, start, end, color) {
        var event = {
            title: title,
            description: description,
            start: moment(start).format(),
            end: moment(end).format(),
            color: color,
            allDay: false
        }
        
        
        if (event.start === "Invalid date") {
            console.log("Invalid date");
        } else {
            event.end = event.end === "Invalid date" ? (moment(event.start).add(1, 'hour')).format() : event.end;

            //check if event is already shown at the moment
            if (checkAvailability(event)) {
                $('#calendar').fullCalendar('renderEvent', event, true);
                CalendarDao.createEvent(event);
            } else {
                console.log("In create event already shown");
            }

        }
        

    },
        
    
    //update event on the calendar
    updateEvent: function (event) {
        $('#calendar').fullCalendar('updateEvent', event);
        CalendarDao.updateEvent(event);
    },

    //delete a specific event on the calendar
    deleteEvent: function (event) {
        $('#calendar').fullCalendar('removeEvents', event._id);
        CalendarDao.deleteEvent(event);
    },

    //delete all events on the calendar
    deleteAllEvents: function () {
        $('#calendar').fullCalendar('removeEvents');
        CalendarDao.deleteAllEvents();
    },

    getAllEvents: function () {
        return CalendarDao.findAllEvents();
    },

    // time management is buggy as hell --> iso form with T to standardized form
    addArray: function (array) {
        $("#calendar").fullCalendar('addEventSource', array);
    }
    
    
}




//create new event click on calendar
function neweventclick(event) {
    var date = DateParser.momentToForm(event._d);
    console.log(date);
    $('#event_startday').val(date.day);
    $('#event_starttime').val(date.time);

    $('#event_window').dialog({
        width: 'auto',
        height: 'auto',
        buttons: [
            {
                text: 'Create',
                click: function () {
                    var val = getFormData();
                    if (val.title === "") {
                        console.log("title value missing");
                        $("#event_title").notify("Missing value");
                    } else if (val.start === "") {
                        console.log("title value missing");
                        $("#event_startday").notify("Missing value");
                    } else {
                        var color = "#00FF7F";
                        CalendarService.createEvent(val.title, val.description, val.start, val.end, color);
                        $("#event_window").dialog("close");
                    }
                
                }
        }, {
                text: 'Clear',
                click: function () {
                    $('#event_title').val("");
                    $('#event_description').val("");
                    $('#event_enddate').val("");
                    $('#event_endtime').val("");
                }
        }, {
                text: 'Close',
                click: function () {
                    $("#event_window").dialog("close");
                }
        }
    ]
    });

    $("#button_list").buttonset();
}




//create event click on calendar 
function updateeventclick(event) {
    
    var startform = DateParser.momentToForm(event.start);
    var endform = DateParser.momentToForm(event.end);
    
    
    $('#event_title').val(event.title);
    $('#event_description').val(event.description);
    $('#event_startday').val(startform.day);
    $('#event_starttime').val(startform.time);
    $('#event_enddate').val(endform.day);
    $('#event_endtime').val(endform.time);

    $('#event_window').dialog({
        width: 'auto',
        height: 'auto',
        buttons: [
            {
                text: 'Update',
                click: function () {
                    var temp = getFormData();
                    event.title = temp.title;
                    event.description = temp.description;
                    event.start = temp.start;
                    event.end = temp.end;
                    CalendarService.updateEvent(event);
                    $("#event_window").dialog("close");
                }
        }, {
                text: 'Delete',
                click: function () {
                    CalendarService.deleteEvent(event);
                    $("#event_window").dialog("close");
                }
        }, {
                text: 'Close',
                click: function () {
                    $("#event_window").dialog("close");
                }
        }
    ]
    });

    $("#button_list").buttonset();
}


function checkAvailability(event) {
    var available = true;
    $('#calendar').fullCalendar('clientEvents', function (evt) {
        if (evt.title === event.title && event.start == evt.start._i) {
            available = false;
        }
    });
    return available;
}


function getFormData() {
    var title = $('#event_title').val();
    var description = $('#event_description').val();
    var startday = $('#event_startday').val();
    var starttime = $('#event_starttime').val();
    var endday = $('#event_enddate').val();
    var endtime = $('#event_endtime').val();
    var start = DateParser.toDate(startday, starttime);
    var end = DateParser.toDate(endday, endtime);
    var obj = {
        "title": title,
        "description": description,
        "start": start,
        "end": end
    };
    return obj;
}
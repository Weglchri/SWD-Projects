"use strict"

// CalendarDao only access to localStorage
var CalendarDao = {

    //create event --> if the event already exists it won't get persistet
    createEvent: function (event) {
        var Items = CalendarDao.findAllEvents() || [];
        if (CalendarDao.findEvent(event)) {
            Items.push(event); 
        } else {
            console.log("already exists");
        }
        localStorage.setItem(user.username, JSON.stringify(Items));
    },

    
    //add array with Objects for logged-in user 
    addNewEventArray: function (array) {
        CalendarDao.deleteAllEvents();
        localStorage.setItem(user.username, JSON.stringify(array));
    },

    
    
    //find event in localStorage and return - if found "true" - if not "false"
    findEvent: function (event) { 
        var Items = CalendarDao.findAllEvents();
        if (Items !== null) {
            for (var i = 0; i < Items.length; i++) {
                if (JSON.stringify(Items[i]) == JSON.stringify(event)) {
                    return false;
                }
            }
        } else {
            console.log("storage empty");
            return true;
        }
        console.log("event not found");
        return true;
    },

    
    
    //return all elements in the localStorage of logged-in user
    findAllEvents: function () {
        return JSON.parse(localStorage.getItem(user.username));
    },

    
    // delete specific event
    deleteEvent: function (event) {
        var Items = CalendarDao.findAllEvents();
        if (Items !== null) {
            for (var i = 0; i < Items.length; i++) {
                var obj = Items[i];
                if (obj.start == event.start._i) {
                    Items.splice(i, 1);
                    CalendarDao.addNewEventArray(Items);
                    break;
                } else {
                    console.log("didn't work");
                }
            }
        }
    },

    
    // delete everything (not only user)   
    deleteAllEvents: function () {
        localStorage.clear();
    },

     // delete everything (not only user)  
    deleteUserEvents: function () {
        localStorage.removeItem(user.username);
    },
    
    updateEvent: function (event) {
        
        var Items = CalendarDao.findAllEvents();
        if (Items !== null) {
            for (var i = 0; i < Items.length; i++) {
                var obj = Items[i];
                
                if (obj.start == event._start._i) {

                    console.log(event);
                    var val = {
                        title: event.title,
                        description: event.description,
                        start: event.start._d,
                        end: event.end._d,
                        color: event.color,
                        allDay: false
                    }

                    Items.splice(i, 1, val);   
                    CalendarDao.addNewEventArray(Items);
                    break;
                
                } else {
                    console.log("didn't update");
                }
            }
        }  
    },
}
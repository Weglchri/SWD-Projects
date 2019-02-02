"use strict";

var UserService = { //user functions
    
    //set FH User Token
    setMoodleToken: function (user, callback) {
        var usertokenurl = "https://elearning.fh-joanneum.at/login/token.php?username=" + user.username +
            "&password=" + user.password + "&service=moodle_mobile_app";
       httpGetASync(usertokenurl, function (data) {
           var obj = JSON.parse(data);
           if (obj.error) {
               console.log(obj.error);
           } else if (obj) {
               user.setMoodleToken(obj.token);
           } else {
               console.log("undexpected error occured while setting token");
           }
           callback();
       });  
    },


    //get Information about the user --> required id
    setInformation: function (user, callback) {
        var userinformationurl = "https://elearning.fh-joanneum.at/webservice/rest/server.php?moodlewsrestformat=json&wsfunction=core_user_get_users_by_field&wstoken=" + user.moodletoken +
            "&field=username&values[0]=" + user.username;
        httpGetASync(userinformationurl, function (data) {
            var obj = JSON.parse(data);
            var information = obj[0];
            if (information.username == user.username) {
                user.setInformation(information);
            } else {
                console.log("error occured, couldn't set user information");
            }  
            callback();
        });
    },

    //get User Exams
    getExams: function (user, callback) {
        var userexamurl = "https://ws.fh-joanneum.at/getexams.php?u=" + user.username + "&p=" + user.password + "&k=nQzc02e7FU"
        httpGetASync(userexamurl, function (data) {
            var obj = xml2jsonobj(data);
            if (obj.Overview.Status === "OK") {
                var examArray = obj.Overview.Term[0].Exam;
                callback(examArray);
            } else if (obj.Overview.Status === "INVALID DATA") {
                console.log("invalid data, try again!");
            } else {
                console.log("unexpected error occured while getting user exams");
            }
        });
    },



    //get User Courses
    getCourses: function (user) {   
        var usercourseurl = "https://ws.fh-joanneum.at/getschedule.php?c=" + user.course + "&y=" + user.year + "&k=&k=nQzc02e7FU";
        httpGetASync(usercourseurl, function (data) {
            var obj = xml2jsonobj(data);
            if (obj.Events.Status === "OK") {
                var courseArray = obj.Events.Event;
                CalendarService.addCourseDates(courseArray, user);
            } else if (obj.Events.Status === "INVALID DATA") {
                console.log("invalid data, try again!");
            } else {
                console.log("unexpected error occured while getting the user's courses");
            }
        });

    }
}


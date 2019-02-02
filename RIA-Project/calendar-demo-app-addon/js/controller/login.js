var user = null;


$("#loginsub").click(function () {
    event.preventDefault();

    var logarray = $("#login").serializeArray();
    var username = logarray[0].value;
    var password = logarray[1].value;
    var group = logarray[2].value;

    if (user === null) {
        user = new User(username, password, group);
        CalendarService.addArray(CalendarService.getAllEvents());

        UserService.setMoodleToken(user, function () {
            UserService.setInformation(user, function () {

                UserService.getExams(user, function (examArray) {
                    CalendarService.addExamDates(examArray);
                });

                UserService.getCourses(user, function (courseArray) {
                    CalendarService.addCourseDates(courseArray);
                });

            });
        });
    } else {
        console.log("already logged-in");
    }
    






});



var DateParser = {

    //parse date and time to formal date
    toDate: function (date, time) { //date 25.06.2017 //time 14:30 //returns formatted date
        var dateParts = date.split(".");
        var timeParts = time.split(":");
        var date = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0], timeParts[0], timeParts[1])
        return date;
    },

    //convert seconds to a actually useful date format
    secondsToDate: function (secs) {
        var time = new Date(1970, 0, 1, DateParser.getoffset()); // Epoch
        time.setSeconds(secs);
        return time;
    },

    //parse date format "year start-end"
    examDateParse: function (date) {
        var timedate = date.split(" "); // 21.12.2012 12:12-12:21 -> whole date
        var timeparts = timedate[1].split("-"); // 12:12 & 12:21 -> start and end time

        var start = undefined;
        var end = undefined;

        if (timeparts[0] === "") {
            start = false;
            end = false;
        } else {
            start = DateParser.toDate(timedate[0], timeparts[0]);
            end = DateParser.toDate(timedate[0], timeparts[1]);
        }

        var date = {
            "start": start,
            "end": end
        };
        return date;
    },

    //offset of timezones
    getoffset: function () {
        return (-(new Date().getTimezoneOffset() / 60));
    },

    //iso to readable date
    momentToForm: function (date) {
        var str = moment(date).format('DD.MM.YYYY');
        var strt = moment(date).format('HH:mm');
        return {
            "day": str,
            "time": strt
        };
    },


    validate: function (date) {

    }

}
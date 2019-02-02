"use strict";


function User(username, password, group) {
    this.username = username;
    this.password = password;
    this.group = group;
}

User.prototype.setMoodleToken = function (moodletoken) {
    this.moodletoken = moodletoken;
};

User.prototype.setInformation = function (information) {
    this.id = information.id;
    this.email = information.email;
    this.course = information.description.split(" ")[1].substring(0,3);
    this.year = (new Date().getFullYear().toString().substring(0,2) + information.description.split(" ")[1].substring(3,5));
    this.type = information.description.split(" ")[0];
};


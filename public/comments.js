"use strict"

$(document).ready(function(){
    //TODO: add a loading message that disappears when articles arrive
    $.getJSON("/api/comments", function(data) {
        // For each one
        console.log(data)
        ////TODO: better error handling in for loop
        for (var i = 0; i < data.length; i++) {
            console.log(data[i])
        }
    });

})
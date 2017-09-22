"use strict"

$(document).ready(function(){
    //TODO: add a loading message that disappears when articles arrive
    $.getJSON("/api/comments", function(data) {
        // For each one
        console.log(data)
        ////TODO: better error handling in for loop
        for (var i = 0; i < data.length; i++) {
            var comment = $('<div>').addClass("comment").attr("comment-id", data[i]._id);
            comment.append($("<p>").addClass("comment-name").text(data[i].user));
            comment.append($("<a>").addClass("comment-article").attr("href", data[i].article.url).text(data[i].article.headline));
            comment.append($("<p>").addClass("comment-text").text(data[i].textContent));

            $("#comments").append(comment);
        }
    });

})
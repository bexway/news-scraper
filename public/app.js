"use strict"

$(document).ready(function(){
    //TODO: add a loading message that disappears when articles arrive
    $.getJSON("/scrape", function(data) {
        // For each one
        for (var i = 0; i < data.length; i++) {
            if(data[i].comments.length > 0){
                console.log(data[i].comments);
            }
            var article = $('<div>').addClass("article").attr("data-id", data[i]._id)
            article.append($('<a>').addClass("headline").attr("href", data[i].url).text(data[i].headline));
            article.append($('<p>').addClass("summary").text(data[i].summary))
            // article.append($('<button>').addClass("comment-reveal-btn btn").text("Add Comment"))
            article.append($(`<div class="add-comment-section">
            <button class="comment-reveal-btn btn">Add Comment</button>
            <form class="comment-form hidden" action="/write" method="post">
            <div>
                <label for="user_name">Name:</label>
                <input type="text" class="user_name" name="user_name">
            </div>
            <div>
                <label for="comment">Comment:</label>
                <textarea class="comment" name="comment"></textarea>
            </div>
            <button class="comment-submit-btn btn" type="button">Submit your comment</button>
            
            </form>
            <div class="comment-message"></div>
            </div>`));
            //TODO: If I have time, add something in the server scraping that will check for comments (in the case of existing articles) and list them
            $("#articles").append(article)
        }
    });
    
    $(document).on("click", ".comment-submit-btn", function(event) {
        event.preventDefault();
        var form = $(this).parent();
    
        $.ajax({
            method: "POST",
            url: "/write",
            data: {
                article: form.parent().parent().attr("data-id"),
                user: form.find(".user_name").val(),
                textContent: form.find(".comment").val()
            }
        })
        .done(function(data) {
            //TODO: hide the comment submission, and append a message onto that article saying the comment was submitted/displaying an error message
            console.log(data);
            form.parent().children(".comment-message").empty();
            if(typeof(data)==="object"){
                form.parent().children(".comment-message").append($("<p>").text("Thanks for submitting your comment! It's been processed successfully."))
            } else {
                form.parent().children(".comment-message").append($("<p>").text("Sorry, something went wrong with submitting your comment! Please make sure all forms are filled out and try again."))
            }
            
        });
    
        form.find(".user_name").val("");
        form.find(".comment").val("");   
    });

    $(document).on("click", ".comment-reveal-btn", function(event) {
        $(this).parent().children(".comment-form").toggle();
        if($(this).text()==="Add Comment"){
            $(this).text("Close Comment Form");
        } else{
            $(this).text("Add Comment");
        }
    });


});
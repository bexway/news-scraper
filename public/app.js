"use strict"

// $(document).ready(function(){
    $.getJSON("/scrape", function(data) {
        // For each one
        console.log(data)
        for (var i = 0; i < data.length; i++) {
            // TODO: separate display for things that do or don't have summaries
            var article = $('<div>').addClass("article").attr("data-id", data[i]._id)
            article.append($('<a>').addClass("headline").attr("href", data[i].url).text(data[i].headline));
            article.append($('<p>').addClass("summary").text(data[i].summary))
            article.append($('<button>').addClass("comment-link-btn").text("Add Comment"))
            article.append($(`<form action="/write" method="post">
            <div>
                <label for="user_name">Name:</label>
                <input type="text" class="user_name" name="user_name">
            </div>
            <div>
                <label for="comment">Comment:</label>
                <textarea class="comment" name="comment"></textarea>
            </div>
            <button class="comment-submit-btn" type="button">Submit your comment</button>
    
            </form>`))
    
    
            $("#articles").append(article)
    
            // $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].headline + "<br />" + data[i].summary + "<br />" + data[i].url + "</p>");
        }
    });
    
    $(document).on("click", ".comment-submit-btn", function(event) {
        event.preventDefault();
        var form = $(this).parent();
    
        $.ajax({
            method: "POST",
            url: "/write",
            data: {
                _id: form.parent().attr("data-id"),
                user_name: form.find(".user_name").val(),
                comment: form.find(".comment").val()
            }
        })
        .done(function(data) {
            console.log(data);
        });
    
        form.find(".user_name").val("");
        form.find(".comment").val("");
    });
    
    // $(".comment-submit-btn").submit(function(event) {
    //     event.preventDefault();
    //     var form = $(this).parent();
    
    //     $.ajax({
    //         method: "POST",
    //         url: "/write",
    //         data: {
    //             _id: form.parent().attr("data-id"),
    //             user_name: form.find(".user_name").val(),
    //             comment: form.find(".comment").val()
    //         }
    //     })
    //     .done(function(data) {
    //         console.log(data);
    //     });
    
    //     form.find(".user_name").val("");
    //     form.find(".comment").val("");
    // });
// }
// );
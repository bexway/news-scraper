$.getJSON("/scrape", function(data) {
    // For each one
    console.log(data)
    for (var i = 0; i < data.length; i++) {
        // TODO: separate display for things that do or don't have summaries
        var article = $('<div>').addClass("article")
        article.append($('<a>').addClass("headline").attr("href", data[i].url).text(data[i].headline));
        article.append($('<p>').addClass("summary").text(data[i].summary))
        $("#articles").append(article)
        // $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].headline + "<br />" + data[i].summary + "<br />" + data[i].url + "</p>");
    }
});
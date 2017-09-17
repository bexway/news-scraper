$.getJSON("/scrape", function(data) {
    // For each one
    console.log(data)
    for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].headline + "<br />" + data[i].url + "</p>");
    }
});
# News Scraper

A web app to scrape news articles from the New York Times website (https://www.nytimes.com/), and allow users to view and comment on them.

The app contains two pages: one for viewing articles and their associated comments, and one for viewing all articles made through the app. The app uses Node.js, Express, HTML, CSS, JS, and a noSQL database (MongoDB with Mongoose) to manipulate and display data.

# How it works

When the home page loads, the app uses Cheerio to scrape the NYTimes website for story headlines, urls, and (optionally) summaries. The accuracy of this scrape may vary based on changes to the NYTimes website.

Each scraped article is saved to a noSQL database. However, the database does not allow duplicates. In the case of a duplicate in headline or url, the database looks for the existing article entry in the database and displays that on the page instead. If the pre-existing article has been commented on, the comments are displayed with the article on the article page. I've used a chaining promise to ensure that all articles are processed before being displayed on the DOM.

Users can click a button accompanying an article to reveal a comment submission form, asking them for their name and comment. Upon clicking the comment submission, the app will save the comment in the database and associate it with the article the user commented on. If it is successful, a message will appear on-screen. A different message indicating an error will appear if the comment submission was not successful.

On the comments page, all comments are retrieved from the database and displayed with the name of the posting user, the headline and url of the article, and the comment text.

# Goals

The page needs improved design and styling, as it's currently very plain. I would also like to add a loading message that displays while articles or comments are being loaded and vanishes when the processing is finished and the elements are displayed on screen. User authentication for commenting is another important step I would like to include. Finally, I would like to make the site more accessibility-friendly. Currently, the page is not very navigable, many elements are related by visual proximity rather than any name or label, and the appearance of new elements on the page is not directed.
---
layout: post
title: Querying in Mongo with Node
tags: technical javascript
date: 2014-08-26
---
I'm in the midst of taking an online course using <a href="http://www.mongodb.org/" target="_blank"> MongoDB</a> through Mongo's online university entitled <a href="https://university.mongodb.com/courses/10gen/M101JS/2014_Aug/syllabus" target="_blank"> MongoDB for Node.js Developers</a> and thought I'd share a few insights here. 

As background, MongoDB is a NoSQL database that is open-source and used by the likes of BuzzFeed, BusinessInsider, Disqus, Expedia, LinkedIn, Sailthru, Electronic Arts, Under Armour, CERN and a growing list of <a href="https://www.mongodb.org/about/production-deployments/" target="_blank"> others</a>. The advantages of NoSQL over SQL frameworks are largely scalabity and performance related. As the name implies, NoSQL databases are schemaless and do not have to work over numerous tables - instead, they generally use documents (similar to a JSON object in Mongo's case) in place of rows and deep embedding inside documents in place of joins. Notably, the aforementioned companies in many cases still use relational databases, as SQL is still thought to be more usable as database complexity ramps up. 

I don't profess to have a view on either (Ian White in 2009 laid out the case for Mongo / NoSQL quite nicely <a href="http://www.businessinsider.com/how-we-use-mongodb-2009-11" target="_blank">here</a>), but believe it's important to learn more about both paradigms and form a view over time. In the words of John Carmack: 

<blockquote>If you aren't sure which way to do something, do it both ways and see which works better.</blockquote>

<a href="http://nodejs.org/" target="_blank"> Node.js </a> is a JavaScript-based platform that, among other things, facilitates building of web applications. Node is built on V8 (Google's open source JavaScript framework) and part of the ever-increasing body of tools and frameworks that utilize JavaScript. 

I want to cover a basic querying exercise here included in the aforementioned MongoDB course (if you feel so inclined to follow along from here, the below assumes you have Mongo and Node installed). 

In short, I want to provide some possible answers to the following question:

<blockquote>Given a large CSV file, how would you use MongoDB and Node to import the CSV into Mongo and query it using Mongo in combination with Node?</blockquote>

Mongo asks you to do exactly that in their online course, where they've provided a CSV file full of state-based weather and wind data for one month for Vermont, California, Florida and New Mexico. The CSV contains the temperature, wind speed and various other facts for every single hour for each state over the course of one month. <b>The ask here is to add a boolean field to the database showing whether the temperature recorded in the state was a month high.</b>

Before we can begin narrowing down the data based on state and temperature, we have to import it into Mongo in full. The Mongo docs are an excellent place to start and have step-by-step instructions <a href="http://docs.mongodb.org/manual/reference/program/mongoimport/" target="_blank">for importing CSV files </a> using the Mongo shell (which can be accessed from the command line via the command `mongo`). Here's how I imported the weather data Mongo provided:

<p align="center">
<img src="https://lh6.googleusercontent.com/-5IPDMkSr1Ys/U_yzY0KzWzI/AAAAAAAAAUI/JkoTYXE8JY4/w607-h92-no/Screen%2BShot%2B2014-08-26%2Bat%2B12.18.21%2BPM.png" alt="mongo_data" >
</p>

The `mongoimport` command and relevant arguments here tell Mongo to construct a database called `state_weather` with a collection named `data` that has the attributes in the CSV header (Day, Time, State, etc.). The two lines below the command confirm the import was successful and that I now have a database with 2,963 "rows" (recall, these are documents / objects in Mongo). 

You can fool around with the data by using the relevant database and running queries in the shell. For those familiar with Rails, this achieves the same purpose as running `rails c` in a Rails project and is useful for exploring your database. If I wanted to see the first entry imported, I'd do the following:

<p align="center">
<img src="https://lh4.googleusercontent.com/-uXIWtoF6Kfo/U_y0qfhh01I/AAAAAAAAAU0/fjcwYmH6jfk/w435-h343-no/Screen%2BShot%2B2014-08-26%2Bat%2B12.23.23%2BPM.png" alt="mongo_query">
</p>


With the database populated, we can begin writing a Node program that will log our desired results to the terminal (better yet, you could log them to your browser, but I'll save that for another time). 

Importantly, you can create variables holding documents in Mongo referred to as cursors. Cursors are easy to iterate through and make code more readable when in Node. In the below example, I create a cursor which has the database data imported previously sorted first by state name and then by temperature. 

Sorting data in Mongo can be achieved through the use of a cursor and the use of the <a href="http://docs.mongodb.org/manual/reference/method/cursor.sort/" target="_blank"> `sort` method </a>, which can be called on a cursor (note that I'm now out of the Mongo shell and working in Node - if you want to follow along with all the code, see my <a href="https://github.com/BenBrostoff/Mongo-and-Node-Example" target="blank"> GitHub repo</a>, also linked at the bottom of this post).:

<script src="https://gist.github.com/BenBrostoff/1dc63a0d77649f73a02e.js"></script>

What's nice about Mongo is that passing in an array to sort will sort based on the order of the array - in this case, we sort first by alphabetical order and then by temperature. Now that all 2,963 documents are sorted, I can iterate through the cursor and pull out the first entry for each state. I know that this entry represents the month high because of how the cursor was sorted. Every time the state chages, we'll arrive at the new month high and can add a key-value pair to each document accordingly. This addition of the key-value pairs occurs in the database using the <a href="http://docs.mongodb.org/manual/reference/method/db.collection.update/" target="_blank"> `update` method </a> in Mongo. 

<script src="https://gist.github.com/BenBrostoff/3c723f970997a707c5a0.js"></script>

As you'll see above, a number of Mongo database methods as they appear in Node take callbacks wherein the parameters you pass in are errors, documents and other related arguments. This in part allows for useful logging of error messages and other information. Further, when executing Mongo functions in Node, it's necessary to close out of the database to avoid iterating over empty entries; that's the purpose of lines 3-5 above. 

Finally, with the data modified as desired, we can revise the cursor to only include entries that were month-highs and then iterate and log to the console:

<script src="https://gist.github.com/BenBrostoff/513873bb0ac012145385.js"></script>

The resulting output is below:

<p align="center">
<img src="https://lh6.googleusercontent.com/-ykdOSUGFR74/U_zZsKjOemI/AAAAAAAAAVw/RXrxYxQoxWY/w558-h82-no/Screen%2BShot%2B2014-08-26%2Bat%2B3.00.52%2BPM.png" alt="output" >
</p>

I found the experience of doing this exercise significantly different from my work in a relational database (where I mostly have used Postgres and ActiveRecord as an ORM). As Ian White notes in the previously linked post, it's nice to write less abstracted code using Mongo than you would in an ORM. Additionally, the process of writing raw SQL (in the few scenarios you might do so) is often drawn out and frustrating; the `find`, `update` and other methods Mongo gives you make querying and altering documents relatively easy compared to `SELECT`, `WHERE`, `HAVING`, etc. in SQL. 

Yet, the relative simplicity of this exercise makes it hard to reason about Mongo's limitations. For instance, how would Mongo deal with <a href="http://guides.rubyonrails.org/association_basics.html#polymorphic-associations" target="_blank"> polymorphic relationships </a>? I am very much interested in using Mongo on a large-scale project that would have a complex schema in SQL land. 

Once I've given that a try, maybe I'll have a better idea on which works better.

** <i>B.N. I posted a <a href="https://github.com/BenBrostoff/Mongo-and-Node-Example" target="_blank"> small GitHub repo </a> for those interested in fooling around with the data and seeing my solution in full.</i>

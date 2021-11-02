---
layout: post
title: Callbacks & Closures in JS with Brad Dayley
tags: technical javascript
date: 2014-09-07
---
I recently purchased Brad Dayley's book on the MEAN stack entitled <a href="http://www.amazon.com/Node-js-MongoDB-AngularJS-Development-Developers/dp/0321995783" target="_blank"> Node.js, MongoDB and AngularJS Web Development </a> (there's also a section on Express, for those wondering about the E).The book is fantastic and Dayley provides a <a href="https://github.com/bwdbooks/nodejs-mongodb-angularjs-web-development" target="_blank"> GitHub repo </a> with the code for all the exercises covered in the book.

I have always struggled with the idea of callbacks and closures in JavaScript, and fortunately, Dayley is up to the task of walking through them. Callbacks and closures are especially important in Node.js, which, unlike most web-servers (when Node is used as a web-server), is single-threaded and event driven. To use an extended analogy provided in the book, if Node were the host of a party, it would speak to all guests individually and remember to come back to certain conversations after it had attended to other conversations, whereas most web-servers would just chat with everyone at one time. Node's ability to push events into the background and return to them can act as a powerful advantage.   

The exercise Dayley uses to demonstrate is one that relies on the <a href="http://nodejs.org/api/process.html#process_process_nexttick_callback" target="_blank"> `process.nextTick()` </a> function native to Node. The function takes a callback and tells Node to execute the function on the next event loop. To return to the party analogy, `process.nextTick()` schedules conversations with guests only after "earlier"" scheduled conversations have been attended to. I have tried to visually depict these loops in the console in the code below (which is almost wholly copied from Dayley's <a href="https://github.com/bwdbooks/nodejs-mongodb-angularjs-web-development/blob/master/ch04/callback_closure.js" target="_blank"> exercise </a>, with some minor alterations):

<script src="https://gist.github.com/BenBrostoff/e4e619df6d4ecbb2f436.js"></script>

The code above iterates twice through an array of three cars and logs the cars to the console. The key difference here is <i> when </i> the execution of the function `logCar()` nested in the loop in 11-17 occurs, versus the function `wrapperFn()` nested in the loop in 19-28. `wrapperFn()` calls `logCar()` and "wraps" around it - hence the name. 

The wrapper function here makes all the difference. The callback in `logCar()` is destined not to execute until the second event loop in the program because it is wrapped in the aforementioned `process.nextTick()`. Thus, "first loop" events, like the for loops that begin in 11 and 19,  will occur prior to the callback. 

Because the execution of the callback must occur after the for loops are complete, the only way all the cars can get logged to the console is if the variables passed in as parameters each uniquely represent the three cars. 

In 11-17, the `message` parameter `logCar()` takes on 13 will appear in the anonymous function always as the final element in the car array: Bugatti. The variable `message` serving as the parameter in `logCar()` is changing each time through the loop, and by the time the anonymous function uses it on the second event loop, the variable is equal to the final element in the array. In closure terms, `logCar()` is the parent function of the anonymous function, and the parameter it passes to the anonymous function changes twice; however, since the callback executes on the second event loop, it is doomed to grab the parameter after the final iteration.

In contrast, the function `wrapperFn()` in 21 does not let cars race by (excuse the pun), instead grabbing them and passing them along to its child functions in 27 when `wrapperFn()` is called. As you can see visually via "PARAMETER PASSED 2: ", the message variable is being caught on the first event loop and saved in memory for the second event loop. 

<p align="center">
<img src="https://lh5.googleusercontent.com/-VQSw0iVAE1w/VAyfjUURN5I/AAAAAAAAAXY/0OA4CB01Q_8/w282-h458-no/Screen%2BShot%2B2014-09-07%2Bat%2B2.09.07%2BPM.png" alt="callback_clos_output" >
</p>

The value of closures in this exercise was to close off certain variables from change and give the callback function the information it needed. Because Node (and JavaScript in general) relies heavily on events occurring at different points in time, closures are key to making sure the passage of time will not get in the way of what the programmer intended (at least the way I see it).

Additionally, I realized while doing this exercise the importance of using closures in conjunction with callbacks to grab information from AJAX requests to bring such information to the client-side. As AJAX requests by definition occur asynchronously, they represent a perfect situation for implementing closures and callbacks.

<a href="https://github.com/bsusensjackson/" target="_blank"> Brendan Susens-Jackson</a>, who I worked with on a side project called <a href="http://ready-reader.herokuapp.com/" target="_blank">ReadyReader</a>, originally explained this idea to me and put it to work on our application. The source code can be found <a href="https://github.com/woodchucks-2014/ReadyReader"> here</a>. Brendan helped edit this post, so hats off to him :-).  




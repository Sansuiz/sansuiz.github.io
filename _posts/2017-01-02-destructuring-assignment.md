---
layout: post
title: Destructuring Assignment
tags: technical javascript
date: 2017-01-02
---
    
>>
The foundation of the modern world is developer tools.
>>

[Max Howell](https://twitter.com/mxcl/status/619373095199969280?lang=en)

I think destructuring assignment is one of the most useful tools in the ES6 toolkit. 

First off, a definition of destructuring assignment from the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment):
 
 >>
 The destructuring assignment syntax is a JavaScript expression that makes it possible to extract data from arrays or objects into distinct variables.
 >>
 
Said another way, destructuring allows for creation or assignment of variables from parts of arrays or objects. Because it is not the job of developer documentation to sell different features of the API, or promote common use cases (depending on your perspective), I want to take the time to do it here. I find myself using destructuring assignment time and time again for a host of different reasons. 

* Imports, Function Arguments and Variables

This one I think is the most straightforward use case suggested by the docs. Extracting functionality from large Node modules, pulling out object properties from an argument in a function parameter, or creating multiple `const`s from an object are all low hanging fruit. What gets interesting is when objects have deeply nested structures and can be destructured. Consider this ridiculous example:

<script src="https://gist.github.com/BenBrostoff/c30b2ef1f5c4022c6b977ef75c1ac590.js"></script>

While I think more nesting levels of destructuring obfuscate code, this technique is really useful when taken with a grain of salt. This usefulness especially shines when using `Array` functions like `map` and `reduce`. Consider the scenario where you get a bunch of database results that have a bunch of properties, some of which have values of type `Array`. Maybe the client needs to show all the results but also some aggregations (i.e. for whatever reason, the aggregation occurs outside of the DB).

A data request like "show me total points scored in the first half by this subset of basketball players" works well with destructuring:

<script src="https://gist.github.com/BenBrostoff/ae147b4908812281305a40a760f76aaf.js"></script>

I particularly like how variable naming (`firstQ`, `secondQ`) can take place in the second function argument of the `reduce` function as opposed to in the function itself.

Speaking of renaming things...

* Renaming Things

Because context so often determines what the purpose of a piece of data is, it makes sense to me to rename the same piece of data depending on context.

For instance, let's assume you had some player data from the NBA that looked like this:

<script src="https://gist.github.com/BenBrostoff/2604218271ca8d8b60577e76be6f8735.js"></script>

You then have one function that simply takes in the data for one player and returns their points per game.

<script src="https://gist.github.com/BenBrostoff/041e34686f448133840c6bc94b95c62f.js"></script>

It makes sense to call the argument here `pointsPerGame`, as the purpose of this function is simply to get that value. 

In contrast, let's say you have a function that takes two arguments - data for an individual player and all player data - and then returns the data for all players with more PPG than that player. Here, changing the name `pointsPerGame` to `ppgThreshold` makes a lot of sense.

<script src="https://gist.github.com/BenBrostoff/0f2e87a7a72043c17183035ec865272e.js"></script>

We can actually go one step further here and destructure and rename the argument in the `filter` function for clarity, using `playerPpg` instead of `player.pointsPerGame`.

<script src="https://gist.github.com/BenBrostoff/e0b5b1a6c94f58e5a26ae74c33688c89.js"></script>

* Applying Left-to-Right Thinking to Right-To-Left

One thing in particular I like about destructuring assignment is that *it makes your brain reverse how you think about variable assignment*. Pre ES6 destructuring, assigning a variable to the second and third elements of a Javascript array looked something like this:

<script src="https://gist.github.com/BenBrostoff/d09ea100babb266b1c8b918348faf534.js"></script>

The natural thought process at least for me here is "look to the right hand side for meaning". I see the numbers array and the indices at 2 and 3, and then understand.

With destructuring, the above can be done as follows:

<script src="https://gist.github.com/BenBrostoff/600e5c1e6b3e33a420829b3bb3062fd6.js"></script>

Now, my thought process becomes "first, look to the left hand side for meaning". I see the square brackets around `a` and understand I need to get the first element of the right hand side. A side benefit is I immediately get that `numbers` is an `Array` with at least three elements too (obviously not guaranteed, but we know that's the intent at least), so destructuring can convey type information too.

As a side note here, Python gets close to allowing you to do this with lists, but will throw a `ValueError: too many values to unpack` if the size of the list does not match the number of variables. 
    
Overall, I'm amazed by how many different use cases ES6's destructuring syntax has (and I'm sure there's more to come in ES7). This feature is the rare tool that's multi-purpose and easy to get the hang of. Moreover, it forces me to think about programming in a different way - looking to the left hand side of a variable assignment for meaning.

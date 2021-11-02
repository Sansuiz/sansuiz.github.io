---
layout: post
title: Languages and Opinions
tags: technical
date: 2015-04-18
---
I find a lot of my preferences often are based on what I've been exposed to. If given a choice, I'd prefer to program something in Python rather than in Haskell because I have many, many times more hours of experience in the former. 

The risk of this inevitable correlation between preferences and exposure is that prefences and norms begin to overlap with eachother. An example - while working in Ruby the other day, something along the lines of the following happened:

<script src="https://gist.github.com/BenBrostoff/7ef3a4056787142b1265.js"></script>

I must admit my first reaction here was annoyance with Ruby. This annoyance was a reaction to feeling wronged by the `NameError` in front of me. As consolation, I needed to prove the same code would execute in Python, which it did:

<script src="https://gist.github.com/BenBrostoff/5e261bd7317391c69e74.js"></script>

Differences in languages like this one seem to me to be the beginnings of endlessly long programming language debates that are always normative in nature - "How should things be?" These debates are where my own preferences are sometimes revealed as my desired norms, and, by extension, my preferred norms are what I have been exposed to. Admittedly, sometimes my preferred norms are a reaction *against* what I have been exposed to (perhaps this is more common in general, considering all the complaining about the shortcomings of, say, JavaScript). 

In the above example, there are strong debates on both sides for whether languages should allow local variables declared outside the body of a method to have scope that extends inside the body of a method. Language designers have thought far more about this debate than I have. I am merely a language consumer.

In a way, until we create tools ourselves, our opinions on existing tools are limited by what we have and have not been exposed to. I can easily see a scenario where, had I needed to fix a troublesome bug related to a scoping issue, I would be equally annoyed that Python did not raise an error on the above example. 

Thus, it seems to me the best way to avoid forming malformed opinions is to gain exposure and make tools.   

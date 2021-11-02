---
layout: post
title: Reading Code
tags: technical
date: 2015-12-02
---
I think reading code is the best way to improve as a software engineer.

I like lists for standardizing processes with many steps. To this end, I thought I'd make a checklist of things I've come to realize are my own best techniques as they relate to reading code. The central question they all get at - <i>If asked to explain and defend every engineering decision made in whatever piece of code I'm reviewing, could I do it?</i>
 
Anyways, the checklist:

* Can I run the code successfully on my local environment? If I had to do a bunch of manual configuration, could any of this configuration be automated and checked into source control? If not, does the project Wiki need to be updated to include the manual configuration steps?
* Does the code solve the issue or implement the feature it set out to resolve? If it's tied to a GitHub issue, JIRA ticket, etc., does it satisfy whatever criteria was outlined in the issue or ticket?
* Can I hit breakpoints in the code additions and follow a stack trace back to the entry point? 
* If there is exception handling, can I hit the error cases and see that they're handled as expected?
* Can I differentiate between 1) standard library calls, 2) third-party library calls and 3) internal project calls? (importantly, <a href="https://www.python.org/dev/peps/pep-0008/#imports" target="_blank"> this list corresponds to the order of imports in PEP-8</a>)
	* On standard libary calls - if there are methods I'm not familiar with, did I look at the official docs and find an example case? Did I sandbox the method in the shell and try a few simple test cases? If I've never worked with the language, am I developing a familiarity with the types / scoping / syntax, etc?
	* On third party library calls - same as above, but a few additions. Do I generally understand the point of the library? Does the library have a set of best practices? 
	* If the library is a wrapper around a broader technology (e.g. <a href="https://pypi.python.org/pypi/elasticsearch-dsl" target="_blank">elasticsearch-dsl</a>), do I know what's really going on beneath the language wrapper? For instance, if I'm using an API wrapper, can I reproduce what the wrapper is doing via <code>curl</code>? If the library is totally foreign to me and I'm guessing at what it may do, do I need to purchase an O'Reilly book or spend an hour or so perusing the docs / tutorials / etc.? 
	* One more on libraries - is the library the latest version or an older one? Is the version frozen? Should it be if it's not?
	* On internal project calls - are these calls self-explanatory or is there a history around what's going on I need to be aware of? Have I turned on annotations in whatever IDE I'm using (or <code> git blame </code> if not using an IDE) and tried to understand the related commits?
* If the language I'm working in is dynamically typed, do I have an appreciation for which types are being handled? Am I sight reading or actually setting breakpoints and confirming my intuition is correct?
* Would I have done anything differently from an architectural perspective (throwing aside style or organization)? Are there risks in whatever I'm reviewing that the use-case if one-off and will have to be totally ripped out and rebuilt in the future?
* If I'm making suggestions, are they actually good ones in that they 1) improve performance, 2) improve readability and 3) allow for easy building on top of whatever I'm reviewing?
* If I'm making stylistic suggestions, does the linter need to be changed so it picks them up?
* If I'm making organizational suggestions (method extraction, refactoring something into a module, etc.), am I simply shifting pieces around or actually making the project more maintainable in the long-term?
* If I see something I really like or find interesting, did I file it away for future reference? Am I making sure to go back to this reference over time and trying to implement the patterns in it?
* Do I have a strong understanding of how to deploy this code? What differences need to be taken into account when thinking about non-local environments?

I wrote this list mainly so I could review it for my own reference, but I'd love for it to be useful to other people. I know I'm missing stuff and would love for this post to grow over time - shoot me an email at <a href="mailto:ben.brostoff@gmail.com"> ben.brostoff@gmail.com</a> with suggestions.	 


** I think the original influence for the question above was <a href="http://www.scotthyoung.com/learnonsteroids/grab/TranscriptFeynman.pdf" target="_blank">The Feynman Technique.</a>

---
layout: post
title: Resolution
tags: general
date: 2014-12-28
---
*Update (4/5/2015) - Matt Might has a fantastic article on his blog on this same subject. <a href="http://matt.might.net/articles/programmers-resolutions/" target="_blank" > Here it is </a>*.

My top New Year's Resolution for 2015 is the same as it was for 2014: improve as a programmer. How to improve is a question I feel I'm continually exploring. I thought it would be useful to reflect on some techniques for improving that worked well for me this year, as well as techniques I would like to implement next year.

**1. Programming (almost) every day**

John Resig has an <a href="http://ejohn.org/blog/write-code-every-day/" target="_blank"> excellent post on this topic </a> which I found myself referring to a number of times over the last year. I find the main benefit of this practice for me has been to (i) familiarize myself with languages and frameworks via repetition and (ii) inspire good habits via repetition (alternatively, I'm sure I've also inspired some bad habits). I don't think (i) deserves much explanation - to me, this familiarization is tantamount to learning the controls of a video game after a few days of playing. 

Once this familiarity is engrained, you spend less time fumbling around levels and more time learning strategy and the nuances of gameplay. I like (ii) because to a degree it happens naturally, just like (i). The more code I read from programmers I admire, the more I intuitively try to emulate their techniques and habits.

The habit I feel has developed for me the most from (ii) is to try to refactor my own code by making it less repetitive. One of my most common personal refactors no doubt is to abstract similar blocks of code into one function I then call twice or more. 

For instance, a <a href="https://github.com/BenBrostoff/EveryColor-Visual" target=_blank"> side project </a> I've been working on that involved animating dots called for me to assign a random horizontal and vertical direction for each dot upon page load. My first shot at this involved me writing the same instructions for each direction: 

<script src="https://gist.github.com/BenBrostoff/6475c1547194c46870e9.js"></script>
	
I saw this code and remember feeling annoyed enough that I had to refactor immediately:

<script src="https://gist.github.com/BenBrostoff/24cb8ea606dd3f2df11e.js"></script>

I don't know that I would have been so bothered as to be compelled to make this change back in January. I believe reading and writing code on a regular basis has resulted in increased standards for code quality on my personal projecs; I am hopeful that 2015 will bring more of this effect.

**2. Working on mini-projects to learn new technologies**

I first heard this technique really explained well by Dave Hoover in his book <a href="http://www.amazon.com/Apprenticeship-Patterns-Guidance-Aspiring-Craftsman/dp/0596518382" target="_blank">Apprenticeship Patterns</a> - he calls it building "breakable toys". It's also suggested by a number of the elite programmers Peter Seibel interviews in his book <a href="http://www.amazon.com/Coders-Work-Reflections-Craft-Programming/dp/1430219483" target="_blank">Coders at Work</a>. 

The chief advantage of this technique is that it allows for learning in a zero-pressure environment (that might also be its chief disadvantage). Without the requirement of delivering deadline-bound results, I find I'm more apt to explore the why and how of technologies as opposed to focusing on implementation of them. I've used this technique effectively to learn a little bit about building <a href="https://github.com/BenBrostoff/BenTrackerGem" target="_blank"> Ruby gems </a>, <a href="https://github.com/BenBrostoff/Angular-JS-Lightning-Talk" target="_blank"> using Angular.js </a> and <a href="http://benbrostoff.github.io/2014/08/26/querying-in-mongo-with-node/" target="blank"> working with MongoDB </a>.

My favorite ongoing mini-project this year has been my work with the Raspberry Pi I received for my birthday. <a href="http://benbrostoff.github.io/2014/12/13/The-Internet-is-Awesome/" target="_blank"> I wrote about it here</a>, but in summary, the Pi has continually delivered education for me on the relationship between hardware and software.  

**3. Learning a new language to explore new concepts**

<blockquote> LISP has been jokingly described as "the most intelligent way to misuse a computer". I think that description a great compliment because it transmits the full flavor of liberation: it has assisted a number of our most gifted fellow humans in thinking previously impossible thoughts. 
<p></p>
<center> - Edsger Dijkstra</center>
</blockquote>

<a href="http://zencephalon.com/index" target="_blank"> A great teacher of mine </a> once told me that our thoughts are bound by the languages that we speak. My programming thoughts in 2014 were mostly restricted to Ruby, Python and JavaScript - all dynamically typed, object-oriented languages. I want to amend that in 2015 by learning a statically-typed language, a functional language (Haskell is the early candidate) and Lisp (because of the above quote and the fact that Paul Graham inspired me to start programming in the first place). 

**4. Reading about your predecessors to motivate you**

I recently finished Walter Isaacson's <a href="http://www.amazon.com/dp/147670869X" target="_blank">The Innovators</a> and am in the process of reading <a href="http://www.amazon.com/Hackers-Computer-Revolution-Anniversary-Edition/dp/1449388396" target="_blank"> Hackers</a> by Steven Levy. The engineers who laid the foundation for modern computing are giants, and it has humbled me to read about them and then use the software they wrote on a regular basis. The impulse to complain about certain tools (technology X can't do Y) is more than negated when I consider the amount of ingenuity and effort it took to construct the tools in the first place (and the tools that built the tools, and so on). Complaints should always be replaced with attempts at solutions; to me, this seems to be a central part of the engineer ethic. 

More than anything else, learning more about my predecessors motivates me to want to improve the existing body of knowledge we have about computer science and build better tools for future programmers to work with. 

**5. Answering the "What am I trying to accomplish right now?" question**

Too often in 2014 I found myself traveling down a rabbit hole when trying to implement a new feature on a project, debug a problem, or learn how to do something new. I'm sure this experience is common among developers - you enter a question or error message into Google, begin reading a Stack Overflow post, run over to a GitHub issue page, copy and paste some code, get a new error message, and then rinse and repeat. After a couple iterations, you're so far removed from the original task that you forget what exactly it is you're trying to do. 

In my opinion, this is the biggest problem with "Google-driven" development. Without some consciousness of your intent and original goals, you rely on the advice of others while implicity assuming they know the exact nature of your problem. In 2014, I was too quick to keep googling without doing important intermittent analyses on what I looking for. In 2015, I'd like to know what I'm trying to accomplish before traversing the interwebs for solutions.

**6. Combating Imposter Syndrome with improvement**

Much has been written on Imposter Syndrome, <a href="http://blog.42floors.com/imposter-syndrome/" target="_blank"> including this post </a> I particulary enjoyed from Jason Freedman. As someone who began programming in college and attended a non-college / university program to gain a better background in web development, I find it tempting to compare myself against life-long programmers and feel like an imposter. 

While I do think as a collective society we have to acknowledge that programmers who started at a young age have certain inherent advantages over people like myself, starting "late" by no means should disqualify anyone from being a value-add in whatever profession they display interest in. All I can do at this point is attempt to improve as best I can and use my time wisely to become a better programmer. 

And indeed, that's my top New Year's resolution for 2015. 
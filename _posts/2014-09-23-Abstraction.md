---
layout: post
title: Abstraction
tags: general
date: 2014-09-23
---

<blockquote> If you interview somebody coming out of computer science right now, they don't understand the underyling computing at all. It's really, really scary how abstract they are from what a computer is or even the theory of computing. They just don't understand it. </blockquote>

<blockquote>Computer science is coming into its middle age. It's turning into a commodity. People don't know about Carnot cycles for refrigerators, yet they buy refrigerators. It's happening in computing too. Who knows about compilers? They buy computers to play games and balance their checkbooks. </blockquote> 

<center> - Ken Thompson, from <a href="http://www.amazon.com/Coders-Work-Reflections-Craft-Programming/dp/1430219483" target="_blank"><i>Coders at Work</i></a> and <a href="http://genius.cat-v.org/ken-thompson/interviews/unix-and-beyond" target="_blank"><i>Computer</i></a> magazine, respectively </center>

The knock against junior programmers for several decades now seems to be that they don't sufficiently understand the layers and layers upon which the tools they use are built. From a senior programmer's perspective, junior programmers are, among other reasons, a liability because they lack strong understanding of <i>how</i> their code works. This criticism is fair because poor understanding generally translates into an inability to debug code or optimize performance or do any number of things. 

This issue seems especially relevant now because of the preponderence of coding bootcamps in New York churning out "Rails developers", of which I suppose I am one. I put Rails developers in quotes because I believe it's ridiculous to characterize anyone as a particular type of programmer when they have less than a year of experience and have never worked in a professional setting (I'd honestly just prefer to be characterized as a junior developer). 

"Rails developers" in particular are viewed by some as liabilities because the very framework that governs their productivity champions abstraction and (it seems) seeks to become increasingly more abstracted. I previously wrote a little bit about <a href="http://benbrostoff.github.io/2014/05/28/magiccurtain/" target="_blank"> my own discomfort</a> with these abstractions. 

Ironically, the success of Rails in enterprise settings also to me seems founded upon abstraction, as abstraction (at its most basic, all the `rails g` commands) boosts productivity, where productivity is a nebulous concept defined by product managers. I would venture to guess many bootcamps believe Rails is the most effective way for junior programmers to become value-adds in their future workplaces.

I don't believe any discussion about productivity can be had without also discussing fragility. If productivity is measured as simply the number of lines of code someone writes, it's easy to imagine a scenario wherein someone is massively productive, but the codebase is also incredibly fragile (the same situation occurs where productivity is a measure of features added / time). 

A familiar story in tech start-ups is the web application thrown together in two weeks that initially took off but then could not scale because of the technical debt accrued during the two-week sprint. Perhaps as familiar are all the stories of Rails applications that could not scale. 

Alternatively, there are scores of stories about software engineers trying to do something concisely and infinitely scaleable in Language X and taking months to launch a simple product as a result. There is an unknown relationship between productivity and fragility, although it's certainly not linear. Importantly, I think the idea of abstraction is at the heart of this relationship. More abstracted tools lead to greater productivity but also greater fragility.

I do not believe the benefits and dangers of abstraction are any less great in other industries than they are in software. I'm currently reading Robert Gates' memoirs, <a href="http://www.amazon.com/Duty-Memoirs-Secretary-at-War/dp/0307959473" target="_blank">Duty</a>, and my main takeaway thus far is how much the Pentagon and Commander in Chief rely on abstraction to speed up processes. Based on my reading of Gates, extremely complex issues (how many dollars to budget for new military technology Y or Z; how many troops to allocate and reallocate based on US strategic interests; etc.) are increasingly simplified as they're pushed up the chain. 

By the time the Commander in Chief rules on a particular issue, it seems to have literally been simplified to an abstract from an original thousand plus page memo. The fragility-productivity tradeoff I see as one of the major themes of the book, as the decisions Gates regrets can often be attributed to a lack of information, or rather, he was too abstracted out to understand the consequences of these decisions.

Gates seems actively aware of this tradeoff and frequently dives deeper into issues where he believes abstraction could do him a disservice. He professes to being extremely confused toward the end of Bush 43's second term as to whether progress was being made in Afghanistan; his commanders on the field claim yes, while the analysts in Washington claim no. Whereas some internal abstraction laws might have sped up Afghanistan-related decisions (trust the Washington guys here; trust the military here), Gates is content to devote resources to resolving the disagreements and studying each side at length to reconcile the opinions he's receiving.

At a much less consequential level, software engineers have to make decisions like this every day. In a Rails setting, for instance, it seems extremely common to have a situation where a certain gem does the gist of what you're looking for, but doesn't quite accomplish the task. I have no doubt spent countless hours reading gem documentation where it would have been more productive to just write code that replicates some of the gem's basic functionality and adds the specifications I want. 

On the other end of the spectrum, I've spent countless hours writing code when there exists a gem that houses what I was going for and does it in a cleaner way. That said, I prefer this experience to the former, as recreating the wheel at least teaches you how to build a wheel.

The decision to deep dive or to trust abstraction in some respects boils down to (i) our view of the risk associated with relying on other people or tools built by other people and, perhaps more importantly, (ii) the risk of not learning the ground that our abstractions stand on. I believe (i) to be a reality of life in general; we are inherently forced to rely on other people and tools to be productive members of society. The risk of (i) can in part be avoided by good due diligence.

I consider (ii), however, critically important and that bending on (ii) is tantamount to bending on long-term quality and risk-management. As a junior programmer, I know well that (ii) will govern whether senior engineers trust me and are comfortable with my work. I believe being able to trace the ladder of abstraction, whether in software or in life, can enhance all decisions by building in logic and reason where it might not have existed. Furthermore, I think a strong knowledge of where certain tools and assumptions come from can inform the abstraction v. productivity tradeoff, leading to time-saved in some areas and time well-spent in other areas.

I speak as someone extremely early in my quest to build this knowledge, and hope that my own abstactions have not affected my intended meaning. In the words of Guy Steele in Peter Seibel's <a href="http://www.amazon.com/Coders-Work-Reflections-Craft-Programming/dp/1430219483/" target="_blank"><i>Coders at Work</i></a>:

<blockquote> Something I worry about a lot when I write, that I'm less worried about with a computer, is about the ways in which English is ambiguous. I'm constantly worried about the ways in which the reader might misinterpret what I've written. </blockquote>. 





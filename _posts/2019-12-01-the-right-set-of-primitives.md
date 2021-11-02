---
layout: post
title: The Right Set of Primitives
tags: business software
date: 2019-12-01
---

> There are no silver bullets

I'm not sure who came up with this phrase, but recently I find myself using it and hearing close friends use it. Climbing, software engineering, business, investing, daily fantasy sports - whatever the discipline, there are too many galaxies in the massive universe of skills for each discipline to ever master. Importantly, each discipline has an expanding universe of skills to consider, especially in dynamic fields like software and investing where what once worked no longer works.

I find the "no silver bullet" reminder both frustrating and thoughtful as someone who values continual improvement. It's frustrating that getting better at something isn't as simple as putting in reps; it's thoughtful in that I sense the veracity of the argument - I have never found getting better at anything to be a linear process. At almost any sustained period of working hard at something, there are periods that seem like regression and periods of exponential improvement. Why is this? Well, there are no silver bullets.

The related concept I often hear on the subject of no-silver-bullets is about strong principles. Sure, the argument goes, there are no silver bullets, but there are general principles that can be used to make any situation work. I'm a huge fan of Ray Dalio's book [Principles](https://www.amazon.com/Principles-Life-Work-Ray-Dalio/dp/1501124021), but I do not see these principles or any principles as able to address every potential problem in every discipline.

In software there's a related term - *the right set of primitives*. I often hear this in relation to libraries that expose a bare minimum of building blocks that developers can build off of. I've even used the term when discussing [my own library for daily fantasy sports optimization](https://github.com/BenBrostoff/draftfast). For `draftfast`, the primitives are things like `Player` and `Roster` and `LineupConstraint` and `Stack` and `RuleSet`. The goal in building a good library in my opinion is to make the API surface extremely small while supporting nearly everything a developer would want to do related to your library's stated mission (yes, this is not easy and likely impossible). This makes it easy for the developer to basically memorize your API and write their own code on top of it.

Primitives and principles are related because both *seem* like something real and substantial when in fact they're just made up concepts by people. Something like a library component is generally just a wrapper around another set of primitives, which is using a programming language under the hood, which is using another compiler and programming language, etc (said another way, more and more primitives underneath the primitives).

In non-software worlds, rules like "find companies with low EV/EBITDA ratios" is an abstracted mental model for more in-the-weeds ways of looking at cash flow, supply and demand for equities and company capital structure. EV/EBITDA is not really an investing "primitive" - EV and EBITDA themselves are just wrappers around traditional accounting practices (depreciation schedules for instance are core to EBITDA and made up by humans). Primitives and principles aren't really useful if the goal is to find the smallest atom-like building block for a thing - they're useful if they help people better understand the building blocks of complicated concepts.

I think any primitives or principles that are popular today took a long time to come into existence. Primitives and principles both change all the time - to me, easy examples here are front-end JavaScript frameworks and guidelines around nutrition. Both change massively over a handful of years (the food pyramid's rise and fall, ways of interacting with the DOM in front-end land). There are no silver bullets for creating primitives that last, except for maybe continual trial and error and experimentation to achieve repeatable results.
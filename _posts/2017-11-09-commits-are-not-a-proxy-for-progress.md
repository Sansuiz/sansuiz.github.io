---
layout: post
title: Commits - Not a Proxy for Progress
tags: general
date: 2017-11-09
---

I'm resolving to stop using commits as a measure of progress.

Generating code is easy. Generating code while understanding every line is hard. This may on the surface seem like an absurd statement, especially if new code has no library dependencies. But native code for a specific language has its own complexities. A recent example I ran into - [error handling with Node `stream`s](https://stackoverflow.com/questions/21771220/error-handling-with-node-js-streams).

Good writers talk all the time about all the work that comes before and after writing. [Sebastian Junger](https://tim.blog/2016/05/22/sebastian-junger/) is insistent on understanding his subject matter as much as possible before putting pen to paper. [Stephen King](https://www.amazon.com/Writing-10th-Anniversary-Memoir-Craft/dp/1439156816) urges writers to tear apart their initial and even later drafts as the editing process creates insight. Coding should be no different.

The before and after work for coding should aim to reduce code generated to as small a volume as possible. This process takes time - time to consider different architectures, [time to read documentation](http://benbrostoff.github.io/2017/08/05/rtd/) and time to receive and address feedback. In no way does this time correlate with commits, nor would correlation be desirable. Version control should tell the story of what changed in the code, not the story of someone's coding process. This is the difference between `Adds error handling to batch script` and three commits that are different iterations of error handling.

What can substitute for commits then as a measure of progress on a project? I see value in tools that track the before and after process, in addition to the actual writing of code. I have found [`Qbserve` useful here](https://qotoqot.com/qbserve/) - it's a tool that shows time spent in different applications. Good old-fashioned "software journaling" is another technique I love - I especially enjoyed this [blog post on it](http://winterflower.github.io/2017/08/17/software-engineering-notebook/).

What gets measured gets managed. Let's make sure we're measuring the right things.

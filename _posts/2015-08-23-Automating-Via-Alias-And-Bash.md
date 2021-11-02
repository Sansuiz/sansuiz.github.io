---
layout: post
title: Automation Via Aliasing and Bash
tags: technical
date: 2015-08-23
---
I've been trying to make a concerted effort recently to automate more stuff. Working on a side project or open source project you haven't touched in a while I've found can be annoying to get back into - first navigate to the directory, run a few tasks to set up the DB, install dependencies, pull from master, etc.

With that in mind, I've taken to some aggressive aliasing on a few side projects to get to the fun stuff more quickly. I thought I'd jot down a few interesting takeways from the experience.

All of the below assume you have a <code>.bash_profile</code> set up. 

- On your home setup, it's worth having aliases to navigate to a project immediately. 
- For setup tasks, it's tempting to chain together a bunch of terminal commands with <code>&&</code>, but bash functions I've found make for easier edits in the future and are more elegant as well.
<script src="https://gist.github.com/BenBrostoff/398a5ca5397d6a950e64.js"></script>
- For anything that involves sshing into another machine, it's nice to alias:
<script src="https://gist.github.com/BenBrostoff/dfa397492f727862ccc5.js"></script>
- Finally, I like having easy access to my <code> .bash_profile </code>, so it makes sense for me to alias the following:
<script src="https://gist.github.com/BenBrostoff/e455104c9d487cfdbb11.js"></script>

I admit a reasonable knock against aliasing is that when you move over to another machine, you're a fish out of water. However, I'd like to believe if I take a few minutes every month to review my <code> .bash_profile </code>, I can partially mitigate this risk.
---
layout: post
title: React's act
tags: react javascript testing
date: 2019-08-11
---

One challenge of writing React tests is knowing where you are in the component lifecycle. Is the component mounted? In the middle of a state update? Has it received props? Answering these questions determines what the tester should assert. Through a colleague at work, I recently found React `16.9` includes an `act` function that can take an `async` callback.

`act` itself, however - which stands for the [Arrange-Act-Assert testing pattern](http://wiki.c2.com/?ArrangeActAssert) existed far before `16.9`, and allows you to guarantee all state updates have completed before making assertions on a component. [From the docs](https://reactjs.org/docs/testing-recipes.html):

> When writing UI tests, tasks like rendering, user events, or data fetching can be considered as “units” of interaction with a user interface. React provides a helper called act() that makes sure all updates related to these “units” have been processed and applied to the DOM before you make any assertions...

I recommend the aforementioned [testing recipes](https://reactjs.org/docs/testing-recipes.html) page for a full walkthrough of `act` examples as well as [Sunil Pai's examples](https://github.com/threepointone/react-act-examples/blob/master/sync.md) - Sunil originally authored the [PR](https://github.com/facebook/react/pull/14853/files) that acted `async` `act`. For this blog post, I want to walk through a simple example that will show the potential value of this testing utility.

*Note - all examples below can be found in this [CodeSandbox](https://codesandbox.io/s/1-react-act-use-4ke1t?fontsize=14&previewwindow=tests)*

Let's start with a sync `act`. Consider a component with just a `useEffect` call that sets a value on the component:

<script src="https://gist.github.com/BenBrostoff/34a93255596772fa1942757359ff371d.js"></script>

The difference between using `act` and not using `act` is the test waiting on the callback inside `useEffect`:

<script src="https://gist.github.com/BenBrostoff/934bb121200a78227578967b1a85494d.js"></script>

`async` act - again, newly released in React `16.9` - allows you to wait on promises to resolve and state updates to complete.

Here's what an async component might look like...

<script src="https://gist.github.com/BenBrostoff/c652ac47b58bc3402d80887459f9ba26.js"></script>

...and the differences between sync and async `act`.

<script src="https://gist.github.com/BenBrostoff/1b13a6b1da5b3294864bd257f924480e.js"></script>

Importantly, `enzyme` and `react-testing-library` are already pulling `act` into their API and have means of accessing it (or should have in the future), so if you're using either library, the above boilerplate isn't necessary. That said, I found it useful to go through this exercise to get a sense of how `act` works.

I'm extremely excited React offers this utility - it's extremely useful in fixing things like intermittently failing tests that rely on promises resolving in some fixed amount of time (which hopefully never existed in your test suite anyways). React testing forces you to understand the lifecycle of your components and how they handle state. `act` is a great way to enhance that understanding.

---
layout: post
title: Redux - createStore
tags: technical javascript redux
date: 2018-04-07
---

I have been using React for about two years now, but have never used Redux for a major project. As I'm on vacation for a few days, I figure this is a great time to start learning Redux without the pressures of daily work. I want to take a different approach to learning frameworks this time around - using a bottom-up approach instead of top-down one. I'm going to review the source code ([at tag `v3.7.2`](https://github.com/reactjs/redux/tree/v3.7.2)) instead of API docs.

In my early experiments with Redux, I was delighted to find no frontend framework is necessary. Redux can be used in a Node project without issue, although that was obviously not the intent of Dan Abramov and its authors. Because experimenting outside of the browser leads to fewer distractions - no consideration of the DOM or browser APIs is necessary - this blog series will use a command-line app in Node as the project that invokes Redux.

This blog post will focus on Redux's `createStore`, and use a dumb counter command line application to discuss the Redux store. `createStore` only requires one argument (`reducer`), and can optionally take a `preloadedState` and `enhancer`. Today, I'm only going to pass the required `reducer` argument to `createStore`. The Redux source code describes this argument as follows:

>
@param {Function} reducer A function that returns the next state tree, given the current state tree and the action to handle.
>

And what does `createStore` return? 

>
Creates a Redux store that holds the state tree.
The only way to change the data in the store is to call `dispatch()` on it.
>

Let's trace the source code with only the `reducer` argument. `createStore` first checks that `reducer` is a function. Not passing a `reducer` that's a function throws an error:

```javascript
> const { createStore } = require('redux');
> createStore();
Error: Expected the reducer to be a function.
```

That makes sense, as no function means no way to input a state tree and output a new state tree.

The source then initializes 5 variables via `let` - meaning these variables can be set to different values without error - and 6 functions. I plan to eventually review all of these in future posts, but for now I'll simply discuss what happens when `createStore` is invoked. After declaration of these variables and functions, a call to `dispatch` is made (`dispatch({ type: ActionTypes.INIT })`) before the function returns an object. The comment above the initial dispatch reads as follows:

>
// When a store is created, an "INIT" action is dispatched so that every
// reducer returns their initial state. This effectively populates
// the initial state tree.
>

`ActionTypes.INIT` is the string `@@redux/INIT` (note that in the `4`+ releases this also includes a randomly generated alphanumeric string, like `3.o.k.a.q.1.v.5.x.q.s.b.6.r.d.i.y.6.6.r`). The Redux source notes about these action types:

>
These are private action types reserved by Redux.
For any unknown actions, you must return the current state.
If the current state is undefined, you must return the initial state.
Do not reference these action types directly in your code.
>

I don't expect my code to be familiar with the action type `@@redux/INIT`, so my `reducer` should return the initial state on first call and current state on subsequent calls - this makes sense, as the code comment before the first `dispatch` says its purpose is for every reducer to return its initial state.

This first `dispatch` call can be seen when creating a Redux store. I've set a breakpoint on my simple reducer within `createStore`, and here's what the first invocation looks like:

![](https://s3.amazonaws.com/redux-series/createStore-first-dispatch.png)

My store is ready to be returned following this dispatch call. The returned object has 5 keys (`dispatch`, `subscribe`, `getState`, `replaceReducer`, and a `Symbol(observable`), all of which have function values. 

`getState` is a simple function that just returns `currentState` (one of the aforementioned declared variables that is referenced by the other functions). On the `dispatch` call in `createStore`, `currentState` is set to the result from invoking the reducer passed to `createStore`:

![](https://s3.amazonaws.com/redux-series/current-state-and-reducer.png)

Based on what we know about `createStore`, writing a simple command line app that asks for a number from user input and logs it the console is simple enough:

<script src="https://gist.github.com/BenBrostoff/563190c9c17e99c6c031260514f5c215.js"></script>

In the next post, I want to discuss `dispatch` calls after the initial one and `subscribe`. I'll explore these Redux features by building the command line app out to allow decrementing, incrementing, multiplying and dividing numbers from user input.

---
layout: post
title: Redux - .dispatch
tags: technical javascript redux
date: 2018-04-09
---

Today's post will look at what happens on `store.dispatch(action)` calls after the `dispatch` call invoked in `createStore` (discussed in Part I of this Redux mini-series). As a refresher, the code below was generated in Part I. I'll I've done is add a call to dispatch to increment my command line counter by 1.

<script src="https://gist.github.com/BenBrostoff/b52270ab73dd98be56e9a33747f60be9.js"></script>

The counter now increments to the input number plus 1. So what happened here? `dispatch` is actually a very short method (26 lines total, including white space), so this blog post will attempt to explain each line. The whole of dispatch is below (recall I'm using Redux `3.7.2`):

<script src="https://gist.github.com/BenBrostoff/08cb9127085c104a1c7cae02c77a7764.js"></script>

I first want to review the commentary above the `dispatch` method in the Redux source. Portions of the commentary deal with actions that are `Promise`s, which Redux out of the box does not support. I'll skip those sections for now. The first relevant section is below:

> Dispatches an action. It is the only way to trigger a state change.
>
> The `reducer` function, used to create the store, will be called with the
current state tree and the given `action`. Its return value will
be considered the **next** state of the tree, and the change listeners
will be notified.

So, invoking `dispatch` is the only way to trigger a change in the store's `currentState`. `dispatch` is invoked with an `action` as an argument, which is passed to the reducer originally passed to `createStore`. The return value from the reducer is the new `currentState` of the tree. The final part of the sentence about change listeners is not yet relevant to the toy application I'm building, so I'll ignore it for now.

As previously noted, `dispatch` takes an `action` as an argument, which should be a POJO (helps with `redux-devtools`), needs a type property and cannot be undefined.

> @param {Object} action A plain object representing “what changed”. It is a good idea to keep actions serializable so you can record and replay user sessions, or use the time travelling `redux-devtools`. An action must have a `type` property which may not be `undefined`. It is a good idea to use string constants for action types.

The beginning of dispatch just covers these bases and raises errors where appropriate:

<script src="https://gist.github.com/BenBrostoff/6f4faaf4ebcaa0196d175ead31e42a76.js"></script>

There's also a conditional that checks that `isDispatching` is `truthy`, and raises an error if it is.

<script src="https://gist.github.com/BenBrostoff/22ac068b76cf22c53e21355d75cdc366.js"></script>

The reason for this error is to prevent calls to `dispatch` from a `reducer` (hence the error "Reducers may not dispatch actions."). Raising this error can be done by passing the store into an action and calling `dispatch` from the reducer, like so:

<script src="https://gist.github.com/BenBrostoff/0e64c47bcfa840ef244671432d60223e.js"></script>

The next part of `dispatch` is a `try` / `finally` block that sets `isDispatching` to true (a variable declared through `let` in `createStore`), sets `currentState` to `currentReducer(currentState, action)` (`currentState` is also declared via `let` in `createStore`), and then in the `finally` sets `isDispatching` back to false. Again, the only usage of `isDispatching` is in this function to prevent calling `dispatch` in the reducer.

<script src="https://gist.github.com/BenBrostoff/c5f0b1a92590c4b306dbf7cdf282694e.js"></script>

Also, if you're wondering why a `try` / `finally` here, the intent is to prevent Redux from never setting `isDispatching` back to `false`. This would prevent the reducer from ever firing again (because of the aforementioned "Reducers may not dispatch actions" error). I actually learned this from looking [at this Redux PR](https://github.com/reactjs/redux/pull/372), and specifically this exchange:

![](https://s3.amazonaws.com/redux-series/why-try-finally.png)

The final part of `dispatch` before the return statement is to set a `listeners` array equal to `currentListeners`, which is then set to `nextListeners`. Both the `*Listeners` variables are declared via `let` in `createStore`. A `for` loop then iterates through the listeners and invokes each one.

<script src="https://gist.github.com/BenBrostoff/323617a993a2bcfda4a8e77eff829b4f.js"></script>

In this toy example, both `currentListeners` and `nextListeners` are empty arrays, so there are no listeners to invoke.

The return value is just the `action` passed to it:

> @returns {Object} For convenience, the same action object you dispatched.

Why this is convenient, I'm not yet sure, but will trust the source for now.

We've done it! This post covers `dispatch` without any listeners set. I'll use the next post to generate listeners via `store.subscribe` and analyze what happens in that listeners loop when listeners exist.

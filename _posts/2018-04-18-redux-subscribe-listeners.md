---
layout: post
title: Redux - .subscribe
tags: technical javascript redux
date: 2018-04-20
---

My [last post](http://benbrostoff.github.io/2018/04/09/redux-dispatch-and-subscribe.html) explored calling `.dispatch` on a Redux store without listeners; in this post, I will add listeners to the toy application we've been building in this series and trace the `subscribe` source in the process. I'm now using `v4.0.0`, which was [released on April 16th](https://github.com/reactjs/redux/releases/tag/v4.0.0) - when I started on this series, Redux was on `v3.7.2`. To begin our code exploration, I'll call subscribe on our Redux store and pass in a callback that just logs the state of the store to the console:

<script src="https://gist.github.com/BenBrostoff/b296bda2b96040d0ec9950a7402d2fe6.js"></script>

Let's begin with the documentation for `subscribe` in the source.

> Adds a change listener. It will be called any time an action is dispatched,
and some part of the state tree may potentially have changed. You may then
call `getState()` to read the current state tree inside the callback.

The next items in the docs before the function signature are about calling `dispatch` from a change listener, which we'll ignore for now since our toy example does not do this. The function signature explains that `subscribe` expects a function that will be invoked on every dispatch and returns a function that when invoked will unsubscribe the listener:

> @param {Function} listener A callback to be invoked on every dispatch.
> @returns {Function} A function to remove this change listener.

The full `v4.0.0` source  for `subscribe` is below. When reading this blog post, it may be useful to split screen and have it open, although I'll add gists where relevant:

<script src="https://gist.github.com/BenBrostoff/226d5e7ea1c4ebe1c8b8293ea29ee795.js"></script>

As we've seen elsewhere in the Redux source, the beginning of the function body is type checking and raising errors if the expectations outlined in the docs are not met. Redux checks to see that `listener` is a function and that a `store.dispatch` call is not in progress when `subscribe` is invoked.

<script src="https://gist.github.com/BenBrostoff/ff4a896323dd937155bb18766278a7bc.js"></script>

Two notable things then happen:

<script src="https://gist.github.com/BenBrostoff/07b04cfde6c65d1cf6da4e09b7280e40.js"></script>

1. Redux sets a variable that will be updated later called `isSubscribed` to `true` - this makes sense from a naming perspective, as we're subscribing to a function. We'll come back to this variable when discussing `unsubscribe`, which predictably sets it to `false`.

2.  A function called `ensureCanMutateNextListeners` is called next, which is small despite the long name. All this does is check if two variables declared in `createStore` are the same array (and originally they are - `let nextListeners = currentListeners` happens on `createStore`). If they are, `nextListeners` is set equal to a copy of `currentListeners` via `.slice()`, thereby destroying the equality:

<script src="https://gist.github.com/BenBrostoff/994b547071145785093b0f1970485df6.js"></script>

The `listener` passed to `subscribe` is pushed into the array of `nextListeners`.

Note that the Redux docs have numerous references to the term "snapshotting listeners", and I take that to mean the function `ensureCanMutateNextListeners` is serving. The Redux source never adds or removes a listener without first copying `currentListeners` if `nextListeners` and `currentListeners` are a reference to the same value (`currentListeners` is assigned to `nextListeners` in `dispatch` and in `createStore`).

Finally, an `unsubscribe` function is returned, which includes closures from variables from `subscribe` and `createStore`.

<script src="https://gist.github.com/BenBrostoff/6bba11e54f70eb88f5ee88772a8de3ae.js"></script>

The first conditional and empty return is to ensure that calls to `unsubscribe` after the first call do nothing. On the first `unsubscribe` call, `isSubscribed` is set to `false`; afterwards, there is no way to set it back to `true`, since each `subscribe` call creates a separate closure. Calls to `unsubscribe` after the first one bail out as early as possible.

Next, Redux again checks if a `dispatch` call is in progress and throws an error if this is the case. The error here is to guard against calling unsubscribe while a reducer is executing. As an aside, this `if (isDispatching)` and error throwing logic happens three times in the `createStore` source - once in `dispatch` (reducers cannot dispatch actions), once in `getState` (cannot read state while reducer is executing) and once here.

As alluded to earlier, Redux then sets `isSubscribed` to false, guaranteeing future calls to `unsubscribe` will do nothing.

The meat of `unsubscribe` is next:

<script src="https://gist.github.com/BenBrostoff/974773e6151b28f66e67395cad37abf5.js"></script>

We reviewed `ensureCanMutateNextListeners()` - this call protects `nextListeners` from being mutated by changes to `currentListeners`. `nextListeners.indexOf(listener)` gets the index in the array of listeners of the listener unsubscribe is tied to. Finally, `nextListeners.splice(index, 1)` removes the listener from the `nextListeners` array. An example may be helpful.

<script src="https://gist.github.com/BenBrostoff/32a397577c574c8509020709fc3a918a.js"></script>

In the first unsubscribe call, `index` is 2 (`funcC` is the last listener in an array of three), then 1 (with `funcC` removed, `funcB` is now the last listener in an array of 2), then 0 (`funcA` is the only listener in an array of one). [`splice` is a mutative function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) that takes a position as the first argument and how many elements to delete as the second. With `unsubscribe`, `splice` is deleting the relevant listener at its respective position.

Now that we've reviewed subscribe, we can actually trace what happens on a dispatch with a listener:

<script src="https://gist.github.com/BenBrostoff/d73da8dd6ad848a2ee5a575d97685b59.js"></script>

At the very end of `dispatch` (the only remaining line is to return an action), Redux sets `currentListeners` to `nextListeners` and iterates through the current listeners in the order they were added. Each listener is then invoked with no arguments. It would be easy enough to give the listeners the current `action`, but [per the original author, Dan Abramov,](https://github.com/reactjs/redux/issues/1057) this is a misuse of the library:

> Subscribers should react to the new state, not to what happened.

In summary, the subscribe source:

- Checks that the passed argument is a function and that the reducer passed to `createStore` is not executing
- Pushes the passed listener function to an array of listeners (`nextListeners`)
- Returns an unsubscribe function that can be invoked in order to remove the listener from the array of listener

`dispatch` then invokes every listener in `currentListeners` (which is assigned to `nextListeners`). Thus, any function passed to subscribe will be called on `dispatch`.

That about wraps up the bulk of `createStore`. Note that I skipped some of the API that was not part of Redux in its original 2015 state - `replaceReducer` and Redux's `observable` functions were left out here.

Next, I want to dive into `applyMiddleware` and discussing how adding middleware to a Redux store works behind the scenes.

---
layout: post
title: Exploring TypeScript Generics
tags: technical javascript
date: 2019-01-12
---

I've been using TypeScript on several projects and wanted to jot down some quick thoughts on generics. To be clear, generics are not a new programming language construct and existed in languages liked C# and Java decades before TypeScript. That said, I find generics interesting in the context of TypeScript because I see and use them so often.

First, what are generics? I think of generics as a way to represent types without explicitly defining a type. A generic type is generic in that it's like a function parameter- able to represent anything. Also like a parameter in a function, its value can be passed as an argument (via `<SomeType>`) and referenced throughout the body of the function. This quality is one of many reasons generics are more powerful than simply using the `any` type. [The official TypeScript docs on generics](https://www.typescriptlang.org/docs/handbook/generics.html) are an excellent resource on when to use generics, and I highly recommend them.

Below are some use cases for generics I've found helpful.

**Promises**

In TypeScript, promises can be initialized such that they "lock" a generic into a type:

![](https://s3.amazonaws.com/brostoff-blog/promise.png)

[The `Promise` source](https://github.com/Microsoft/TypeScript/blob/master/lib/lib.es2015.promise.d.ts#L33) makes the warning above possible. IDEs use the source to determine that the callback in the promise constructor must return something of type `T` or `PromiseLike<T>` or `undefined`, where `T` in this case is number. Note that PromiseLike here is a [separate type](https://github.com/Microsoft/TypeScript/blob/master/lib/lib.es5.d.ts#L1376-L1384).

In the case of promises, I find generics useful because I can gain an understanding of what an async function resolves to without having to look at source code. Consider the following non-TypeScript example:

<script src="https://gist.github.com/BenBrostoff/fa6a4b370cfe1292d3e9db98b96860c6.js"></script>

Now check out the TypeScript equivalent:

<script src="https://gist.github.com/BenBrostoff/a77c068e8e8d41191d434077b95cff8e.js"></script>

Only in the second example can the developer know with some confidence that the promise resolves to a `UserProfile` (well, or `undefined` or `PromiseLike<UserProfile>`). Without TypeScript, it's necessary to look at the function definition and the return value. Even then, the name `lookupProfile` may be inaccurate depending on how it was implemented; TypeScript at least will fail to compile if the type returned is not a `UserProfile`.

Importantly, code changes in `lookupProfile` are nicely handled by TypeScript generics. Let's say the function can return an admin profile or a user profile - you can simply adjust the type to `Promise<UserProfile | AdminProfile>`.

**React Components**

`React.SFC` - React's stateless functional component - has a type definition like the below:

<script src="https://gist.github.com/BenBrostoff/dd9ae512d7d7eb26368e8f88a750ceda.js"></script>

In the above, the type parameter is also passed to `propTypes` and `defaultProps` through `ValidationMap` and `Partial`, respectively, which also take generic arguments.

Writing components without TypeScript might look like this:

<script src="https://gist.github.com/BenBrostoff/199b5d3097ef775243743a5392c51760.js"></script>

And now with TypeScript:

<script src="https://gist.github.com/BenBrostoff/9af73129bd46ac462f3f74987dbffaeb.js"></script>

While using `PropTypes` is a perfectly valid option here and will offer some of the same benefits as TypeScript, you can still run a React application with components that are missing required props; it will just crash at runtime.

With TypeScript, this error will happen at compile time, saving time and possibly a production bug that would never have been caught until users found it. Better yet, it offers a useful error message to developers who violate the component spec - let's say in the case of a typo:

>Type '{ message1: number; }' is not assignable to type 'IntrinsicAttributes & SomeProps & { children?: ReactNode; }'.
  Property 'message1' does not exist on type 'IntrinsicAttributes & SomeProps & { children?: ReactNode; }'.

Again, *this error is not raised in the non-TypeScript case*. The React component still renders and the div just has no text.

**Apollo**

The Apollo client uses generics frequently throughout the result. I only highlight `ApolloQueryResult` and the HOC `graphql` in this discussion, but rest assured generics are heavily used in the Apollo codebase.

`ApolloQueryResult` ([source here](https://github.com/apollographql/apollo-client/blob/master/packages/apollo-client/src/core/types.ts#L19-L25), returned from a query or mutation) takes a generic that describes data in a graphql response. The generic argument gets passed to the data property on the Apollo result. The advantages of this type are similar to the advantages of TypeScript promises (it actually acts as the [generic argument](https://github.com/apollographql/apollo-client/blob/master/packages/apollo-client/src/ApolloClient.ts#L274) a promise accepts).

I've used Apollo without TypeScript and remember being frustrated with seeing different components extract different parts of `ApolloQueryResult` - some components would utilize `loading`, `networkStatus`, and / or `errors`. `data` especially was a difficult property to work with because knowing its shape - at least for me - generally required logging a response.

TypeScript makes this logging unnecessary (well, less necessary - to be clear it's impossible to know what the server will send back at compile time). Apollo provides a [code sandbox](https://codesandbox.io/s/github/apollographql/apollo-link-rest/tree/master/examples/typescript) here with a great example, part of which is copied in a gist below. Note that this example doesn't actually use ApolloQueryResult and instead uses a similar prop from react-apollo that [gets added from `ChildProps`](https://github.com/apollographql/react-apollo/blob/apollo-client-2.0/src/types.ts#L66-L69).

<script src="https://gist.github.com/BenBrostoff/4e544db73630b6e488b58bca8272c930.js"></script>

The `graphql` higher order component [accepts two generic arguments](https://github.com/apollographql/react-apollo/blob/master/src/graphql.tsx#L10-L31), one of which describes the data from `ApolloQueryResult`, and the other which describes the props passed to the component being wrapped by the higher order function.The graphql HOC takes the advantages described with `ApolloQueryResult` and React component and combines them. It's now obvious what the graphql server should be returning as well as what props the wrapped component expects.

Side note - one interesting thing I found out about `ChildProps` while researching this post is that it takes in two generics and from its constructor returns an [intersection](https://www.typescriptlang.org/docs/handbook/advanced-types.html) of types. This is a use case of generics that is extremely powerful; creating types that can intersect, unionize or do anything with multiple types to create new types.

**Conclusion**

My brother and I have a multi-year debate going on about the value of code comments. I am a comment minimalist for many reasons, but the existence of type systems is the main point I fall back on. Compile time checks and good error messages in my opinion are a much better explanation of code than long comments.

Generics offer the reusablity, type assertions and ease of understanding that comments cannot replicate. Most importantly, comments cannot prevent a class of bugs that could have been prevented at compile time.

Generics make creation and reusability of types easy. The ability to create types that produce other types saves you a lot of typing - pardon the pun.
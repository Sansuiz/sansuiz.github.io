---
layout: post
title: Guesses and Information
tags: general decision-making
date: 2018-11-17
---

Learning from your wrong guesses is fundamentally different than learning from mistakes. In this post, I’ll explore why playing the board game Mastermind has given me a strong appreciation for the power of wrong guessing.

First, I want to clearly differentiate between mistakes and guessing wrong. Mistakes can be avoided by logical thinking. For example, it’s a mistake to play casino games because they have negative expected value. You will lose money if you play on a long enough time horizon.

Guessing about the state of the world isn’t a mistake; in fact, it’s something I believe we should do as often as possible. Guessing is necessary because it is often the only device we can use to gain information.

This idea presented itself while playing Mastermind with one of my buddies this week. For those unfamiliar with the game, two players face off where one creates an ordered sequence of four pegs (which can be six different colors), and the other player guesses to find the combo. The guesser on each guess is given the number of exact peg guesses correct (right color, right place) and number of color guesses correct (right color, wrong place). In this way, the guesser gains information on every guess. As an aside, Donald Knuth developed an algorithm to determine the pattern in [at most five guesses](http://www.cs.uni.edu/~wallingf/teaching/cs3530/resources/knuth-mastermind.pdf).

If you think Mastermind is easy for the guesser, you’re not wrong. Each turn gets you closer to the four peg combo, and not solving the game in the eight allotted guesses (depending on what version you’re playing) most likely means you failed to use available information to your advantage.

That said, it’s possible and likely to regress on the number of correct scores from turn to turn. Consider this scenario:

![](https://s3.amazonaws.com/redux-series/guess-1.png)

On the first turn, the guesser is elated when they are given feedback of three exactly correct guesses. But which ones? It’s statistically unlikely on the second turn to *not* regress. You have to guess about the state of the world because it’s impossible to know which three were correct.

Here’s a good second guess:

![](https://s3.amazonaws.com/redux-series/guess-2a.png)

The guesser scores a “worse” score here, with only two right-color, right-position and one right-color, wrong-position, but has extracted valuable information:

- Red is clearly a wrong color (or else they would get four scoring pegs)
- One of the blue pegs is in the wrong position (or else they would have equaled the previous score)

From here, aiming to get the color scheme correct (by continually swapping out the red peg for other colors until the scoring changes) and getting the position correct (by moving the three blue pegs to different positions until three are correct again) are the clear strategies. Guessing wrong has delivered this information.

This idea to me is the central lesson of Mastermind that extends to so many other areas of life: When we are most wrong, we have extracted more useful information than when we are close to right. The reason I think this is the case is that being close to right does not necessarily deliver any information on *why* we are close to right.

Flat-out wrongness at least shows you nothing is working; rightness forces you to guess on the factors that led to success. In this way, being right may not deliver useful information.

Human psychology unfortunately is not conducive to embracing this lesson. Being right makes me feel smart and wrong makes me feel stupid. Hence, guessing right is dangerous because we may extract information that had nothing to do with being right. Guessing wrong makes it easy to abandon a venture because we just assume we have no potential to succeed due to some genetic or personal failure. In reality, there is no skill to guessing, so we should de-personalize successes and failures where luck plays a key role.

The lesson here I think is to keep guessing after initial success to reject or confirm the *why* of the right guess. Similarly, with wrong guesses, instead of writing ourselves off, our energy should be focused on extracting as much information as possible from the experience.

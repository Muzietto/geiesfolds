# geiesfolds   ( _j_-_s_-folds)

PRE-RELEASE 0.1
---------------

Crisp clear Javascript folds. This repository relies on [geieslists](https://github.com/Muzietto/geieslists) for handling functions like cons, head/car, tail/cdr.

It features the translation c/q adaptation in JavaScript of the Haskell examples from 1) and 2), plus the Scala examples from 3).

All this while throwing in some original experiments and links to other functional matters like tuples and continuations.

This code is presented at:

http://faustinelli.wordpress.com/2013/09/10/fold-right-in-javascript/
http://faustinelli.wordpress.com/2010/04/22/foldleft-foldright/

I know this JavaScript code is just a bunch of global stuff, but it's not meant to be used as-is in a production environment.

ORIGINAL CONTRIBUTION
---------------------
Getting to master fold right is a very difficult undertaking. I have found plenty of fold left blog examples, but 
very little about fold right. Let alone in Javascript.

The main idea is to present a series of examples of increasing difficulty, illustrating new FP techniques
along the way.

In the case of fold right there are also two original contributions, get n and archiveBuilder (still WIP).

There are a few original examples of fold left in the code, but they aren't yet commented in the blog page.
Fold left is easy, though. And there are plenty of sources out there.

DEBITS AND CREDITS
------------------
I am in deep debt with:

1) A tutorial on the universality and expressiveness of fold (Graham Hutton)

2) Real World Haskell, O'Reilly

3) http://oldfashionedsoftware.com/2009/07/30/lots-and-lots-of-foldleft-examples/

Any feedback is welcome.

--------------------------
Released under MIT License.

/*
	GEIESFOLDS - JS fold right and then left
	Author: Marco Faustinelli (contacts@faustinelli.net)
	Web: http://faustinelli.net/
	     http://faustinelli.wordpress.com/
	Version: 0.1 (pre)
	
	Requires geieslists.

	The MIT License - Copyright (c) 2013 Geiesfolds Project
*/
/* - Hutton: A tutorial on the universality and expressiveness of fold
   - http://oldfashionedsoftware.com/2009/07/30/lots-and-lots-of-foldleft-examples/ */

// fold right (fold)
function fold(f){
	return function(v){
		return function(xs){
			if (isEmpty(xs)){
				return v;
			} else {
				return f(head(xs))(fold(f)(v)(tail(xs))); // fx fold fv xs
			}
		};
	};
};

// fold left (foldl)
function foldl(s){  // step
	return function (a) {  // accumulator (aka zero)
		return function(xs){
			if (isEmpty(xs)){
				return a;
			} else {
				return foldl(s)(s(a)(head(xs)))(tail(xs)); // foldl s sax xs
			}
		};
	};
};

// tuples management (helper functions)
function pair(first) {
	return function(second) {
		return cons(first,cons(second,EMPTY));
	}
}

function first(tuple) { 
	if (size(tuple)!==2) throw 'Not a tuple!'
	else return head(tuple)
}
function second(tuple) { 
	if (size(tuple)!==2) throw 'Not a tuple!'
	else return head(tail(tuple))
}
var _1 = first, _2 = second;

// let'name things by their own name
var IDENTITY = EMPTY;

// PART ONE: using fold right

// sum
function adder(a){
	return function(b){
		return a + b;
	}
};
var sumWithFold = fold(adder)(0);

// product
function multiplier(a){
	return function(b){
		return a * b;
	}
};
var productWithFold = fold(multiplier)(1);

// and
function and(a){
	return function(b){
		return a && b;
	}
};
var andWithFold = fold(and)(true);

// or
function or(a){
	return function(b){
		return a || b;
	}
};
var orWithFold = fold(or)(false);

// length
function lenghter(x){
	return function(n){
		return n + 1;
	};
};

var lengthWithFold = fold(lenghter)(0);

// reverse - redefine concat first
function curriedConcat(aList){
	return function(bList){
		if (isEmpty(aList)) return bList;
		else if (isEmpty(bList)) return aList;
		else if (isEmpty(tail(aList))) return cons(head(aList),bList);
		else return cons(head(aList),curriedConcat(tail(aList))(bList));
	};
};

function concatter(x){
	return function(y){
		return curriedConcat(y)(cons(x,EMPTY));
	};
};

var concatWithFold = fold(concatter)(EMPTY);

// filter
function filterer(p){
	return function(x){ // \x,y -> if px then y else x:y
		return function(y){
			return (p(x)) ? y : cons(x,y);
		};
	};
};

var filterWithFold = function(p){
	return fold(filterer(p))(EMPTY);
};

// map
function mapper(f){
	return function(x){ // \x,y -> fx:y
		return function(y){
			return cons(f(x),y);
		};
	};
};

var mapWithFold = function(f){
	return fold(mapper(f))(EMPTY);
};

// sumlength
function sumlengther(x){
	return function(y){
		return pair(x+_1(y))(1+_2(y));
	};
};

var sumLengthWithFold = fold(sumlengther)(pair(0)(0));

// dropWhile
function dwApexer(p){
	return function(x){ // \x,(a,b) -> (if px then a else x:b,x:b)
		return function(ab){
			var a=first(ab),b=second(ab);
			return pair(p(x) ? a : cons(x,b))(cons(x,b));
		}
	}
}

var dropWhileApexWithFold = function(p){
	return fold(dwApexer(p))(pair(EMPTY)(EMPTY));
}

// compose - gotta redefine cons to put functions in list
function localCons(x,y){return function(w){return w(x,y);};};

function composer(x){
	return function(y){
		return x(y);
	}
}
// NB: will use operand instead of IDENTITY at deepest recursion level!
var composeWithFold = function(funcs){
	return function(operand){
		return fold(composer)(operand)(funcs);
	}
}

// suml
function sumLeftApex(x){ // head
	return function(y){ // sumLeftApex(xs)
		return function(z){ // acc
			return y(x+z);
		};
	};
};

var sumLeftWithFold = function(addenda){
	return fold(sumLeftApex)(IDENTITY)(addenda)(0); // sumLeftApex is the helper of the real thing!
};

// foldl (expressed through fold right)
// WIP


// PART TWO: using fold left
var sumWithFoldl = foldl(function(a){return function(x){return a+x;}})(0);
var productWithFoldl = foldl(function(a){return function(x){return a*x;}})(1);
var countWithFoldl = foldl(function(a){return function(x){return a+1;}})(0);

var averageWithFoldl = function(xs){
	if (isEmpty(xs)) {
		return NaN;
	} else {
		var averager = function(aPair){ // that's the accumulator!
			var ave = first(aPair), count = second(aPair);
			return function(x){
				var newAve = (ave*count+x)/(count+1);
				return pair(newAve)(count+1);
			};
		};
		return first(foldl(averager)(pair(head(xs))(1))(tail(xs)));
	}
};

// special bonus: continuations
function lengthWithContinuation(aList) {
	return function(aCont){
		if (isEmpty(aList)) return aCont(0);
		else return lengthWithContinuation(tail(aList))(function(x){
			return aCont(x+1);
		});
	}
};

function sumWithContinuation(aList) {
	return function(aCont){
		if (isEmpty(aList)) return aCont(0);
		else return sumWithContinuation(tail(aList))(function(x){
			return aCont(x+head(aList));
		});
	}
};

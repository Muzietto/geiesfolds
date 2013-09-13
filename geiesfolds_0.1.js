/*
	GEIESFOLDS - JS fold right and then left
	Author: Marco Faustinelli (contacts@faustinelli.net)
	Web: http://faustinelli.net/
	     http://faustinelli.wordpress.com/
	Version: 0.1 (pre)
	
	Requires geieslists 1.0

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

/* tuples management (helper functions)
   "And after all, Hare did have a spare pair" (1973)  */
function pair(first) {
	return function(second) {
		return cons(first,cons(second,EMPTY));
	}
}

function first(aPair) { 
	if (size(aPair)!==2) throw 'Not a pair!'
	else return head(aPair)
}
function second(aPair) { 
	if (size(aPair)!==2) throw 'Not a pair!'
	else return head(tail(aPair))
}
var _1 = first, _2 = second;

// let'name things by their own name
var IDENTITY = EMPTY;

// a useful helper for repeating things
function count(times){
	var _soFar = times;
	return function(){
		return (--_soFar>=0)?true:false;
	};
};



// PART ONE: using fold right
// --------------------------
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

var reverseWithFold = fold(concatter)(EMPTY);

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
function composeWithFold(funcs){
	return function(operand){
		return fold(composer)(operand)(funcs);
	}
}

// suml
function sumLeftApex(x){ // head
	return function(y){ // sumLeftApex(xs)
		return function(z){ // acc
			return y(x+z); // sumLeftApex(x+acc)(xs)
		};
	};
};

function sumLeftWithFold(addenda){
	return fold(sumLeftApex)(IDENTITY)(addenda)(0); // sumLeftApex is the helper of the real thing!
};

// getWithFoldRight
function getterRight(x){ // head
	return function(y){ // getApex(xs)
		return function(n){ // current index
			return (n===0)?x:y(n-1);
		};
	};
};

function getWithFold(xs){
	return function(index){
		return fold(getterRight)(function(n){throw 'OUT!'})(xs)(index);
	};
}; 

// foldl (expressed through fold right)
// WIP


// PART TWO: using fold left
// -------------------------
var sumWithFoldl = foldl(function(a){return function(x){return a+x;}})(0);
var productWithFoldl = foldl(function(a){return function(x){return a*x;}})(1);
var countWithFoldl = foldl(function(a){return function(x){return a+1;}})(0);

function averageWithFoldl(xs){
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

function lastWithFoldl(xs){
	return foldl(function(a){ // acc contains xs and gets sliced more and more
		return function(x){
			return isEmpty(a)?x:tail(a);
		}
	})(tail(xs))(xs);
};

function penultimateWithFoldl(xs){
	return first(foldl(function(aPair){  // (last,penultimate)
		return function(x){
			var penultimate = second(aPair);
			return pair(penultimate)(x);
		}
	})(pair(head(xs))(head(tail(xs))))(xs));
};

function containsWithFoldl(xs){
	return function(elem){
		var container = function(a){
			return function(x){
				return a || x===elem;
			}
		};
		return foldl(container)(false)(xs);
	};
};

function getWithFoldl(xs){
	return function(index){
		var getter = function(aPair){
			var currentIndex = first(aPair), result = second(aPair);
			return function(x){
				var nextResult = (currentIndex<=index)?x:result;
				return pair(currentIndex+1)(nextResult);
			};
		};
		return second(foldl(getter)(pair(0)(EMPTY))(xs));
	};
};

var reverseWithFoldl = foldl(function(a){return function(x){return cons(x,a);};})(EMPTY);
// NB - foldleft reverses lists
var uniqWithFoldl = function(xs){return reverseWithFoldl(foldl(function(a){return function(x){return containsWithFoldl(a)(x)?a:cons(x,a);};})(EMPTY)(xs));}

// study next one with compose!
//var uniqWithFoldl = reverseWithFoldl(foldl(function(a){return function(x){return containsWithFoldl(a)(x)?a:cons(x,a);};})(EMPTY));

var encoder = function(pairs){
	var currentEncoding, leadValue, currentValue;
	return function(x){
		if (isEmpty(pairs)) return cons(pair(x)(1),pairs);
		else {
			currentEncoding = head(pairs);
			leadValue = first(currentEncoding);
			currentValue = second(currentEncoding);
			if (x===leadValue) return cons(pair(leadValue)(currentValue+1),tail(pairs));
			else return cons(pair(x)(1),pairs);
		}
	};
};
var encodeWithFoldl = function(xs){return reverseWithFoldl(foldl(encoder)(EMPTY)(xs));}

var decoder = function (decodeds){
	return function(x){ // x = (key,value)
		var key = first(x), value = second(x),
		times=count(value), conser
		;
		//conser = function()
		return fold(localCons)(decodeds);
	};
};
var decodeWithFoldl = function(xs){return reverseWithFoldl(foldl(decoder)(EMPTY)(xs));}

/* archiveBuilder: 
 - archiveBuilder(['a','b','c'],{},'leaf') --> {a:{b:{c:'leaf'}}}
 - archiveBuilder(['a','b','b'],{a:{b:{c:'leaf'}}},'leaf2') --> {a:{b:{b:'leaf2',c:'leaf'}}}
*/
var archiveBuilder = function(){};

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

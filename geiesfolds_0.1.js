/*
	GEIESFOLDS - JS fold right and then left
	Author: Marco Faustinelli (contacts@faustinelli.net)
	Web: http://faustinelli.net/
	     http://faustinelli.wordpress.com/
	Version: 0.1 (pre)
	
	Requires geieslists.

	The MIT License - Copyright (c) 2013 Geiesfolds Project
*/
// Hutton: A tutorial on the universality and expressiveness of fold

// fold right
function fold(f){
	return function(v){
		return function(xs){
			if (isEmpty(xs)){
				return v;
			} else {
				return f(head(xs))(fold(f)(v)(tail(xs)));
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
function dwapexer(p){
	return function(x){ // \x,(a,b) -> (if px then a else x:b,x:b)
		return function(ab){
			var a=first(ab),b=second(ab);
			return pair(p(x) ? a : cons(x,b))(cons(x,b));
		}
	}
}

var dropWhileApexWithFold = function(p){
	return fold(dwapexer(p))(pair(EMPTY)(EMPTY));
}

// compose


// suml



// foldl

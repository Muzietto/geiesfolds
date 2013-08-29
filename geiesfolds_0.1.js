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


// filter


// map


// tuples functions

// sumlength


// dropWhile


// compose


// suml



// foldl

var bind = function(pair,continuation) { return continuation(pair); };

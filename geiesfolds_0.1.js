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

// product

// and


// or


// length


// reverse


// filter


// map


// tuples functions

// sumlength


// dropWhile


// compose


// suml



// foldl

var bind = function(pair,continuation) { return continuation(pair); };

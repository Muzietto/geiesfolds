
var abApexer = function(x){
		return function(y){
			return function(r){
				return y(r)(x);
			};
		};
};

var vu = function(leaf){ // istantiated at the begin
	return function(r){ // current root
		return function(x){ // current key
			r[x]=leaf;
			return r;
		};
	};
};

var archiveBuilder = function(locator,start,leaf){
	return fold(abApexer)(vu(leaf))(locator)(start);
};
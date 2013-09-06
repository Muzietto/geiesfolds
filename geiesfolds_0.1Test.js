/*
	GEIESFOLDS - JS fold right and then left
	Author: Marco Faustinelli (contacts@faustinelli.net)
	Web: http://faustinelli.net/
	     http://faustinelli.wordpress.com/
	Version: 0.1 (pre)

	The MIT License - Copyright (c) 2013 Geiesfolds Project
*/

YAHOO.namespace('GEIESFOLDS.test');

var Assert = YAHOO.util.Assert;

YAHOO.GEIESFOLDS.test.oTestFoldRightBasics = new YAHOO.tool.TestCase({
	name : "TestFoldRightBasics",
	testFoldRightBasics : function() {
	
		// recap from geieslists
		Assert.isTrue(isEmpty(EMPTY));		
		Assert.areEqual('abc', head(cons('abc',EMPTY)));
		Assert.areEqual(EMPTY, tail(cons('abc',EMPTY)));
		
		// tuples functions
		var couple = pair('a')('b');
		Assert.areEqual('a', _1(couple));
		Assert.areEqual('b', _2(couple));

		Assert.areEqual(6, sumWithFold(ArrayToList([1,2,3])),'fold right: sum is not right!');
		Assert.areEqual(24, productWithFold(ArrayToList([1,2,3,4])),'fold right: product is not right!');

		Assert.areEqual(true, andWithFold(ArrayToList([true,true,true])),'fold right: and1 is not right!');
		Assert.areEqual(false, andWithFold(ArrayToList([true,false,true])),'fold right: and2 is not right!');

		Assert.areEqual(true, orWithFold(ArrayToList([false,false,true])),'fold right: or1 is not right!');
		Assert.areEqual(false, orWithFold(ArrayToList([false,false,false])),'fold right: or2 is not right!');

		// continuations
		var kappa = function(n) {
			return n+1;
		};
		Assert.areEqual(3+1, lengthWithContinuation(ArrayToList([1,2,3]))(kappa),'lengthWithContinuation is not right!');
		Assert.areEqual(6+1, sumWithContinuation(ArrayToList([1,2,3]))(kappa),'sumWithContinuation is not right!');
	}
});

YAHOO.GEIESFOLDS.test.oTestFoldRightAdvanced = new YAHOO.tool.TestCase({
	name : "TestFoldRightAdvanced",
	testFoldRightAdvanced : function() {
	
		// length
		Assert.areEqual(0, lengthWithFold(ArrayToList([])),'fold right: length1 is not right!');
		Assert.areEqual(3, lengthWithFold(ArrayToList([1,2,3])),'fold right: length2 is not right!');

		// concat
		Assert.areEqual('[1,2,3,a,b,c]', curriedConcat(ArrayToList([1,2,3]))(ArrayToList(['a','b','c'])).c,'fold right: curriedConcat is not right!');
		
		Assert.areEqual('[3,2,1]', concatWithFold(ArrayToList([1,2,3])).c,'fold right: concat is not right!');
		
		// filter
		var filter2 = function(x){return (x===2);};
		Assert.areEqual('[1,3]', filterWithFold(filter2)(ArrayToList([1,2,3,2,2,2,2])).c,'fold right: filter is not right!');

		// map
		var adder2 = function(x){
			return x+2;
		};
		Assert.areEqual('[3,4,5]', mapWithFold(adder2)(ArrayToList([1,2,3])).c,'fold right: map is not right!');
		
		// sumlength
		Assert.areEqual('[6,3]', sumLengthWithFold(ArrayToList([1,2,3])).c,'fold right: sumLength is not right!');

		// dropWhile
		var dropperUpTo2 = function(x){
			return (x<3);
		};
		var aPair = dropWhileApexWithFold(dropperUpTo2)(ArrayToList([1,2,3,4,5]));
		Assert.areEqual('[3,4,5]', first(aPair).c,'fold right: first(dropWhileApex) is not right!');
		Assert.areEqual('[1,2,3,4,5]', second(aPair).c,'fold right: second(dropWhileApex) is not right!');
		Assert.areEqual('[[3,4,5],[1,2,3,4,5]]', aPair.c,'fold right: dropWhileApex is not right!');

		// compose - gotta use redefined cons to put functions in list
		var times2 = function(x){
			return x*2;
		};
		var testFuncs = localCons(times2,localCons(adder2,EMPTY));
		Assert.areEqual(6, composeWithFold(testFuncs)(1),'fold right: compose is not right!');

		// sumleft
		Assert.areEqual(6, sumLeftWithFold(ArrayToList([1,2,3])),'fold right: sumLeftWithFold is not right!');

	}
});

YAHOO.GEIESFOLDS.test.oTestFoldLeftBasics = new YAHOO.tool.TestCase({
	name : "TestFoldLeftBasics",
	testFoldLeftBasics : function() {
	
		Assert.areEqual(6, sumWithFoldl(ArrayToList([1,2,3])),'fold left: sum is not right!');
		Assert.areEqual(24, productWithFoldl(ArrayToList([1,2,3,4])),'fold left: product is not right!');
		Assert.areEqual(4, countWithFoldl(ArrayToList([1,2,3,4])),'fold left: count is not right!');
		
		
	}
});

YAHOO.GEIESFOLDS.test.oTestFoldLeftAdvanced = new YAHOO.tool.TestCase({
	name : "TestFoldLeftAdvanced",
	testFoldLeftAdvanced : function() {
	
		Assert.areEqual(0, averageWithFoldl(ArrayToList([-5,1,-2,2,-3,0,5,-1,3])),'fold left: average is not right!');
		Assert.areEqual(3, lastWithFoldl(ArrayToList([1,2,-3,0,5,1,3])),'fold left: last is not right!');
		Assert.areEqual(1, penultimateWithFoldl(ArrayToList([1,2,-3,0,5,1,3])),'fold left: penultimate is not right!');
	
		Assert.isTrue(containsWithFoldl(ArrayToList([1,2,-3,0,5,1,3]))(0),'fold left: contains1 is not right!');
		Assert.isFalse(containsWithFoldl(ArrayToList([1,2,-3,0,5,1,3]))(10),'fold left: contains2 is not right!');

		Assert.areEqual(1, getWithFoldl(ArrayToList([1,2,-3,0,5,1,3]))(0),'fold left: get1 is not right!');
		Assert.areEqual(3, getWithFoldl(ArrayToList([1,2,-3,0,5,1,3]))(6),'fold left: get2 is not right!');

		Assert.areEqual(ArrayToList([3,1,5,0,-3,2,1]).c, reverseWithFoldl(ArrayToList([1,2,-3,0,5,1,3])).c,'fold left: reverse is not right!');
		// NB - foldleft reverses lists
		Assert.areEqual(ArrayToList([5,0,-3,2,1]).c, uniqWithFoldl(ArrayToList([1,2,-3,1,0,5,1,-3])).c,'fold left: uniq is not right!');
		
		//Assert.areEqual('[[1,3],[0,1],[2,1],[-3,2],[0,4],[5,3],[1,2],[3,4]]', encodeWithFoldl(ArrayToList([1,1,1,0,2,-3,-3,0,0,0,0,5,5,5,1,1,3,3,3,3])).c,'fold left: encode is not right!');
		//Assert.areEqual('[1,1,1,0,2,-3,-3,0,0,0,0,5,5,5,1,1,3,3,3,3]', decodeWithFoldl(ArrayToList([[1,3],[0,1],[2,1],[-3,2],[0,4],[5,3],[1,2],[3,4]])).c,'fold left: decode is not right!');
		
	}
});


YAHOO.util.Event
		.onDOMReady(function() {

			YAHOO.GEIESFOLDS.test.GEIESFOLDS_TestSuite = new YAHOO.tool.TestSuite(
					"YUI Test Suite for GEIESFOLDS");

			YAHOO.GEIESFOLDS.test.GEIESFOLDS_TestSuite
					.add(YAHOO.GEIESFOLDS.test.oTestFoldRightBasics);
			YAHOO.GEIESFOLDS.test.GEIESFOLDS_TestSuite
					.add(YAHOO.GEIESFOLDS.test.oTestFoldRightAdvanced);
			YAHOO.GEIESFOLDS.test.GEIESFOLDS_TestSuite
					.add(YAHOO.GEIESFOLDS.test.oTestFoldLeftBasics);
			YAHOO.GEIESFOLDS.test.GEIESFOLDS_TestSuite
					.add(YAHOO.GEIESFOLDS.test.oTestFoldLeftAdvanced);

			var logger = new YAHOO.tool.TestLogger("testLogger_GEIESFOLDS");
			logger.hideCategory("info");

			YAHOO.tool.TestRunner
					.add(YAHOO.GEIESFOLDS.test.GEIESFOLDS_TestSuite);
					
			YAHOO.tool.TestRunner.run()
		});

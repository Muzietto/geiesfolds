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
	
		Assert.isTrue(isEmpty(EMPTY));
		
		var pippo = cons('qwe',EMPTY);
		Assert.areEqual('qwe', head(pippo));
		
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

	}
});

YAHOO.GEIESFOLDS.test.oTestFoldRightAdvanced = new YAHOO.tool.TestCase({
	name : "TestFoldRightAdvanced",
	testFoldRightAdvanced : function() {
	
		Assert.areEqual(0, lengthWithFold(ArrayToList([])),'fold right: length1 is not right!');
		Assert.areEqual(3, lengthWithFold(ArrayToList([1,2,3])),'fold right: length2 is not right!');

		Assert.areEqual('[1,2,3,a,b,c]', curriedConcat(ArrayToList([1,2,3]))(ArrayToList(['a','b','c'])).c,'fold right: curriedConcat is not right!');
		
		Assert.areEqual('[3,2,1]', concatWithFold(ArrayToList([1,2,3])).c,'fold right: concat is not right!');
		
		var filter2 = function(x){return (x===2);};
		Assert.areEqual('[1,3]', filterWithFold(filter2)(ArrayToList([1,2,3,2,2,2,2])).c,'fold right: filter is not right!');

		var adder2 = function(x){
			return x+2;
		};
		Assert.areEqual('[3,4,5]', mapWithFold(adder2)(ArrayToList([1,2,3])).c,'fold right: map is not right!');
		
		Assert.areEqual('[6,3]', sumLengthWithFold(ArrayToList([1,2,3])).c,'fold right: sumLength is not right!');

		var dropperUpTo2 = function(x){
			return (x<3);
		};
		var aPair = dropWhileApexWithFold(dropperUpTo2)(ArrayToList([1,2,3,4,5]));
		Assert.areEqual('[3,4,5]', first(aPair).c,'fold right: first(dropWhileApex) is not right!');
		Assert.areEqual('[1,2,3,4,5]', second(aPair).c,'fold right: second(dropWhileApex) is not right!');
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

			var logger = new YAHOO.tool.TestLogger("testLogger_GEIESFOLDS");
			logger.hideCategory("info");

			YAHOO.tool.TestRunner
					.add(YAHOO.GEIESFOLDS.test.GEIESFOLDS_TestSuite);
					
			YAHOO.tool.TestRunner.run()
		});

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

YAHOO.GEIESFOLDS.test.oTestXXX = new YAHOO.tool.TestCase({
	name : "TestXXX",
	testXXX : function() {
	
		var pippo = cons('qwe',EMPTY);
//		Assert.isTrue(isEmpty(EMPTY))

		Assert.areEqual('qwe', head(pippo));
	}
});



YAHOO.util.Event
		.onDOMReady(function() {

			YAHOO.GEIESFOLDS.test.GEIESFOLDS_TestSuite = new YAHOO.tool.TestSuite(
					"YUI Test Suite for GEIESFOLDS");

			YAHOO.GEIESFOLDS.test.GEIESFOLDS_TestSuite
					.add(YAHOO.GEIESFOLDS.test.oTestXXX);

			var logger = new YAHOO.tool.TestLogger("testLogger_GEIESFOLDS");
			logger.hideCategory("info");

			YAHOO.tool.TestRunner
					.add(YAHOO.GEIESFOLDS.test.GEIESFOLDS_TestSuite);
					
			YAHOO.tool.TestRunner.run()
		});

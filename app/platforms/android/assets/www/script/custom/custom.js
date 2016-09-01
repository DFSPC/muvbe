$( document ).ready(function() {


	$( window ).load(function() {
	  // Run code
	   console.log( "ready!" );
		var $elem =  $(".view-user .menu-post .link-post");

		console.log($elem);
		$elem.click(function() {
			/* Act on the event */
			console.log("sisisis");
		});

	});

});
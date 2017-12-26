jQuery(document).ready(function($){
	//open navigation clicking the menu icon
	$('.cd-nav-trigger').on('click', function(event){
		event.preventDefault();
		toggleNav(true);
	});
	//close the navigation
	$('.cd-close-nav, .cd-overlay').on('click', function(event){
		event.preventDefault();
		toggleNav(false);
	});
	//select a new section
	$('.cd-nav li').on('click', function(event){
		event.preventDefault();
		var target = $(this), sectionTarget = target.data('menu');
		//alert('/'+sectionTarget+'/');
		location = sectionTarget+'.html';
	});

	function toggleNav(bool) {
		$('.cd-nav-container, .cd-overlay').toggleClass('is-visible', bool);
		$('main').toggleClass('scale-down', bool);
	}

	function loadNewContent(newSection) {
		location = newSection+'.html';
		return;
		//create a new section element and insert it into the DOM
		var section = $('<section class="cd-section '+newSection+'"></section>').appendTo($('main'));
		//load the new content from the proper html file
		section.load(newSection+'.html .cd-section > *', function(event){
			//add the .cd-selected to the new section element -> it will cover the old one
			section.addClass('cd-selected').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				//close navigation
				toggleNav(false);
			});
			section.prev('.cd-selected').removeClass('cd-selected');
		});

		$('main').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			//once the navigation is closed, remove the old section from the DOM
			section.prev('.cd-section').remove();
		});

		if( $('.no-csstransitions').length > 0 ) {
			//if browser doesn't support transitions - don't wait but close navigation and remove old item
			toggleNav(false);
			section.prev('.cd-section').remove();
		}
	}
});
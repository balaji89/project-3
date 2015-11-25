(function ($) {
	"use strict";

	/**
	 * Ajax request to Instagaram API
	 */

	$(function() {

		// set some initial variables
		var albumData,
 			albumItems,
 			searchTerm,
 			endpoint,
			$albumList = $('.album-list');
			// $loadMore = $('.load-button');
 			$('.search-form').on('submit', function(event) {
 			$('#searchtags').hide();

 			event.preventDefault();

 			// reset all the things
 			$albumList.empty();
 			albumData = ''; 
 			albumItems = '';

 			// get the search string
 			searchTerm = $('#hash-tag').val().replace(/ /g, '+'),
		 	endpoint = 'https://api.instagram.com/v1/tags/'+searchTerm+'/media/recent?count=12&client_id=fed3ea7d36644c4993d81a12621c74c8';
			
			// make the call to the endpoint
			$.ajax({
 				method: 'GET',
				url: endpoint,
 				dataType: 'jsonp'
 			}).done(function(results) {

 				albumData = results.data;

 				// append the photos if we found any
 				if ( albumData.length !== 0 ) {

 					albumItems += '<ul>';

 				$.each(albumData, function(key, value) {
 								albumItems += '<li>';
 								albumItems += '<div class= "inner-item-wrapper">';
 								albumItems += '<img src="' + value.images.standard_resolution.url + '" />';
 							
 								albumItems += '<div class="photo-meta">';
 								albumItems += '<div class="profile">';
 								albumItems += '<img src="' + value.caption.from.profile_picture + '" />';
 								albumItems += '</div>';
 								albumItems += '<div class="social">';
 								albumItems += '<p>' + value.caption.from.username + '</p>';
 								albumItems += '<p>'
 								albumItems += '<i class="fa fa-heart"></i> ' +value.likes.count+ ' ';
 								albumItems += '<i class="fa fa-comments"></i> ' +value.comments.count;
 								albumItems += '</p>'
 								albumItems += '</div>';
 								albumItems += '</div>';
 								albumItems += '</div>';
 								albumItems += '</li>';
	});
							albumItems += '</ul>';

 } else {
 	albumItems += '<p class="feedback">Sorry, nothing found! Please try again.</p>';
 

 }

 			$albumList.append(albumItems);
 
     // and if it fails...

    		}).fail(function() {

        		$albumList.append('<p class="feedback">Sorry! There was a problem, please try again.</p>');

    		}).always (function() {

    			$loader.hide();

    	 	})

  		});

	});

}(jQuery));
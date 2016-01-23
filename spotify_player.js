$(document).ready(function(){
var API_URL = 'https://api.spotify.com/v1/search?type=track&query=';
var searchTerm = "";
var $trackList = $('.list-group');

	$('.btn.btn-default').on('click', function(e){
		e.preventDefault();
/*			$('.pep').toggleClass('hide');
			$(this).toggleClass('active');
			updatePrice();*/
			handleClick($('.form-control.inputSongText').val());
	})
	function handleClick(data){
		var search_url = API_URL + data;
		$.ajax({
				type: "GET",
 				url: search_url,
 				data: '',
 				success: showSearchResults,
 				error: handleError,
 				dataType: "json"
 			})
	}
	function showSearchResults (response) {
		console.log(response)
		var tracks = response.tracks.items	;
		$trackList.html('');
		tracks.forEach(function (track, idx) {
			addTrack(track);
		})

	}
	function handleError (error) {
		console.log(error)
	}
	function addTrack (track) {
		$trackList.append('');
		var name = track.name;
		var artistName = track.artists[0].name;
		var	source = track.preview_url;
		// var id = artist.id;
		var	image = track.album.images[0].url;
		// console.log(name, artistName, source, image);
		if(image && source){
			// $trackList.append('<li class="list-group-item track"> Song\'s name : '+name+' <br>Artist\'s name: '+artistName+'Album\'s cover: <img class="img-responsive" src="'+image+'"></li>');
			
			$trackList.append(buildPlayer(name, artistName, image ,source));
		} else {
			console.log("No tiene name");

		}
	}
	function buildPlayer(name, artistName, image, prev_url){
		// var html = '<li class="list-group-item track"> Song\'s name : '+name+' <br>Artist\'s name: '+artistName+'Album\'s cover: <img class="img-responsive" src="'+image+'"></li>';
		var html = '<li class="list-group-item track">'
						+'<div class="widget">'
							+'<div class="header">'
								+'<div class="btn-play "></div>'
								+'<div class="metadata">'
								  +'<p class="js-title">'+name+'</p>'
								  +'<p class="js-author">'+artistName+'</p>'

								  +'<div class="js-seekbar">'
								    +'<progress value="5" max="30"></progress>'
								  +'</div>'
								+'</div>'
								+'</div>'
								+'<div class="cover">'
								+'<img class="js-cover" src="'+image+'">'
							+'</div>'
							+'<audio class="js-audio" src="'+prev_url+'"></audio>'
						+'</div></li>';
		return html;
	}
	$trackList.on( "click", ".btn-play", function( event ) {
    	event.preventDefault();
    	$(this).closest( ".widget" ).children("audio").trigger('play');
	});
});




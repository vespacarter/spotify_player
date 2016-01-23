function onSubmit (event) {
  event.preventDefault();
  console.debug('SUBMITTED');
  var searchterm = $('[name="js-songsearch"]').val();
  var requeststring = 'https://api.spotify.com/v1/search?type=track&query=' + searchterm;

  var request = $.get(requeststring);

  function onLoadSuccess (response) {
    console.debug('SUCCESS');
    $('.js-song-list').empty();
    var songs = response.tracks.items;
    addSong(songs[0]);
  }

  function onLoadFailure (err) {
    console.error(err.responseJSON);
  }

  function addSong(song){
    console.log(song);
    var myartist = song.artists[0].name;
    var mysong  = song.name;
    var myalbum = song.album.name;
    var myalbumimage = song.album.images[0].url;
    var mysongsource = song.preview_url;
    $('.title').text(mysong);
    $('.author').text(myartist);
    $('.cover > img').attr('src',myalbumimage);
    $('.btn-play').removeClass('disabled');
    $('audio').attr('src', mysongsource);


  }

  request.done(onLoadSuccess);
  request.fail(onLoadFailure);
}

function evaluatePlayer(){
  if ($('.btn-play').hasClass('playing')){
    $('.js-player').trigger('pause');
    $('.btn-play').removeClass('playing');
  }else{
    $('.js-player').trigger('play');
    $('.btn-play').addClass('playing');
  }

}


$('.js-submit-song').on('click', onSubmit);
$('.btn-play').on('click', evaluatePlayer);

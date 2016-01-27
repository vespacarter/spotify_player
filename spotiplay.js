var myartistId;

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
    var myartistname = song.artists[0].name;
    myartistId = song.artists[0].id;
    var mysong  = song.name;
    var myalbum = song.album.name;
    var myalbumimage = song.album.images[0].url;
    var mysongsource = song.preview_url;
    $('.title').text(mysong);
    $('.author').text(myartistname);
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

function printTime () {
  var current = $('.js-player').prop('currentTime');
  $('.seekbar > progress').attr('value',current);
}

function showArtistModal(){
  function onLoadSuccess (response) {
    console.debug('SUCCESS');
    console.log(response);
    $('.modal-body').text('Genre: ' + response.genres[0]);
    $('.band-pic > img').attr('src', response.images[0].url);
  }
  function onLoadFailure (err) {
    console.error(err.responseJSON);
  }

  var requestartist = 'https://api.spotify.com/v1/artists/' + myartistId;
  var requeststring = $.get(requestartist);
  requeststring.done(onLoadSuccess);
  requeststring.fail(onLoadFailure);
  $('.js-modal').modal();
  $('.modal-header > h2').html('<center>' + $('.author').text() + '</center>');
}

$('.js-submit-song').on('click', onSubmit);
$('.btn-play').on('click', evaluatePlayer);
$('.js-player').on('timeupdate', printTime);
$('.author').on('click', showArtistModal);


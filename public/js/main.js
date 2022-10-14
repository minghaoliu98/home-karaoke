'use strict';
var tag;
var player;
var vid = 'GeNIpOsmEwA';
function myFunction() {
  tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  let firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function cut() {
  var pattern = /^((http|https|ftp):\/\/)/;
  var url = "http://localhost:3000/next/";
  fetch(url)
    .then(response => {
      return response.json()
    })
    .then(data => {


      player.clearVideo()
      console.log(data.next_song)

      if (data.next_song && data.next_song != null) {
        vid = data.next_song;
        player.loadVideoById(data.next_song, 0, "highres");
      } else {
        player.loadVideoById("GeNIpOsmEwA", 0, "highres");
        console.log(player.getPlayerState());
      }



    })
    .catch(error => {
        alert(error);
      });
}

function loadNewVideo() {

}

function loadNewPlaylist() {

}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {

    videoId: 'VmczmiYaRo8',
    playerVars: {'autoplay': 1, 'controls': 0 },
    events: {
      'onError' : onErr
    }
  });
}

function onErr(event) {
  if (event.data == 101 || event.data == 150) {
    window.open("https://www.youtube.com/watch?v=" + vid, '_blank');
  }
  console.log(event.data)
}

function onPlayerReady(event) {
  player.playVideo();
}

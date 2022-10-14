'use strict';
var tag;
var player;
var h = "http://localhost:3000/"
function myFunction() {

}



function upload() {

  var pattern = /^((http|https|ftp):\/\/)/;
  var link = document.getElementById("link");
  if (link && link.value) {
    var url = h + "load/" + youtube_parser(link.value);
    fetch(url)
      .then(response => {
        return response.json()
      })
      .then(data => {
        alert("Video ID: " + data.new_song + "has Loaded");
      })
      .catch(error => {
          alert(error);
      });
  } else {
    alert("Please Enter a Youtube URL");
  }

}

function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

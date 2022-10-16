'use strict';
var tag;
var player;
var server_ip = "http://192.168.0.159:3000";

function upload() {
  var pattern = /^((http|https|ftp):\/\/)/;
  var link = document.getElementById("link");
  if (link && link.value) {
    var url = server_ip + "/load/" + youtube_parser(link.value);
    console.log(url);
    fetch(url)
      .then(response => {
        return response.json()
      })
      .then(data => {
        alert("Video ID: " + data.new_song + " has Loaded");
      })
      .catch(error => {
          alert(error);
      });
  } else {
    alert("Please Enter a Youtube URL");
  }
  link.value = "";
  var button = document.getElementById("sub_btn");
  button.disabled = true;
  setTimeout(() => {
    button.disabled = false;
  }, "1000");
}

function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

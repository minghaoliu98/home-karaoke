'use strict';
var tag;
var player;
var server_ip = "http://10.18.5.28:3000";
var playlist;
var first;
var timer;
document.addEventListener('DOMContentLoaded', init, { once: true });

function init() {
  if (first == null) {
    playlist = document.getElementById("playlist");
    loadPlaylist();
    first = true;
  }

}

function loadPlaylist() {
  fetch(server_ip + "/playlist/")
    .then(response => {
      return response.json();
    })
    .then(data => {
      var arr = JSON.parse(data.playlist);
      playlist.textContent = "";
      arr.forEach((song_info, i) => {
        const para = document.createElement("li");
        para.classList.add("list-group-item");
        para.textContent = song_info.title;
        para.id = song_info.id
        para.onmouseenter = function() {
          var intr = setInterval(function() {
            para.scrollLeft += 1;
            if (++i == 1000) clearInterval(intr);
          }, 8)
          para.onmouseout = function() {
            para.scrollLeft = 0;
            clearInterval(intr);
          };
        };

        playlist.appendChild(para);
      });
    })
    .catch(error => {
        alert(error);
    });
}

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
    loadPlaylist();
  }, "1000");
}

function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

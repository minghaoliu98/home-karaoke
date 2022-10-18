'use strict';
var tag;
var player;
var server_ip = " http://192.168.0.131:3000";
var playlist;
var first;
var timer;
var pressTimer;


document.addEventListener('DOMContentLoaded', init, { once: true });

function init() {
  if (first == null) {
    playlist = document.getElementById("playlist");
    loadPlaylist();
    first = true;
  }

}

function removeSong(title, id) {
  if (confirm("Do u want to delete the song: \n" + title)) {
    var url = server_ip + "/delete/" + id;
    fetch(url)
      .then(response => {
        return response.json()
      })
      .then(data => {
        alert(data.deleted_song + " has removed")
        loadPlaylist();
      })
      .catch(error => {
          alert(error);
      });
  }

}

function loadPlaylistItem(arr) {
  playlist.textContent = "";
  arr.forEach((song_info, i) => {
    const para = document.createElement("li");
    para.classList.add("list-group-item");
    para.textContent = song_info.title;
    para.id = song_info.id
    para.ontouchstart = function() {
      var intr = setInterval(function() {
        para.scrollLeft += 1;
        if (++i == 1000) clearInterval(intr);
      }, 8)
      pressTimer = window.setTimeout(() => {
        removeSong(this.innerHTML, this.id);
      },1000);
    };
    para.ontouchend = function() {
      para.scrollLeft = 0;
      clearTimeout(pressTimer);
    };
    para.onmousedown = function() {
      var intr = setInterval(function() {
        para.scrollLeft += 1;
        if (++i == 1000) clearInterval(intr);
      }, 8)
      pressTimer = window.setTimeout(() => {
        removeSong(this.innerHTML, this.id);
      },1000);
    };
    para.onmouseup = function() {
      para.scrollLeft = 0;
      clearTimeout(pressTimer);
    };
    playlist.appendChild(para);
  });



}

function loadPlaylist() {
  fetch(server_ip + "/playlist/")
    .then(response => {
      return response.json();
    })
    .then(data => {
      var arr = JSON.parse(data.playlist);
      loadPlaylistItem(arr);
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
    fetch(url)
      .then(response => {
        return response.json()
      })
      .then(data => {
        alert("Video: " + data.new_song + " has Loaded");
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

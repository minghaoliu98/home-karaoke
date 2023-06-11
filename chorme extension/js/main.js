'use strict';

document.addEventListener('DOMContentLoaded', onInit, false);
var button;
var playlist;

function moveToTop() {
  if (confirm("Do u want to move it to the top of queue: \n" + this.innerHTML)) {
    var url = "http://localhost:3000/move_to_top/" + this.id;
    fetch(url)
      .then(response => {
        return response.json()
      })
      .then(data => {
        loadPlaylist();
      })
      .catch(error => {
          alert(error);
      });
  }

}

function handleError() {
  chrome.tabs.create({ url: "https://github.com/minghaoliu98/home-karaoke"});
  alert("You havn't set up the Server yet: \nPlease follow github.com/minghaoliu98/home-karaoke to install and start server");
}

function cut() {
  var url = "http://localhost:3000/next/";
  fetch(url)
    .then(response => {
      return response.json()
    })
    .then(data => {
      chrome.tabs.query({active:true,currentWindow:true},function(tabs){
          chrome.tabs.remove(tabs[0].id);
      });
      chrome.tabs.create({ url: "https://www.youtube.com/watch?v=" + data.next_song});
    })
    .catch(error => {
      handleError();
    });
}

function loadPlaylist() {
  fetch("http://localhost:3000/playlist/")
    .then(response => {
      return response.json();
    })
    .then(data => {
      playlist.textContent = "";
      var arr = JSON.parse(data.playlist);
      arr.forEach((song_info, i) => {
        const para = document.createElement("li");
        para.classList.add("list-group-item");
        para.textContent = song_info.title;
        para.id = song_info.id;
        para.onmouseenter = function() {
          var intr = setInterval(function() {
            para.scrollLeft += 1;
            if (++i == 1000) clearInterval(intr);
          }, 8)
        };
        para.addEventListener("click", moveToTop);
        playlist.appendChild(para);
      });
    })
    .catch(error => {
      handleError();
    });
}

function onInit() {
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  console.log(time);
  button = document.getElementById("cut");
  playlist = document.getElementById("playlist");
  button.addEventListener("click", cut);
  //load ip address to create qr code
  fetch("http://localhost:3000/ip/")
    .then(response => {
      return response.json();
    })
    .then(data => {
      //load playlist
      loadPlaylist();
      var qrcode = new QRCode(document.getElementById("qrcode"), {
      	text: data.ip,
      	width: 128,
      	height: 128,
      	colorDark : "#000000",
      	colorLight : "#ffffff",
      	correctLevel : QRCode.CorrectLevel.H
      });
    })
    .catch(error => {
      handleError();
    });

}

'use strict';

document.addEventListener('DOMContentLoaded', onInit, false);

var button;
var playlist;
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
        alert(error);
    });
}

function onInit() {
  button = document.getElementById("cut");
  playlist = document.getElementById("playlist");
  playlist.textContent = "";
  button.addEventListener("click", cut);
  //load playlist
  fetch("http://localhost:3000/playlist/")
    .then(response => {
      return response.json();
    })
    .then(data => {
      var arr = JSON.parse(data.playlist);
      arr.forEach((element, i) => {
        const para = document.createElement("h3");
        para.classList.add("list-group-item");
        para.textContent = element;

        para.onmouseenter = function() {
          var intr = setInterval(function() {
            para.scrollLeft += 1;
            if (++i == 1000) clearInterval(intr);
          }, 8)
        };

        playlist.appendChild(para);
      });

    })
    .catch(error => {
        alert(error);
    });
    //load ip address
  fetch("http://localhost:3000/ip/")
    .then(response => {
      return response.json();
    })
    .then(data => {
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
        alert(error);
    });

}

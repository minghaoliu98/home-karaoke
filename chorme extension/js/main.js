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
  var url = "http://localhost:3000/playlist/";

  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      var arr = JSON.parse(data.playlist);
      arr.forEach((element, i) => {
        const para = document.createElement("li");
        para.classList.add("list-group-item");
        para.textContent = element;
        playlist.appendChild(para);
      });

    })
    .catch(error => {
        alert(error);
    });

}

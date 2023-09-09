console.log("Background js file loaded")

chrome.commands.onCommand.addListener(function (command) {
    if (command == "next_song") {
      cut();
    }
});

chrome.commands.onCommand.addListener(function (command) {
    if (command == "shuffle") {
      shuffle();
    }
});

function shuffle() {
  var url = "http://localhost:3000/shuffle/";
  fetch(url)
    .then(response => {
      return response.json()
    })
    .catch(error => {
      chrome.tabs.create({ url: "https://github.com/minghaoliu98/home-karaoke"});
    });
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
      chrome.tabs.create({ url: "https://github.com/minghaoliu98/home-karaoke"});
    });
}

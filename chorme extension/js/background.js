console.log("Background js file loaded")

chrome.commands.onCommand.addListener(function (command) {
    if (command == "next_song") {
      cut();
    }
});

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
      alert("You havn't set up the Server yet: \nPlease follow github.com/minghaoliu98/home-karaoke to install and start server");
    });
}


chrome.commands.onCommand.addListener((command) => {
  if (command == "inject-script") {
     cut();
  }
  console.log(`Command "${command}" triggered`);
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
        alert(error);
    });
}

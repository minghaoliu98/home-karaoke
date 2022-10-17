
chrome.commands.onCommand.addListener((command) => {
  if (command == "next_song") {

    cut();
  }
});
console.log("background js loaded")

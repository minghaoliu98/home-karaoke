const express = require('express')
const app = express()
var fetchVideoInfo = require('updated-youtube-info');
const port = 3000
var links = []
var title = []
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/load/:id', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  links.push(req.params.id);
  fetchVideoInfo(req.params.id, function (err, videoInfo) {
    if (err) throw new Error(err);
    res.json({"new_song": videoInfo.title});
    links.push(req.params.id);
    title.push(videoInfo.title);
  });

})

app.get('/playlist', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({"playlist": JSON.stringify(title)})
})

app.get('/next', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  var string = links.shift();
  title.shift();
  if (string == null) {
    string = "GeNIpOsmEwA";
    title = ["恋曲1990"]
  }
  res.json({"next_song": string})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

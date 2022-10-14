const express = require('express')
const app = express()
var getYoutubeTitle = require('get-youtube-title')
const port = 3000
var links = []
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/load/:id', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  links.push(req.params.id);
  res.json({"new_song": req.params.id})
})

app.get('/playlist', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({"new_song": JSON.stringify(links)})
})

app.get('/next', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  var string = links.pop()
  res.json({"next_song": string, "playlist" : JSON.stringify(links)})
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

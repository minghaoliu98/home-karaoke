const express = require('express')
const fs = require('fs')
const app = express()
var fetchVideoInfo = require('updated-youtube-info');
const port = 3000
var playlist = [];
var default_song = "7nCg51FXdp0";
var ip
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/load/:id', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  fetchVideoInfo(req.params.id, function (err, videoInfo) {
    if (err) throw new Error(err);
    let data = {
      id: req.params.id,
      title: videoInfo.title
    };
    playlist.push(data)
    res.json({"new_song": videoInfo.title});
  });

})

app.get('/ip', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({"ip": ip})
})

app.get('/playlist', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({"playlist": JSON.stringify(playlist)})
})

app.get('/next', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  var data = playlist.shift();
  if (data == null) {
    res.json({"next_song": default_song});
  } else {
    res.json({"next_song": data.id})
  }
})

app.listen(port, () => {
  ip = "http://" + getIPAdress() + ":" + port;
  let data = {
    ip: ip
  };
  fs.writeFileSync('./public/myip.json', JSON.stringify(data));
  console.log(`Example app listening on ${ip}`)
})

function getIPAdress() {
    var interfaces = require('os').networkInterfaces();　　
    for (var devName in interfaces) {　　　　
        var iface = interfaces[devName];　　　　　　
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }　　
    }
}

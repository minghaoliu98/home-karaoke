const express = require('express')
const fs = require('fs')
const app = express()
var fetchVideoInfo = require('updated-youtube-info');
const port = 3000
var links = []
var title = []
var ip
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/load/:id', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  fetchVideoInfo(req.params.id, function (err, videoInfo) {
    if (err) throw new Error(err);
    links.push(req.params.id);
    title.push(videoInfo.title);
    res.json({"new_song": videoInfo.title});
    console.log("---------------");
    console.log(links);
    console.log(title);

    console.log("---------------");

  });

})

app.get('/ip', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({"ip": ip})
})

app.get('/playlist', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({"playlist": JSON.stringify(title)})
  console.log("---------------");
  console.log(title);
  console.log("---------------");
})

app.get('/next', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  var string = links.shift();
  var name = title.shift();
  if (string == null) {
    string = "7nCg51FXdp0";
  }
  res.json({"next_song": string})
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

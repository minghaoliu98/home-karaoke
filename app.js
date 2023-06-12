const express = require('express')
const fs = require('fs')
var os = require('os');
var fetchVideoInfo = require('updated-youtube-info');
const app = express()
const port = 3000
var playlist = [];
var default_song = "dQw4w9WgXcQ";
var ip
const fileName = 'public/index.html';

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello World! Your Karaoke Server is RUNNING')
})

app.get('/move_to_top/:id', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  var title = deleteHelper(req.params.id);
  let new_top_queue = {
    id: req.params.id,
    title: title
  }
  playlist.splice(0, 0, new_top_queue);
  res.json({"new_top_queue": title});
})

app.get('/delete/:id', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  var title = deleteHelper(req.params.id);
  res.json({"deleted_song": title});
})


function deleteHelper(id) {
  var index = -1;
  var title = ""
  for (let i = 0; i < playlist.length; i++) {
    if (playlist[i].id == id) {
      index = i;
      title = playlist[i].title;
      break;
    }
  }
  if (index != -1) {
    playlist.splice(index, 1);
    return title;
  } else {
    throw new Error("No such Video exist in the list");
  }
}


app.get('/load/:id', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  fetchVideoInfo(req.params.id, function (err, videoInfo) {
    if (err) {
      res.status(400).send("cannot find video given your link")
      console.error(`invalid video id:${req.params.id}`);
    } else {
      let data = {
        id: req.params.id,
        title: videoInfo.title
      };
      playlist.push(data)
      res.json({"new_song": videoInfo.title});
    }
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
  console.log(`Example app listening on ${ip}`)
  console.log(`Your Karaoke Sever is Running! Congrats`)
  console.log(`Please do not close the window during your usage`)
  fs.readFile(fileName, 'utf8', function(err, text) {
    if (err) throw err;
    let i = text.indexOf("##");
    let j = text.lastIndexOf("##");
    let result = text.slice(0, i + 2) + ip + text.slice(j);
    fs.writeFile(fileName, result, 'utf8', function(err) {
      if (err) throw err;
      console.log('Nodejs front end is ready to use');
    });
  });


})

function getIPAdress() {
  //return YOURIPADDRESS
  var interfaces = os.networkInterfaces();
  //for WIFI connection
  //return interfaces.WLAN[0].address;

  //for Ethernet connection
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

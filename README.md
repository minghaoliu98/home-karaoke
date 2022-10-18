# home-karaoke
This is a simple home karaoke system allows user to add playlist from cellphone in local network by submitting youtube link.

why u need this:
if u have a home karaoke system require using youtube as the music source, it is annoying when u have to pass the keyboard around to let you friend order their music. This karaoke system can solve the issue by allowing multiple user can order the music at the same time from their mobile phone and keep track a playlist.


what u need:
1. install nodejs on your computer: https://nodejs.org/en/
2. google chorme on your computer
3. all phone and computer are under the same internet or WIFI


how to use:

1. Change the server_ip in the public/js/user.js file to your computer with nodejs IPV4 Address
2. use your server_ip and port as url to generate your own qr code and replace the one in /chorme extension/img folder
3. run nodejs on the app.js file -> CD to your current folder -> CMD: node app.js
4. run google chorme and add plugin from the chorme extension folder
5. pin the karaoke plug in to your chorme browser
6. add youtube link from cellphone from the qrcode website
7. you can see the newest playlist when you click the logo from plugin(or try refresh the who page)
8. use "切歌" button or (ctrl/command + shift + Y) to move to the next song

addition feature:
1. long hold a music title in the qrcode website to remove a music from the server new_top_queue
2. click a music title in the chorme extension to move a music to the top of queue

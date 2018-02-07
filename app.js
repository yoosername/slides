var express = require("express");
var bodyParser = require('body-parser');
var path = require("path");
var app = new express();
var jsonParser = bodyParser.json();
var fs = require('fs');
var port = 3000;

app.use(express.static('public'));
app.use('/preview', express.static(path.join(__dirname, './public/lib/reveal')));

app.post('/reload', jsonParser, function(req, res) {

  if (!req.body) return res.sendStatus(400);

  fs.writeFile(__dirname + "/public/live.md", req.body.markdown, function(err) {
      if(err) {
          return res.sendStatus(400, err);
      }
      console.log("The slides were saved!");
      res.end("success");
  });

});

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})

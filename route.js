var content = require("./content.js");
var renderer = require("./renderer.js");
const querystring = require('querystring');
// var fuck = new content.Content();
// fuck.on("end", console.log);
// fuck.on("error", console.error);

function home(req, res){
  if(req.url == "/"){
    if(req.method.toLowerCase() === "get"){
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      let fuck2 = new content.Content();
      fuck2.on("end", function(donk){
        renderer.view(donk, res);
        res.end();
      });
    } else{
      req.on("data", function(postBody){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        var query = querystring.parse(postBody.toString());
        var queryArr = []
        for (var key in query){
          queryArr.push(query[key]);
        }
        queryArr = queryArr.join("/");
        let fuck2 = new content.Content(queryArr);
        fuck2.on("end", function(donk){
          renderer.view(donk, res);
          res.end();
        });
      });
    }

    }
  }

// var fuck2 = new content.Content();
// fuck2.on("end", console.log);

module.exports.home = home;

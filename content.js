var EventEmitter = require("events").EventEmitter;
var https = require("https");
var http = require("http");
var util = require("util");
util.inherits(Content, EventEmitter );

function Content(query){
  EventEmitter.call(this);
  var contentEmitter = this;
  try{
    // connect to API
    var request = https.get(`https://loripsum.net/api/${query}`, function(response){
        var body = "";
        if(response.statusCode !== 200){
          request.abort();
          console.log(response.statusCode);
          contentEmitter.emit("error", http.STATUS_CODES[response.statusCode]);
        }
        //new Error(http.STATUS_CODES[response.statusCode]
        response.on("data", function(chunk){
          body += chunk;
          contentEmitter.emit("data", chunk);
        });

        response.on("end", function(){
        if(response.statusCode === 200){
          try{
            contentEmitter.emit("end", body);
            } catch (error){
            contentEmitter.emit("error", error);
          }
        }
        }).on("error", function(error){
          console.log("piss");
          contentEmitter.emit("error", error)
        });

      });
    request.on("error", function(error){
    contentEmitter.emit("error", error.message);
    });

    } catch(error){
  console.error(error.message)
}
}



module.exports.Content = Content;

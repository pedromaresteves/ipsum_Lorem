const fs = require("fs");

function mergeValues(lorem, webcontent){
  //cycle over the keys
  webcontent = webcontent.replace("{{loremStuff}}", lorem);
  return webcontent;
}

function view(lorem, response){
  //Read from the template file
  var fileContents = fs.readFileSync("./htmlfiles/home.html", {encoding:"UTF8"});
  fileContents = mergeValues(lorem, fileContents);
  //write out the contents to the response
  response.write(fileContents);
}

module.exports.view = view;

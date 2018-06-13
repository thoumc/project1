var request = require ('request');
var token = require ('./secrets.js')
var fs = require('fs');
var gitUrl = process.argv[2];

//console.log('Welcome to the GitHub Avatar Downloader!')


function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      "User-Agent": "request"
    }
  };

  request(options, function(err, result, body) {
    var info = JSON.parse(body);
    cb(err, info);
  });
}


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors: ", err);
  for (var i = 0; i < result.length; i++) {
    //console.log(result[i].avatar_url);
    downloadImageByURL(result[i].avatar_url, "avatars/" + result[i].login + ".jpg")
  }

});



function downloadImageByURL(url, filePath){
  request.get(url)
    .on('error', function (err) {
      throw err;
    })
    .pipe(fs.createWriteStream(filePath));
}



//downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")




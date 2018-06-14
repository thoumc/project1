var request = require ('request');
var token = require ('./secrets.js');
var fs = require('fs');
args = process.argv.slice(2);

console.log('Welcome to the GitHub Avatar Downloader!');

//take repo url and json parse
function getRepoContributors(repoOwner, repoName, cb) {
  if (!repoName || !repoOwner) {
    console.log("Repository name and owner should not be blank.");
  } else {
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {"User-Agent": "request"}
    };

    request(options, function(err, result, body) {
      var info = JSON.parse(body);
      cb(err, info);
    });
  }
}

//takes arguments from command line and download images through urls generated
getRepoContributors(args[0], args[1], function(err, result) {
  if (!err) {
    for (var i = 0; i < result.length; i++) {
      downloadImageByURL(result[i].avatar_url, "avatars/" + result[i].login + ".jpg");
    }
    console.log("Download Complete!");
  } else {
    console.log ("Error: " + err)
  }
});

// takes urls and download to specific folder described by filePath
function downloadImageByURL(url, filePath){
  request.get(url);
         .on('error', function (err) {
            throw err;
          })
         .pipe(fs.createWriteStream(filePath));
}



/**
 * Tests for the dataUtils utility.
 */
var fs = require('fs');
var async = require('async');

console.log("=====================\n");
console.log("Word Count v0.1\n");

 if(process.argv.length < 3)
 {
   console.log('Usage: node wordcount.js <Test Subject Directory>');
   process.exit();
 }

 var subjectDir = process.argv[2];
 console.log('Counting words in dir: ' + subjectDir);

  // Read in all file names
 var files = fs.readdirSync(subjectDir);
 var numFiles = files.length;

 console.log("Counting words in "+numFiles+" files\n");


  async.map(files,
            function(fileName, callback) {
              callback(null, parseWords(subjectDir + '/' + fileName));
            },
            function(err, results){
                if(err)
                  {
                    console.dir(err);
                  } else {
                    var resultsMap = new Object();
                    for(var i = 0; i < results.length; i++)
                    {
                      words = results[i];

                      for(var j = 0; j < words.length; j++)
                      {
                        var word = words[j];
                        if(!resultsMap[word])
                        {
                              resultsMap[word] = 0;
                        }

                        resultsMap[word] += 1;
                      }
                    }

                    var wordCountArray = new Array();
                    var keyArray = Object.keys(resultsMap);
                    for(var i = 0; i < keyArray.length; i++)
                    {
                        wordCountArray.push({word: keyArray[i], count: resultsMap[keyArray[i]]});
                    }

                    wordCountArray = wordCountArray.sort(function(a, b){return b.count-a.count});

                    console.log("Results:\n----------");
                    console.dir(wordCountArray);
                  }
            });

function parseWords(fileName)
{
  var fileContents = fs.readFileSync(fileName, 'utf-8');

  // remove punctuation
  var fileString = fileContents.replace(/[^\w\s]/g, '');
  // make whitespace uniform
  var fileString = fileString.replace(/\s/g, ' ');
  // to lower case
  var fileString = fileString.toLowerCase();

  return fileString.split(' ');
}

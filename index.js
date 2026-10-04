const index = {};
const fs = require("fs");
const filePaths = ["data/doc1.txt", "data/doc2.txt", "data/doc3.txt"];
const readline= require("node:readline")
const askQuestion=(query)=>{
  const rl= readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve)=>rl.question(query, (answer)=> {
    rl.close;
    resolve(answer);
  }))
  }
async function main() {  
  const input = await askQuestion("Enter your search: ");
  const result = search(input);
  console.log("Showing Result for ", input, "...\n");
  if (result.length == 0) {
    console.log("No result\n");
    return;
  }
  result.map((text) => {
    console.log(">>Result");
    console.log(text);
  });
}


for (let i = 0; i < filePaths.length; i++) {
  const fileString = fs.readFileSync(filePaths[i], "utf-8");
  if (!fileString) {
    console.log("Error Opening file", err);
    break;
  }
  const wordsArrayRegex = [
    ...new Set(fileString.toLowerCase().match(/\b\w+\b/g)),
  ];
  CheckIfContainsWord(wordsArrayRegex, filePaths[i]);
}


function CheckIfContainsWord(words, filePath) {
  for (let i = 0; i < words.length; i++) {
    if (index[words[i].toLowerCase()] == null) {
      index[words[i].toLowerCase()] = [filePath];
    } else {
      if (!index[words[i].toLowerCase()].includes(filePath)) {
        index[words[i].toLowerCase()].push(filePath);
      }
    }
  }
}


function search(query) {
  const queryRegex = [...new Set(query.toLowerCase().match(/\b\w+\b/g))];
  const result = [];
  var intersection = [];
  let score=0;
  for (let i = 0; i < queryRegex.length; i++) {
    if (!index[queryRegex[i]]) {
      return [];
    }
    if (intersection.length == 0) {
      intersection.push(...index[queryRegex[i]]);
    } else {
      intersection = intersection.filter((element) =>
        index[queryRegex[i]].includes(element),
      );
    }
  }
  for (let j = 0; j < intersection.length; j++) {
    result.push(fs.readFileSync(intersection[j], "utf-8"));
  }
  
  return result;
}


function countWord(word, filepath) {
  word=word.toLowerCase();
  const words=wordsArrayRegex(filepath);
  let wordcount=0;
  for (let i=0; i < words.length; i++){
    if(words[i]==word){
      wordcount++;
    }
  }
  return wordcount;
}
console.log(countWord("Javascript", "data/doc1.txt"));
function wordsArrayRegexUnique(filePath) {
  const fileString = fs.readFileSync(filePath, "utf-8");
  return [...new Set(fileString.toLowerCase().match(/\b\w+\b/g))];
}
function wordsArrayRegex(filePath) {
  const fileString = fs.readFileSync(filePath, "utf-8");
  return fileString.toLowerCase().match(/\b\w+\b/g);
}
main();

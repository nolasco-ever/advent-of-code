const { findSum } = require("./findSum");

const fs = require("fs");

const path = "./part2.txt";

const file = fs.createReadStream(path);

findSum(file).then((result) => {
  console.log(`Total: ${result}`);
});

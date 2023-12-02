const { findSum } = require("./findSum");

const fs = require("fs");

const path = "./part1.txt";

const file = fs.createReadStream(path);

const cubeCount = {
  red: 12,
  green: 13,
  blue: 14,
};

findSum(file, cubeCount).then((result) => {
  console.log(`Total: ${result}`);
});

const fs = require("fs");
const readLine = require("readline");

const path = "./part2.txt";

// array of key/value pairs that have a number assigned to it's word version
const stringNumsArr = [
  { str: "one", num: 1 },
  { str: "two", num: 2 },
  { str: "three", num: 3 },
  { str: "four", num: 4 },
  { str: "five", num: 5 },
  { str: "six", num: 6 },
  { str: "seven", num: 7 },
  { str: "eight", num: 8 },
  { str: "nine", num: 9 },
];

const findSum = (filePath) => {
  const file = fs.createReadStream(filePath);

  const rL = readLine.createInterface({
    input: file,
  });

  return new Promise((resolve) => {
    let total = 0;

    rL.on("line", (line) => {
      // Replace word representations of numbers with actual numbers using the stringNumsArr
      // i.e "fivetwofour" -> "524"
      const newLine = stringNumsArr.reduce((accString, numObj) => {
        return accString.replace(numObj.str, numObj.num);
      }, line);

      //create an array of characters from the line
      const lineArr = [...newLine];

      // array to hold all the numbers found in the lineArr
      const numArr = [];

      lineArr.forEach((lineItem) => {
        // if the character is a number, then we add it to the numArr
        if (!isNaN(lineItem)) {
          numArr.push(lineItem);
        }
      });

      // concat the first and last number strings and convert to a number
      // i.e. "1"+"2" = "12" -> 12
      const num = Number(numArr[0] + numArr[numArr.length - 1]);

      // add the number to the total
      total += num;
    });

    rL.on("close", () => {
      resolve(total);
    });
  });
};

findSum(path).then((result) => {
  console.log(`Total: ${result}`);
});

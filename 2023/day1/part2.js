const fs = require("fs");
const readLine = require("readline");

const path = "./part2.txt";

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

    rL.on("line", (str) => {
      const newStr = stringNumsArr.reduce((accString, numObj) => {
        return accString.replace(numObj.str, numObj.num);
      }, str);

      const strArr = [...newStr];

      const numArr = [];

      strArr.forEach((item) => {
        if (!isNaN(item)) {
          numArr.push(item);
        }
      });

      const num = Number(numArr[0] + numArr[numArr.length - 1]);
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

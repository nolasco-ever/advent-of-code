const fs = require("fs");
const readLine = require("readline");

const path = "./part1.txt";

const findSum = (filePath) => {
  const file = fs.createReadStream(filePath);

  const rL = readLine.createInterface({
    input: file,
  });

  return new Promise((resolve) => {
    let total = 0;

    rL.on("line", (line) => {
      //create an array of characters from the line
      const lineArr = [...line];

      // array to hold all the numbers found in the lineArr
      const numArr = [];

      lineArr.forEach((item) => {
        // if the character is a number, then we add it to the numArr
        if (!isNaN(item)) {
          numArr.push(item);
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

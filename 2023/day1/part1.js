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

    rL.on("line", (str) => {
      const strArr = [...str];

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

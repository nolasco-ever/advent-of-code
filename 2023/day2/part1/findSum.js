const readLine = require("readline");

const findSum = (file, cubeCountObj) => {
  const rL = readLine.createInterface({
    input: file,
  });

  return new Promise((resolve) => {
    let total = 0;

    rL.on("line", (str) => {
      const arr = str.split(";");

      // retrieve the game number to be used for adding later
      const gameNum = Number(arr[0].split(":")[0].split(" ")[1]);

      // remove the Game number part of the string (i.e Game 1: 1 red, 2 blue -> 1 red, 2 blue)
      arr[0] = arr[0].split(":")[1];

      let passes = true;

      arr.forEach((item) => {
        const itemArr = item.split(",");

        const itemObj = {};

        itemArr.forEach((colorCountItem) => {
          const colorCountItemArr = colorCountItem
            .split(" ")
            .filter((item) => item !== "");
          const count = colorCountItemArr[0];
          const color = colorCountItemArr[1];

          itemObj[color] = count;
        });

        for (const key of Object.keys(itemObj)) {
          passes && (passes = itemObj[key] <= cubeCountObj[key] ? true : false);
        }
      });

      passes && (total += gameNum);
    });

    rL.on("close", () => {
      resolve(total);
    });
  });
};

module.exports = { findSum };

const readLine = require("readline");

const findSum = (file) => {
  const rL = readLine.createInterface({
    input: file,
  });

  return new Promise((resolve) => {
    let total = 0;

    rL.on("line", (line) => {
      const roundsArr = line.split(";");

      // remove the Game number part of the string (i.e Game 1: 1 red, 2 blue -> 1 red, 2 blue)
      roundsArr[0] = roundsArr[0].split(":")[1];

      // array that will hold the objects of the colors in a specific round
      // i.e. [{red: 1, green: 2, blue: 3}, {...}, {...}]
      const roundsColorsArr = [];

      // loop through each round and create an object with the color and color count
      // i.e. "1 red, 2 blue, 3 green" -> {red: 1, blue: 2, green: 3}
      roundsArr.forEach((roundItem) => {
        // split the roundItem string into an array
        // i.e. "1 red, 2 blue, 3 green" -> ['1 red', '2 blue', '3 green']
        const roundItemArr = roundItem.split(",");

        // object that holds the color counts for the current round
        const colorCountObj = {};

        // loop through each element in the roundItemArr and extract the color string and color count value
        // then add it as a key/value pair to the colorCountObj
        // i.e "1 red" -> { red: 1 }
        roundItemArr.forEach((colorCountItem) => {
          // split the value and count of each color into an array
          // i.e. "1 red" -> ['1', 'red']
          const colorCountItemArr = colorCountItem
            .split(" ")
            .filter((item) => item !== "");

          // assign the color and number as a key/value to the colorCountObj
          const count = colorCountItemArr[0];
          const color = colorCountItemArr[1];

          colorCountObj[color] = Number(count);
        });

        // add the new object to the roundsColorsArr
        roundsColorsArr.push(colorCountObj);
      });

      // will hold the min number for each color needed as a key/value pair
      let minColorCountsObj = {};

      // extract the first object from the roundsColorsArr
      const firstColorsObj = roundsColorsArr[0];

      // set the values of the first object to the minColorCountsObj object
      for (const key of Object.keys(firstColorsObj)) {
        minColorCountsObj[key] = firstColorsObj[key];
      }

      // since we already assigned the first element in the roundsColorsArr,
      // we can skip it and start with the second element
      roundsColorsArr.splice(1).forEach((roundObj) => {
        // loop through each key in the roundObj replace the value of the corresponding
        // key in the minColorCountsObj object ONLY IF the value in the roundObj object is greater
        // than the value in the minColorCountsObj object
        for (const colorKey of Object.keys(roundObj)) {
          // check if the colorKey exists in minColorCountsObj, if it doesn't, just set the colorKey/value pair in minColorCountsObj
          if (minColorCountsObj[colorKey]) {
            if (roundObj[colorKey] > minColorCountsObj[colorKey]) {
              minColorCountsObj[colorKey] = roundObj[colorKey];
            }
          } else {
            minColorCountsObj[colorKey] = roundObj[colorKey];
          }
        }
      });

      let power = 1;

      // multiply all the color counts to get the power
      for (const colorKey of Object.keys(minColorCountsObj)) {
        const colorValue = minColorCountsObj[colorKey];
        power *= colorValue;
      }

      // add the power to the total
      total += power;
    });

    rL.on("close", () => {
      resolve(total);
    });
  });
};

module.exports = { findSum };

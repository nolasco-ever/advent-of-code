const readLine = require("readline");

const findSum = (file, cubeCountObj) => {
  const rL = readLine.createInterface({
    input: file,
  });

  return new Promise((resolve) => {
    let total = 0;

    rL.on("line", (line) => {
      const roundsArr = line.split(";");

      // retrieve the game number to be used for adding later
      const gameNum = Number(roundsArr[0].split(":")[0].split(" ")[1]);

      // remove the Game number part of the string (i.e Game 1: 1 red, 2 blue -> 1 red, 2 blue)
      roundsArr[0] = roundsArr[0].split(":")[1];

      // Boolean that will be updated after each round in the game
      let allRoundsPass = true;

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

          colorCountObj[color] = count;
        });

        // loop through each key in the colorCountObj
        // Check if allRoundsPass is true, if it is, we check if the value of the color
        // is less than or equal to the value of the color in the cubeCountObj (the bag of cubes)
        // if it is, then we set allRoundsPass to true, if not, then we set it to false
        for (const colorKey of Object.keys(colorCountObj)) {
          allRoundsPass &&
            (allRoundsPass =
              colorCountObj[colorKey] <= cubeCountObj[colorKey] ? true : false);
        }
      });

      // if allRoundsPass is true, then we can add the game number to the total
      allRoundsPass && (total += gameNum);
    });

    rL.on("close", () => {
      resolve(total);
    });
  });
};

module.exports = { findSum };

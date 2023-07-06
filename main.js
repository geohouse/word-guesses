let wordList;

fetch(
  "https://raw.githubusercontent.com/geohouse/word-guesses/main/five-letter-word-list.json"
)
  .then((response) => response.json())
  .then((json) => {
    wordList = json;
    // Object.entries(json).forEach(([key, word]) => {
    //   if (word.length === 5) {
    //     console.log(word);
    //   }
    // });
  });

//console.log(wordList);

// Initialize the table by looping through the desired number of rows first, creating those
// then looping through the desired number of columns, adding a cell in each row for
// each desired column. Set the ID of each table cell to be the <rowNum>-<colNum> (0-based)
function makeWordTable(completedWordObject) {
  // reset the table.
  wordTable = document.getElementById("word-table");
  wordTable.innerHTML = "";
  console.log("in make word table");

  for (let i = 0; i < Object.keys(completedWordObject).length; i++) {
    wordTableRow = document.createElement("tr");
    wordTable.appendChild(wordTableRow);

    createdWordCell = document.createElement("td");
    //createdWordCell.id = currRow + "-" + currCol;
    // Make a unique id value for each cell to enable word path lookup and clickability.
    createdWordCell.id = i;
    // Will have multiple classes for CSS (depending on whether selected or not too),
    // so need to use classList.add() here to add a class to the existing class list.
    createdWordCell.className = "word-cell";
    createdWordCell.innerHTML = completedWordObject[i];

    wordTableRow.appendChild(createdWordCell);
  }
}

searchInput = document.querySelector("#search");
searchInput.addEventListener("input", () => {
  let searchString = searchInput.value;
  console.log(searchString);
  // This standardizes the user inputs to replace any blank positions with \w (any alphanum character)
  // in prep to turn into a regex to match against the word list
  // global regex needed for replaceAll, matches '*', all white space, and '-'
  const searchRegex = /[*\s-]/g;
  // Now need to convert that string into the regex to use for searching
  // against the word list
  // if searchString is 'a*p-e', searchStringForLookup will be /a/\wp\we/
  // regex anchor to the start of the string
  let searchRegexForLookup = new RegExp(
    "^" + searchString.replaceAll(searchRegex, "\\w")
  );

  let outputWordList = [];
  // Only show the word list is a search string is entered
  // (This is to make rendering faster by preventing regex testing the whole list)
  // If want to show the whole list, put a leading space in the input.
  if(searchString !== ""){
    wordList.forEach((word) => {
    if (searchRegexForLookup.test(word)) {
      outputWordList.push(word);
    }
  });
}
  console.log(outputWordList);
  makeWordTable(outputWordList);
});

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

searchInput = document.querySelector("#search");
searchInput.addEventListener("input", () => {
  let searchString = searchInput.value;
  console.log(searchString);
  // This standardizes the user inputs to replace any blank positions with \w (any alphanum character)
  // in prep to turn into a regex to match against the word list
  // global regex needed for replaceAll, matches '*', all white space, and '-'
  const searchRegex = /[*\s-]/g;
  let searchStringForLookup = searchString.replaceAll(regex, "w");
});

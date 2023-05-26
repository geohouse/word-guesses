import json

with open("word-list.json") as jsonURL:
  fiveLetterWordList = []
  rawWordList = json.load(jsonURL)
  #print(rawWordList)
  for word in rawWordList:
    if len(word) == 5:
      fiveLetterWordList.append(word)

print(fiveLetterWordList)
print(len(fiveLetterWordList))
jsonWordDump = json.dumps(fiveLetterWordList)

with open("five-letter-word-list.json", "w") as outFile:
  outFile.write(jsonWordDump)
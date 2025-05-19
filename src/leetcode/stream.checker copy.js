// https://leetcode.com/problems/stream-of-characters/
import {
  spellCheckerData,
  sampleData,
  sampleDataExpected,
  failedData,
  failedDataExpected,
  exceedTimeLimit,
} from './spellcheck.data';

/**
Input
["StreamChecker", "query", "query", "query", "query", "query", "query", "query", "query", "query", "query", "query", "query"]
[[["cd", "f", "kl"]], ["a"], ["b"], ["c"], ["d"], ["e"], ["f"], ["g"], ["h"], ["i"], ["j"], ["k"], ["l"]]
Output
[null, false, false, false, true, false, true, false, false, false, false, false, true]

Explanation
StreamChecker streamChecker = new StreamChecker(["cd", "f", "kl"]);
streamChecker.query("a"); // return False
streamChecker.query("b"); // return False
streamChecker.query("c"); // return False
streamChecker.query("d"); // return True, because 'cd' is in the wordlist
streamChecker.query("e"); // return False
streamChecker.query("f"); // return True, because 'f' is in the wordlist
streamChecker.query("g"); // return False
streamChecker.query("h"); // return False
streamChecker.query("i"); // return False
streamChecker.query("j"); // return False
streamChecker.query("k"); // return False
streamChecker.query("l"); // return True, because 'kl' is in the wordlist


Constraints:

1 <= words.length <= 2000
1 <= words[i].length <= 2000
words[i] consists of lowercase English letters.
letter is a lowercase English letter.
At most 4 * 104 calls will be made to query.
 */

/**
 * @param {string[]} words
 */
var StreamChecker = function (words) {
  this.input = words;
  this.stack = '';
  this.inputLength = this.input.length;
};

/**
 * @param {character} letter
 * @return {boolean}
 */
StreamChecker.prototype.query = function (letter) {
  const constraintOnWordsLength = this.inputLength >= 1 && this.inputLength <= 2000;
  if (!constraintOnWordsLength) {
    return false;
  }

  if (this.stack.length > 40000) {
    return false;
  }

  this.stack = this.stack + letter;
  var stackLength = this.stack.length;
  var isSuffix = false;
  for (var index = 0; index < this.inputLength; index++) {
    var word = this.input[index];
    if (this.stack.substring(stackLength - word.length) === word) {
      isSuffix = true;
      break;
    }
  }
  return isSuffix;
};

/**
 * Your StreamChecker object will be instantiated and called as such:
 * var obj = new StreamChecker(words)
 * var param_1 = obj.query(letter)
 */

function runTest(data, label, expectedData = false) {
  var streamChecker = new StreamChecker(data[0][0]);
  console.log('Operating on', data.length);
  console.time(label);
  for (var i = 1; i < data.length; i++) {
    const isTrue = streamChecker.query(data[i][0]);
    if (expectedData !== false && isTrue !== expectedData[i]) {
      console.error('Failed at ', data[i][0], streamChecker.stack);
    }
  }
  console.timeEnd(label);
}

runTest(sampleData, 'sampleData', sampleDataExpected);
runTest(spellCheckerData, 'spellCheckerData');
runTest(failedData, 'failedData', failedDataExpected);
runTest(exceedTimeLimit, 'exceedTimeLimit');

export class StreamChecker {
  private words: string[];
  private input: string;
  private inputLength: number;
  constructor(words: string[]) {
    this.words = words;
    this.input = '';
    this.inputLength = this.words.length;
  }

  query(letter: string): boolean {
    const constraintOnWordsLength = this.inputLength >= 1 && this.inputLength <= 2000;
    if (!constraintOnWordsLength) {
      return false;
    }

    if (this.input.length > 40000) {
      return false;
    }
    this.input += letter;
    for (const word of this.words) {
      if (word.length > this.input.length) {
        continue;
      }

      let suffixMatched = true;
      for (let i = 0; i < word.length; i++) {
        if (this.input[this.input.length - word.length + i] !== word[i]) {
          suffixMatched = false;
          break;
        }
      }
      if (suffixMatched) {
        return true;
      }
    }
    return false;
  }

  queryOptimized(letter: string): boolean {
    const constraintOnWordsLength = this.inputLength >= 1 && this.inputLength <= 2000;
    if (!constraintOnWordsLength) {
      return false;
    }

    if (this.input.length > 40000) {
      return false;
    }
    this.input += letter;
    for (const word of this.words) {
      if (word.length > this.input.length) {
        continue;
      }
      if (this.input.slice(this.input.length - word.length) === word) return true;
    }
    return false;
  }
}

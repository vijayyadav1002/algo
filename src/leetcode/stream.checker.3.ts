class TrieNode {
  isWord: boolean;
  children: Map<string, TrieNode>;

  constructor() {
    this.isWord = false;
    this.children = new Map();
  }
}

class StreamChecker {
  private root: TrieNode;
  private stream: string[];
  private maxWordLength: number;

  constructor(words: string[]) {
    this.root = new TrieNode();
    this.stream = [];
    this.maxWordLength = 0;

    for (const word of words) {
      this.insert(word);
      this.maxWordLength = Math.max(this.maxWordLength, word.length);
    }
  }

  private insert(word: string): void {
    let node = this.root;
    for (let i = word.length - 1; i >= 0; i--) {
      const ch = word[i];
      if (!node.children.has(ch)) {
        node.children.set(ch, new TrieNode());
      }
      node = node.children.get(ch)!;
    }
    node.isWord = true;
  }

  query(letter: string): boolean {
    this.stream.push(letter);
    // Keep the stream length within max word length
    if (this.stream.length > this.maxWordLength) {
      this.stream.shift();
    }

    let node = this.root;
    for (let i = this.stream.length - 1; i >= 0; i--) {
      const ch = this.stream[i];
      if (!node.children.has(ch)) return false;
      node = node.children.get(ch)!;
      if (node.isWord) return true;
    }
    return false;
  }
}

export { StreamChecker };

/**
 * Example usage:
 * const streamChecker = new StreamChecker(["cd", "f", "kl"]);
 * console.log(streamChecker.query("a")); // false
 * console.log(streamChecker.query("b")); // false
 * console.log(streamChecker.query("c")); // false
 * console.log(streamChecker.query("d")); // true
 */

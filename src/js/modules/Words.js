
let instance = null;

class Words {

    constructor (testString) {
        if(!instance){
              instance = this;
        }
        return instance;
    }

    /** levenshtein */
    getLevenshteinDistance (word1, word2) {
        if (typeof word1 === 'undefined' || typeof word2 === 'undefined') { return -1; }

        if (word1.length === 0) return word2.length;
        if (word2.length === 0) return word1.length;

        let tmp, i, j, prev, val;
        
        // swap to save some memory O(min(a,b)) instead of O(a)
        if (word1.length > word2.length) {
            tmp = word1;
            word1 = word2;
            word2 = tmp;
        }

        var row = Array(word1.length + 1)
        // init the row
        for (i = 0; i <= word1.length; i++) {
            row[i] = i
        }

        // fill in the rest
        for (i = 1; i <= word2.length; i++) {
            prev = i
            for (j = 1; j <= word1.length; j++) {
                if (word2[i - 1] === word1[j - 1]) {
                    val = row[j - 1] // match
                } else {
                    val = Math.min(row[j - 1] + 1, // substitution
                        Math.min(prev + 1, // insertion
                            row[j] + 1)) // deletion
                }
                row[j - 1] = prev
                prev = val
            }
            row[word1.length] = prev
        }
        return row[word1.length];
    } // getLevenshteinDistance


    // https://github.com/WGLab/lncScore-Java/blob/master/src/com/lomolith/sequence/LetterPairSimilarity.java
    // http://www.catalysoft.com/articles/StrikeAMatch.html
    compareStrings ( str1, str2) {

    } // compareStrings

    /** @return an ArrayList of 2-character Strings. */
    wordLetterPairs (str) {
        let allPairs = [];
        // Tokenize the string and put the tokens/words into an array
        let words = this.tokenizeString(str);
        for (let w = 0; w < words.length; w++) {
            let pairsInWord = this.letterPairs(words[w]);
            for (let p = 0; p < pairsInWord.length; p++) {
               allPairs.push(pairsInWord[p]);
           }
        }
        return allPairs;
    } // wordLetterPairs

    /** @return an array of adjacent letter pairs contained in the input string */
    letterPairs (str) {
        let numPairs = str.length - 1;
        let pairs = [];
        for (let i = 0; i < numPairs; i++) {
           pairs[i] = str.substring(i, i + 2);
       }
       return pairs;
    }

    /** varios */
    /** @return an array of tokens in the input string */
    tokenizeString (str) {
        return str.match(/\S+/g);
    }

}

export default Words;



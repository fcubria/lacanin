import Utils from './Utils';

let instance = null;
let utils = new Utils();

class Words {

    constructor () {
        if(!instance){
            instance = this;
        }

        this.minimo = 2;

        return instance;
    }

    /** originales lacanin */
    calculaSemejanza (palabra1, palabra2) {

    /*
      Antes de nada hay que ver si la semejanza se ha calculado ya, buscando en el array semejanzas (por ejemplo semejanzas['puertadespertador'] = 16;)
      Si existe se devuelve el valor que existe, si no se calcula y se añade.
      ... Al principio de la aplicación se tiene que leer el array, y al final comitearlo ¿?
    */

    var valor = 0;

    var subpalabras1 = this.getSubpalabras(palabra1);
    var subpalabras2 = this.getSubpalabras(palabra2);

    /*
        comparación: (ejemplo camisa-camisón)
        · se coge la palabra más corta o una cualquiera de ella si son de igual longitud
        · número de letras de esta palabra: 6
          se prueba con la palabra completa (6)
          - ¿camisa contenida en camisón? => no, así que nada
          - se prueba con las palabras que se pueden formar con 5 letras:
            - ¿camis contenida en camisón? => si, así que se suma 5
            - amisa => no
          - se prueba con las palabras de cuatro letras
              · para todas ellas se hace la misma comprobación de arriba
          - se prueba con las palabras de tres letras
          - se prueba con las palabras de dos letras (mínimo)

    */

    for (var i = 0; i < subpalabras1.length; i++) {
      var p1 = subpalabras1[i];
      for (var j = 0; j < subpalabras2.length; j++) {
        var p2 = subpalabras2[j];
        // console.log('se comparan: ' + p1 + '; ' + p2);
        if (p1 === p2) {
            // console.log('se comparan: ' + p1 + '; ' + p2);
            // console.log('Son iguales los fragmentos, se va a sumar ' + p1.length);
            valor += p1.length;
        }
      }
    }

    return valor;

  } // calculaSemejanza

    getSubpalabras ( palabra, min ) {

        min = (typeof min !== 'undefined') ? min : this.minimo;
        let palabras = [];
        let longitud = palabra.length;

        for (let i = palabra.length; i >= min; i--) {
            palabras = palabras.concat(this.getSubpalabrasDeLongitudN(palabra, i));
        }
        return palabras;

    } //getSubpalabras


    getSubpalabrasDeLongitudN ( str, longitud ) {

        longitud = (typeof longitud !== 'undefined') ? longitud : this.minimo;
        
        let palabras = this.tokenizeString(str);
        let subpalabras = [];

        palabras.forEach((palabra, i) => {
            let longitudPalabra = palabra.length;
            let diferencia = longitudPalabra - longitud;
    
            for (let i = 0; i <= diferencia; i++) {
                let subpalabra = palabra.substr(i, longitud);
                subpalabras.push(subpalabra);
            }
        });

        return subpalabras;

    } // getSubpalabrasDeLongitudN

    /** */

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


    /** compare strings */
    // https://github.com/WGLab/lncScore-Java/blob/master/src/com/lomolith/sequence/LetterPairSimilarity.java
    // http://www.catalysoft.com/articles/StrikeAMatch.html

    /** @return lexical similarity value in the range [0,1] */
    compareStrings (str1, str2) {
        let pairs1 = this.wordLetterPairs(str1.toUpperCase());
        let pairs2 = this.wordLetterPairs(str2.toUpperCase());
        let intersection = 0;
        let union = pairs1.length + pairs2.length;

        for (let i = 0; i < pairs1.length; i++) {
            let pair1 = pairs1[i];
            for(let j = 0; j < pairs2.length; j++) {
                let pair2 = pairs2[j];
                if (utils.areEqualObjects(pair1, pair2)) {
                   intersection++;
                   pairs2 = utils.removeItemFromArray(pairs2, j);
                   break;
               }
            }
        }
        return (2 * intersection) / union;
    } // compareStrings

    /** @return an ArrayList of 2-character Strings. */
    wordLetterPairs (str) {
        let allPairs = [];
        // Tokenize the string and put the tokens/words into an array
        let words = this.tokenizeString(str);

        // console.log('words')
        // console.log(words)

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
        if (typeof str === 'undefined' || str === '') {
            return []
        };
        return str.match(/\S+/g);
    }

}

export default Words;



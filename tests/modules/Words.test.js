import Words from '../../src/js/modules/Words';


let assert = require('assert');
let expect = require('chai').expect;

describe('compareStrings', () => {
    
    let words = new Words();


    

    it('tokenizeString devuelve un array', function () {
        expect(words.tokenizeString('Mi mamá me mima')).to.be.an('array');
    });
    it('tokenizeString de "Mi mamá me mima" es ["Mi", "mamá", "me", "mi", "ma"]', function () {
        expect(words.tokenizeString('Mi mamá me mima')).eql([
            'Mi', 'mamá', 'me', 'mima'
        ]);
    });

    it('letterPairs devuelve un array', function () {
        expect(words.letterPairs('camión')).to.be.an('array');
    });

    it('letterPairs de "camión" es ["ca", "am", "mi", "ió", "ón"]', function () {
        expect(words.letterPairs('camión')).eql([
            'ca',
            'am',
            'mi',
            'ió',
            'ón'
        ]);
    });

    it('wordLetterPairs devuelve un array', function () {
        expect(words.wordLetterPairs('El camión es grande')).to.be.an('array');
    });
    

    it('wordLetterPairs de "Mamá me mima" es ["Ma", "am", "má", "me", "mi", "im", "ma"]', function () {
        expect(words.wordLetterPairs('Mamá me mima')).eql([
            'Ma', 'am', 'má', 'me', 'mi', 'im', 'ma'
        ]);
    });

});


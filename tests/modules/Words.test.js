import Words from '../../src/js/modules/Words';


let assert = require('assert');
let expect = require('chai').expect;

describe('compareStrings', () => {
    
    let words = new Words();
    

    it('tokenizeString devuelve un array', function () {
        expect(words.tokenizeString('Mi mamá me mima')).to.be.an('array');
    });

    it('tokenizeString no peta con null', function () {
        expect(words.tokenizeString()).to.be.an('array');
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

    it('compareStrings funciona correctamente', function () {
        expect(words.compareStrings('Mi mamá me mima', 'Mi mamá me mata')).to.be.above(
            words.compareStrings('Mi mamá me mima', 'Mi papá me mata')
        );
        expect(words.compareStrings('Mi mamá me mima', 'Mi mamá me odia')).to.be.below(
            words.compareStrings('Mi mamá me mima', 'Mi mamá me mata')
        );
    });


    it('getSubpalabrasDeLongitudN de "Mamá me mima" es ["Ma", "am", "má", "me", "mi", "im", "ma"]', function () {
        expect(words.getSubpalabrasDeLongitudN('Mamá me mima')).eql([
            'Ma', 'am', 'má', 'me', 'mi', 'im', 'ma'
        ]);
    });
    
    it('getSubpalabrasDeLongitudN(3) de "Mamá me mima" es ["Mam", "amá", "mim", "ima"]', function () {
        expect(words.getSubpalabrasDeLongitudN('Mamá me mima',3)).eql([
            "Mam", "amá", "mim", "ima"
        ]);
    });


    
    it('getSubpalabras(4) de "cocodrilo" es ["cocodrilo", "cocodril", "ocodrilo", ...etc]', function () {
        expect(words.getSubpalabras('cocodrilo',4)).eql([
            "cocodrilo",
            "cocodril",
            "ocodrilo",
            "cocodri",
            "ocodril",
            "codrilo",
            "cocodr",
            "ocodri",
            "codril",
            "odrilo",
            "cocod",
            "ocodr",
            "codri",
            "odril",
            "drilo",
            "coco",
            "ocod",
            "codr",
            "odri",
            "dril",
            "rilo"
        ]);
    });

    
    it('getSentencesFromText devuelve un array', function () {
        expect(words.getSentencesFromText('El camión es grande, pero la vaca más. Aunque yo prefiero el chocolate, la verdad.')).to.be.an('array');
    });

});


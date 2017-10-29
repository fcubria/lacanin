import Utils from '../../src/js/modules/Utils';

let expect = require('chai').expect;


describe('Utils', () => {

    let utils = new Utils();
    

    it('areEqualObjects compara correctamente', function () {
        expect(utils.areEqualObjects(
            { name: 'John', surname: 'Doe' },
            { surname: 'Doe', name: 'John' }
        )).to.be.true;
    });

    it('removeItemFromArray elimina correctamente', function () {
        let arr = [1, 2, 3, 4, 5, 6];
        let newArr = utils.removeItemFromArray(arr, 2);
        expect(newArr).eql([1, 2, 4, 5, 6]);
    });

    

});

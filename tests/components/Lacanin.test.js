import React from 'react';
import ReactDOM from 'react-dom'
import Lacanin from '../../src/js/components/Lacanin';

import {shallow} from 'enzyme';

var assert = require('assert');
var jsdom = require('jsdom-global');
var expect = require('chai').expect;

describe('Lacanin', () => {
    
    jsdom();
    
    const div = document.createElement('div');
    const lacanin = ReactDOM.render(<Lacanin/>, div);

    it('el método prueba debería devolver lo que se le dé', function () {
        assert.equal(lacanin.prueba('caca'), 'caca');
    });

});



import React from 'react';
import ReactDOM from 'react-dom'

import Words from '../modules/Words';
import Utils from '../modules/Utils';

import Display from './Display';
import DisplayList from './DisplayList';

let utils = new Utils();

class Lacanin extends React.Component {

    constructor (props) {
        super(props);

        this.words = new Words();

        this.state = {
            word1: '',
            word2: '',
            // pairs: [],
            functions: [
                {
                    name: 'Distancia Levenshtein',
                    function: this.words.getLevenshteinDistance.bind(this.words)
                },
                {
                    name: 'Compare strings',
                    function: this.words.compareStrings.bind(this.words)
                },
                {
                    name: 'calculaSemejanza',
                    function: this.words.calculaSemejanza.bind(this.words)
                }
            ],
            values: []
        };


        this.handleChange = this.handleChange.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    componentDidMount () {

    }

    addItem (e) {
        // let newPairs = utils.cloneArray(this.state.pairs);
        let newValues = utils.cloneArray(this.state.values);

        let newItem = {
            word1: this.state.word1,
            word2: this.state.word2
        };

        this.state.functions.forEach((func, i) => {
            newItem[func.name] = func.function(this.state.word1, this.state.word2);
        });

        // newPairs.push({
        //     word1: this.state.word1,
        //     word2: this.state.word2
        // });

        newValues.push(newItem);

        this.setState({
            // pairs: newPairs
            values: newValues
        }, () => {
            console.log('this.state addItem');
            console.log(this.state);
        });
    }

    handleChange (e) {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            // console.log(this.state.Utils.prueba('caca'))
            // console.log(this.state.word1);
            // console.log(this.state.word2);
        });
    }

    render () {
        return <div>
                <DisplayList values={this.state.values} functions={this.state.functions} />

                {/* <Display name="getLevenshteinDistance" value={this.words.getLevenshteinDistance(this.state.word1, this.state.word2)} />
                <Display name="compareStrings" value={this.words.compareStrings(this.state.word1, this.state.word2)} /> */}
                <input name="word1" value={this.state.word1} onChange={this.handleChange} />
                <input name="word2" value={this.state.word2} onChange={this.handleChange} />
                <input type="button" value="añadir" onClick={this.addItem} />
            </div>
    }

}

export default Lacanin;


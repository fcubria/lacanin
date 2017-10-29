
import React from 'react';
import ReactDOM from 'react-dom'

import Words from '../modules/Words';
import Display from './Display';

class Lacanin extends React.Component {

    constructor (props) {
        super(props);



        this.state = {
            word1: '',
            word2: ''
        };

        this.words = new Words();

        this.handleChange = this.handleChange.bind(this);
    }

    prueba (text) {
        return text;
    }

    componentDidMount () {

    }

    handleChange (e) {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            // console.log(this.state.Utils.prueba('caca'))
            console.log(this.state.word1);
            console.log(this.state.word2);
        });
    }

    render () {
        return <div>
                <Display name="letterPairs word1" value={this.words.letterPairs(this.state.word1)} />
                <Display name="letterPairs word2" value={this.words.letterPairs(this.state.word2)} />
                <Display name="Distancia Lenenshtein" value={this.words.getLevenshteinDistance(this.state.word1, this.state.word2)} />
                <input name="word1" value={this.state.word1} onChange={this.handleChange} />
                <input name="word2" value={this.state.word2} onChange={this.handleChange} />
            </div>
    }

}

export default Lacanin;


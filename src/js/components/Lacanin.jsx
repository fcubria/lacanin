
import React from 'react';
import ReactDOM from 'react-dom'

import axios from "axios";

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
            values: [],
            sentence: '',
            sentences: []
        };


        this.handleChange = this.handleChange.bind(this);
        this.addItem = this.addItem.bind(this);
        this.handleSentenceChange = this.handleSentenceChange.bind(this);
        this.handleAddSentenceSubmit = this.handleAddSentenceSubmit.bind(this);
        this.loadSentencesFromServer = this.loadSentencesFromServer.bind(this);
        this.handleSentenceUpdate = this.handleSentenceUpdate.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.showSentences = this.showSentences.bind(this);
    }

    componentDidMount () {
        this.loadSentencesFromServer();
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
    handleSentenceChange (e) {
        this.setState({
            sentence: e.target.value
        });
    }
    handleAddSentenceSubmit(){
        let sentences = utils.cloneArray(this.state.sentences);
        let sentence = this.state.sentence;

        let newSentence = {
            text: this.state.sentence,
            // date: new Date()
            date: Date.now()
        }
        
        let newSentences = sentences.concat([newSentence]);
        this.setState({
            sentences: newSentences
        }, () => {
            console.log(this.state.sentences)
        });

        console.log('this.state.sentence')
        console.log(this.state.sentence)

        axios.post('http://localhost:3009/api/sentences', newSentence)
            .catch(err => {
                console.log('err', err);
                this.setState({sentencesdata: sentences});
            })
    }
    addSentence(comment) {
        let comments = this.state.data;
        comment.id = Date.now();
        let newComments = comments.concat([comment]);
        this.setState({data: newComments});
        axios.post(this.props.url, comment)
            .catch(err => {
                console.log('err', err);
                this.setState({data: comments});
            })
    }
    handleSentenceUpdate(id, sentence) {
        axios.put(`http://localhost:3009/api/sentences/${id}`, sentence)
            .then((response) => {
                console.log(response)
                this.loadSentencesFromServer();
            })
            .catch(err => {
                console.log('this is the error!' ,err);
            });
    };
    loadSentencesFromServer() {
        axios.get('http://localhost:3009/api/sentences')
        .then(res => {
            console.log('cargadas')
            this.setState({
                sentences: res.data
            }, () => {
                console.log(this.state.sentences);
            });
        })
    }

    handleTextChange (e) {
        this.setState({
            text: e.target.value
        });
    }
    showSentences (text) {
        console.log(this.words.getSentencesFromText(this.state.text));
    }

    render () {
        let sentences = [];
        this.state.sentences.forEach((sentence, index) => {
            let text = sentence.text;
            sentences.push(
                <div key={index}>
                    { sentence.text } : { sentence.date } <br/>
                    <input type="text" className="a-edit" defaultValue={text} onChange={(e) => {text = e.target.value}} name={'sentence' + index} />
                    <input type="button" value="modificar" onClick={() => {
                        // console.log(text)
                        sentence.text = text;
                        this.handleSentenceUpdate(
                            sentence._id, sentence
                        )
                    }} />
                </div>
            )
        })
        return <div>
                <textarea value={this.state.text} onChange={this.handleTextChange} cols="30" rows="10"></textarea>
                <input type="button" value="añadir" onClick={this.showSentences} />
                <h1>compare words</h1>
                <DisplayList values={this.state.values} functions={this.state.functions} />
                <input name="word1" value={this.state.word1} onChange={this.handleChange} />
                <input name="word2" value={this.state.word2} onChange={this.handleChange} />
                <input type="button" value="añadir" onClick={this.addItem} />
                <h1>sentences</h1>
                { sentences }
                <input name="sentence" value={this.state.sentence} onChange={this.handleSentenceChange} />
                <input type="button" value="añadir" onClick={this.handleAddSentenceSubmit} />
            </div>
    }

}

export default Lacanin;


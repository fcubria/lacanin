
import React from 'react';

class Lacanin extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            word1: '',
            word2: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    prueba (text) {
        return text;
    }

    handleChange (e) {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            console.log(this.state.word1);
            console.log(this.state.word2);
        });
    }

    render () {
        return <div>
                <input name="word1" value={this.state.word1} onChange={this.handleChange} />
                <input name="word2" value={this.state.word2} onChange={this.handleChange} />
            </div>
    }

}

export default Lacanin;


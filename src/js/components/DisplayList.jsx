import React from 'react';
import ReactDOM from 'react-dom'
import Utils from '../modules/Utils';
import Display from './Display';

let utils = new Utils();

class DisplayList extends React.Component {

    constructor (props) {
        super(props);

        console.log('props')
        console.log(props)

        this.state = {
            values: props.values
        }

        this.sort = this.sort.bind(this);

    }

    componentWillReceiveProps (nextProps) {

        this.setState({
            values: nextProps.values
        });

    }

    sort (e) {
        let key = e.target.innerText;
        console.log(key)

        let newValues = this.state.values.sort((value1, value2) => {
            return value1[key] < value2[key];
        });

        this.setState({
            values: newValues
        });

    }

    render () {

        let headers = [
            <th key="a" onClick={this.sort}>word1</th>,
            <th key="b" onClick={this.sort}>word2</th>
        ];
        let rows = [];
    
        this.props.functions.forEach((func, j) => {
            headers.push(<th key={j} onClick={this.sort}>{ func.name } </th>);
        });
    
        this.state.values.forEach((value, i) => {
            let rowCells = [];
            rowCells.push(
                <td key={ i + '-'}>{ value.word1 }</td>,
                <td key={ i + '_'}>{ value.word2 }</td>
            );
            this.props.functions.forEach((func, j) => {
                rowCells.push(<td key={i + '-' + j}>{ func.function(value.word1, value.word2) } </td>);
            });
            rows.push(
                <tr key={i}>
                    { rowCells }
                </tr>
            );
        });
    
        return <div class="o-display-list">
            
            <table>
                <thead>
                    <tr>
                        { headers }
                    </tr>
                </thead>
                <tbody>
                    { rows }
                </tbody>
            </table>
            
        </div>;
    }
}

export default DisplayList;


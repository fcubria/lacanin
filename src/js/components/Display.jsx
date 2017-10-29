import React from 'react';

function Display (props) {
    return <div>
        <strong>{ props.name }</strong> <span>{ props.value }</span>
    </div>;
}

export default Display;


import React from 'react';
import ReactDOM from 'react-dom'
import Lacanin from './components/Lacanin';

import '../scss/main.scss';

ReactDOM.render(
  <Lacanin />,
  document.getElementById('r-lacanin')
);


if (module.hot) {
    module.hot.accept('./components/Lacanin', () => {
        const Lacanin = require('./components/Lacanin').default;
        ReactDOM.render(<Lacanin />, document.getElementById('r-lacanin'));
    })
}

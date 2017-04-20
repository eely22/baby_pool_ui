import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
    palette:{
        primary1Color: '#b19cd9'
    },
    slider: { trackSize : 3, handleSize:10, handleSizeActive: 20 }
});

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <App />
    </MuiThemeProvider>,
  document.getElementById('root')
);

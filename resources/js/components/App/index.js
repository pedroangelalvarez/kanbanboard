import React from 'react';
import ReactDOM from 'react-dom';
import Board from '../Board';

function App() {
    return ( 
        <div style={{display: 'flex',justifyContent: 'center',alignItems: 'center', position:'relative'}}>
        <Board />
        </div>
    );
}

export default App;

import Experience from './Experience/Experience';
import './style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const experience = new Experience(document.querySelector('canvas.webgl'));
ReactDOM.render(<App />, document.getElementById('root'));

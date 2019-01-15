import './reset.css';
import loadBG from './components/load/loadBG.js';
import enterNickname from './components/load/EnterNickname.js';
import Magic from './components/magic/Magic.js';

require('./favicon.ico');

loadBG();
enterNickname();
new Magic();//eslint-disable-line

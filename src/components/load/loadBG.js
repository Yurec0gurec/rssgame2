import './vendor/jquery.lineProgressbar.min.css';
import './style.css';
import $ from 'jquery';
import GlobalVariables from './variables.js';

function loadBG() {
  const bgArray = ['img/1_game_background.png', 'img/2_game_background.png', 'img/3_game_background.png', 'img/4_game_background.png'];
  const rand = Math.floor(Math.random() * bgArray.length);
  const bg = bgArray[rand];
  $('body').css('backgroundImage', `url(${bg})`);
  GlobalVariables.level = rand;
}
export default loadBG;

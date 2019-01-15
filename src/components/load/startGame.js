import $ from 'jquery';
import GlobalVariables from './variables.js';
import Game from '../game/game.js';

require('./vendor/jquery.lineProgressbar.js');

function startGame() {
  let tempValue = '';
  if ($(this).val() === 'Мальчик') {
    tempValue = 'Male';
  } else {
    tempValue = 'Female';
  }
  GlobalVariables.game = new Game(tempValue);
  GlobalVariables.game.hero.Nickname = GlobalVariables.HeroNickname;
  $('.chooseCharacter').remove();
  const tempWrapper = $('body');
  $(tempWrapper).prepend('<div class="mainCharacter_container">');
  $(tempWrapper).prepend('<canvas id="enemy_canvas">');
  $(tempWrapper).prepend('<canvas id="hero_canvas">');
  $(tempWrapper).prepend('<article class="enemy_bar">');
  $(tempWrapper).prepend('<article class="hero_bar">');
  $(tempWrapper).prepend('<section class="duel_names">');
  $(tempWrapper).prepend('<article class="killsCount">');
  $('.killsCount').append('<p>Монстров убито:</p>');
  $('.killsCount').append(`<p>${GlobalVariables.game.hero.kills}</p>`);
  $('.duel_names').append('<p class="hero_name">');
  $('.duel_names').append('<p class="monster_name">');
  $('.hero_name').append(GlobalVariables.HeroNickname);
  $('body').append(tempWrapper);
  $('#callMagic').show();
  GlobalVariables.game.redrawHP('monster');
  GlobalVariables.game.redrawHP('hero');
  GlobalVariables.game.loadAudio('FemaleDeath');
  GlobalVariables.game.loadAudio('MaleDeath');
  GlobalVariables.game.loadAudio('gameOver');
  GlobalVariables.game.loadAudio('heal');
  GlobalVariables.game.loadAudio('heroHit');
  GlobalVariables.game.loadAudio('monsterDeath');
  GlobalVariables.game.loadAudio('monsterHit');
  GlobalVariables.game.monster.generateName();
  GlobalVariables.game.hero.draw(tempValue);
  GlobalVariables.game.monster.draw();
  GlobalVariables.game.animate();
  GlobalVariables.game.musicOn();
}
export default startGame;

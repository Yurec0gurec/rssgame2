import $ from 'jquery';
import { win } from '../bd/bd.js';
import { modalWindowShow } from '../modal/modal.js';
import GlobalVariables from './variables.js';
import { INITIAL_VALUES } from './constants.js';

function HeroAttack() {
  const attack = Math.floor(25 + Math.random() * 35);
  let distance = 65;
  if (GlobalVariables.game.hero.gender === 'Female') distance = 71;
  if (GlobalVariables.game.monster.HP - attack < 0) {
    GlobalVariables.game.monster.HP = 0;
  } else {
    GlobalVariables.game.monster.HP -= attack;
  }
  $('#hero_canvas').animate({
    left: `${distance}%`,
  }, 500, () => {
    GlobalVariables.game.hero.x = INITIAL_VALUES.x;
    GlobalVariables.game.hero.tick_count = INITIAL_VALUES.tick_count;
    GlobalVariables.game.hero.animationType = 'attacking';
    if (GlobalVariables.game.monster.HP <= 0) {
      win();
      GlobalVariables.game.audioEffect('heroHit');
      GlobalVariables.game.audioEffect('monsterDeath');
      $('#enemy_canvas').css('transition', '0.5s ease-in-out');
      $('#enemy_canvas').css('bottom', '-45px');
      $('#enemy_canvas').css('left', '87%');
      $('#enemy_canvas').css('transform', 'rotate(90deg)');
      GlobalVariables.game.monster.animationType = 'die';
      GlobalVariables.game.hero.kills++;
      $('.killsCount > p:last').empty();
      $('.killsCount > p:last').append(GlobalVariables.game.hero.kills);
    } else {
      GlobalVariables.game.audioEffect('heroHit');
      GlobalVariables.game.monster.animationType = 'hurt';
    }
  });
  GlobalVariables.game.redrawHP('monster');
  $('#hero_canvas').delay(1000).animate({
    left: `${2}%`,
  }, 500, modalWindowShow);
}

export default HeroAttack;

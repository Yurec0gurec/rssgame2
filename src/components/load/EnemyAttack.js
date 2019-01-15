import $ from 'jquery';
import { modalWindowShow } from '../modal/modal.js';
import GlobalVariables from './variables.js';
import { INITIAL_VALUES } from './constants.js';

function EnemyAttack() {
  const attack = Math.floor(15 + Math.random() * (35 + 1 - 15));

  function resolve() {
    GlobalVariables.game.monster.animationType = 'attacking';
    if (GlobalVariables.game.hero.HP - attack < 0) {
      GlobalVariables.game.hero.HP = 0;
    } else {
      GlobalVariables.game.hero.HP -= attack;
    }
    GlobalVariables.game.redrawHP('hero');
    if (GlobalVariables.game.hero.HP <= 0) {
      GlobalVariables.game.hero.x = INITIAL_VALUES.x;
      GlobalVariables.game.audioEffect(`${GlobalVariables.game.hero.gender}Death`);
      GlobalVariables.game.hero.animationType = 'die';
      GlobalVariables.game.hero.tick_count = INITIAL_VALUES.tick_count;
    } else {
      GlobalVariables.game.hero.x = INITIAL_VALUES.x;
      GlobalVariables.game.hero.animationType = 'hurt';
      GlobalVariables.game.hero.tick_count = INITIAL_VALUES.tick_count;
    }
    GlobalVariables.game.audioEffect('monsterHit');
  }
  $('#enemy_canvas').animate({
    left: `${12}%`,
  }, 500, resolve);

  $('#enemy_canvas').delay(500).animate({
    left: `${80}%`,
  }, 200, modalWindowShow);
}

export default EnemyAttack;

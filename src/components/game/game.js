import $ from 'jquery';
import Hero from '../hero/Hero.js';
import Monster from '../monster/monster.js';
import GlobalVariables from '../load/variables.js';
import { modalWindowShow } from '../modal/modal.js';
import { loose } from '../bd/bd.js';
import { INITIAL_VALUES } from '../load/constants.js';

class Game {
  constructor(gender) {
    this.hero = new Hero(gender);
    this.monster = new Monster();
    this.animation = null;
    this.bgMusic = null;
    this.audioEffects = {};
  }

  tick() {
    this.animation = requestAnimationFrame(this.tick.bind(this));
    this.hero.animate();
    this.monster.animate();
  }

  animate() {
    this.animation = requestAnimationFrame(this.tick.bind(this));
  }

  musicOn() {
    this.bgMusic = new Audio();
    switch (GlobalVariables.level) {
      case 0:
        this.bgMusic.src = 'sound/music/Epidemic%20Sound%20-%20Happy%20And%20Joyful%2014.mp3';
        break;
      case 1:
        this.bgMusic.src = 'sound/music/Epidemic%20Sound%20-%20Sneaking%20Up%201.mp3';
        break;
      case 2:
        this.bgMusic.src = 'sound/music/Epidemic%20Sound%20-%20Thieves%20Adventures%205.mp3';
        break;
      case 3:
        this.bgMusic.src = 'sound/music/Epidemic%20Sound%20-%20Mystery%20Minute%209.mp3';
        break;
      default:
    }
    this.bgMusic.loop = true;
    this.bgMusic.volume = 0.3;
    this.bgMusic.autoplay = true;
  }

  musicOff() {
    this.bgMusic.pause();
    this.bgMusic.currentTime = 0;
  }

  loadAudio(name) {
    this.audioEffects[name] = new Audio();
  }

  audioEffect(event) {
    this.audioEffects[event].src = `sound/${event}.mp3`;
    this.audioEffects[event].volume = 0.4;
    this.audioEffects[event].autoplay = true;
  }

  gameOver() {
    cancelAnimationFrame(this.animation);
    this.musicOff();
    this.audioEffect('gameOver');
    const $btnAgain = $('<input/>').attr({
      type: 'button',
      name: 'reset',
      value: 'Заново',
      class: 'resetButton',
    });
    const $btnExit = $('<input/>').attr({
      type: 'button',
      name: 'exit',
      value: 'Выйти',
      class: 'exitButton',
    });
    $('body').append('<section class="gameOver">');
    $('.gameOver').append(`${'<p>Игра окончена.</br>Ты победил <b>'}${GlobalVariables.game.hero.kills}</b> Монстров</p>`);
    $('.gameOver').append('<article class="buttons_gameOver">');
    $('.buttons_gameOver').append($btnAgain);
    $('.buttons_gameOver').append($btnExit);
    $('.resetButton').on('click', this.resetGame);
    $('.exitButton').on('click', loose);
  }

  redrawHP(character) {
    this.tick_count = INITIAL_VALUES.tick_count;
    switch (character) {
      case 'monster':
        $('.enemy_bar').LineProgressbar({
          percentage: GlobalVariables.game.monster.HP,
          duration: 0,
          fillBackgroundColor: 'brown',
          height: '30px',
          width: '100%',
          radius: '5px',
          backgroundColor: '#EEEEEE',
        });
        break;
      case 'hero':
        $('.hero_bar').LineProgressbar({
          percentage: GlobalVariables.game.hero.HP,
          duration: 0,
          fillBackgroundColor: '#3498db',
          height: '30px',
          width: '100%',
          radius: '5px',
          backgroundColor: '#EEEEEE',
        });
        break;
      default:
    }
  }

  resetGame() {
    this.tick_count = INITIAL_VALUES.tick_count;
    $('.gameOver').remove();
    GlobalVariables.game.musicOn();
    GlobalVariables.game.hero.x = INITIAL_VALUES.x;
    GlobalVariables.game.hero.animationType = 'standing';
    GlobalVariables.game.hero.kills = INITIAL_VALUES.kills;
    GlobalVariables.game.hero.HP = INITIAL_VALUES.HP;
    GlobalVariables.game.monster.HP = INITIAL_VALUES.HP;
    GlobalVariables.game.redrawHP('hero');
    GlobalVariables.game.redrawHP('monster');
    $('.killsCount > p:last').empty();
    $('.killsCount > p:last').append(GlobalVariables.game.hero.kills);
    GlobalVariables.game.animate();
    modalWindowShow();
  }
}

export default Game;

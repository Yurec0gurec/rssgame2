import $ from 'jquery';
import startGame from './startGame.js';

function ChooseCharacter() {
  const $btnMale = $('<input/>').attr({
    type: 'button',
    name: 'male',
    value: 'Мальчик',
    class: 'maleBtn',
  });
  const $btnFemale = $('<input/>').attr({
    type: 'button',
    name: 'female',
    value: 'Девочка',
    class: 'femaleBtn',
  });
  $('body').append('<section class="chooseCharacter">');
  $('.chooseCharacter').append('<p>Выбери пол</p>');
  $('.chooseCharacter').append('<article class="buttons_character">');
  $('.buttons_character').append($btnMale);
  $('.buttons_character').append($btnFemale);
  $('.buttons_character').delegate('input', 'click', startGame);
}

export default ChooseCharacter;

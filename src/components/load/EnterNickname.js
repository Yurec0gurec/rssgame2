import $ from 'jquery';
import ChooseCharacter from './chooseCharacter.js';
import { createUser } from '../bd/bd.js';
import GlobalVariables from './variables.js';

function enterNickname() {
  const $NicknameForm = $('<input/>').attr({
    type: 'text',
    placeholder: 'Имя',
    class: 'NicknameForm',
  });
  const $Start = $('<input/>').attr({
    type: 'button',
    value: 'Вперед!',
    class: 'StartBtn',
  });
  $('body').append('<section class="enterNickname">');
  $('.enterNickname').append('<p>Назови своё имя, герой</p>');
  $('.enterNickname').append('<article class="nickname_form">');
  $('.nickname_form').append($NicknameForm);
  $('.nickname_form').append($Start);
  $('.nickname_form').delegate('input:last-child', 'click', () => {
    if ($('input:first-child').val()) {
      GlobalVariables.HeroNickname = $('input:first-child').val();
      createUser(GlobalVariables.HeroNickname);
      $('.enterNickname').remove();
      ChooseCharacter();
    } else {
      $('input:first-child').addClass('errorNickname');
      $('input:first-child').css('background-color', '#FFDAB9');
      $('input:first-child').attr('placeholder', 'Представься...');
    }
  });
}

export default enterNickname;

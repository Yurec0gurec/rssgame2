import $ from 'jquery';
import GlobalVariables from '../load/variables.js';
import { INITIAL_VALUES, CANVAS_SIZES } from '../load/constants.js';

class Monster {
  constructor() {
    this.name = '';
    this.HP = INITIAL_VALUES.HP;
    this.x = INITIAL_VALUES.x;
    this.monsterFace = INITIAL_VALUES.monsterFace;
    this.tick_count = INITIAL_VALUES.tick_count;
    this.BodyParts = {
      Face: INITIAL_VALUES.monsterFace,
    };
    this.animationType = 'standing';
    this.breathInc = INITIAL_VALUES.breathInc;
    this.breathDir = INITIAL_VALUES.breathDir;
    this.breathAmt = INITIAL_VALUES.breathAmt;
    this.breathMax = INITIAL_VALUES.breathMax;
  }

  generateName() {
    let rand = Math.floor(Math.random() * 5);
    let tempNick = '';
    tempNick = `${GlobalVariables.name_array_1[rand]} `;
    rand = Math.floor(Math.random() * 5);
    tempNick += `${GlobalVariables.name_array_2[rand]} `;
    rand = Math.floor(Math.random() * 5);
    tempNick += GlobalVariables.name_array_3[rand];
    this.name = tempNick;
    $('.monster_name').empty();
    $('.monster_name').append(this.name);
  }

  loadImage(name) {
    const rand = Math.floor(1 + Math.random() * 3);
    this.BodyParts[name] = new Image();
    if (name === 'Face') {
      this.monsterFace = rand;
      this.BodyParts[name].src = `img/bodyParts_demo/${name}${rand}.png`;
    } else if (name === 'Blink' || name === 'Hurt') {
      this.BodyParts[name].src = `img/bodyParts_demo/${name}${this.monsterFace}.png`;
    } else {
      this.BodyParts[name].src = `img/bodyParts_demo/${name}${rand}.png`;
    }
  }

  draw() {
    this.context = $('#enemy_canvas')[0].getContext('2d');
    this.context.canvas.height = CANVAS_SIZES.monsterCanvasHeight;
    this.context.canvas.width = CANVAS_SIZES.monsterCanvasWidth;
    this.redraw = () => {
      const x = 0;
      const y = 0;
      this.context.canvas.width = this.context.canvas.width;
      this.context.drawImage(this.BodyParts.weapon, x - 6, y + 169 - this.breathAmt, 110, 55);
      this.context.drawImage(this.BodyParts.LeftLeg, x + 85, y + 200, 50, 50);
      this.context.drawImage(this.BodyParts.RightLeg, x + 120, y + 200, 50, 50);
      this.context.drawImage(this.BodyParts.LeftHand, x + 65, y + 167 - this.breathAmt, 50, 50);
      this.context.drawImage(this.BodyParts.LeftArm, x + 65, y + 143 - this.breathAmt, 50, 50);
      this.context.drawImage(this.BodyParts.Body, x + 65, y + 120, 130, 130);
      this.context.drawImage(this.BodyParts.RightHand, x + 130, y + 166 - this.breathAmt, 50, 50);
      this.context.drawImage(this.BodyParts.RightArm, x + 130, y + 142 - this.breathAmt, 50, 50);
      this.context.drawImage(this.BodyParts.Head, x + 60, y + 45 - this.breathAmt, 140, 140);
      this.context.drawImage(this.BodyParts.Face, x + 65, y + 65 - this.breathAmt, 110, 110);
    };
    this.loadImage('Body');
    this.loadImage('LeftArm');
    this.loadImage('LeftHand');
    this.loadImage('LeftLeg');
    this.loadImage('RightArm');
    this.loadImage('RightHand');
    this.loadImage('RightLeg');
    this.loadImage('Face');
    this.loadImage('weapon');
    this.loadImage('Head');
    this.loadImage('Hurt');
    this.loadImage('Blink');
    this.loadImage('Hurt');
    this.loadImage('Attack');
  }

  hurtAnimation() {
    if (this.tick_count > 25) {
      this.animationType = 'standing';
    }
    const x = 0;
    const y = 0;
    this.context.canvas.width = this.context.canvas.width;
    this.context.drawImage(this.BodyParts.weapon, x - 6, y + 169 - this.breathAmt, 110, 55);
    this.context.drawImage(this.BodyParts.LeftLeg, x + 85, y + 200, 50, 50);
    this.context.drawImage(this.BodyParts.RightLeg, x + 120, y + 200, 50, 50);
    this.context.drawImage(this.BodyParts.LeftHand, x + 65, y + 167 - this.breathAmt, 50, 50);
    this.context.drawImage(this.BodyParts.LeftArm, x + 65, y + 143 - this.breathAmt, 50, 50);
    this.context.drawImage(this.BodyParts.Body, x + 65, y + 120, 130, 130);
    this.context.drawImage(this.BodyParts.RightHand, x + 130, y + 166 - this.breathAmt, 50, 50);
    this.context.drawImage(this.BodyParts.RightArm, x + 130, y + 142 - this.breathAmt, 50, 50);
    this.context.drawImage(this.BodyParts.Head, x + 60, y + 45 - this.breathAmt, 140, 140);
    this.context.drawImage(this.BodyParts.Hurt, 65, 65 - this.breathAmt, 110, 110);
    this.tick_count++;
  }

  standingAnimation() {
    if (this.tick_count > 1) {
      this.redraw();
      if (this.breathDir === INITIAL_VALUES.breahtDir) {
        this.breathAmt -= this.breathInc;
        if (this.breathAmt < -this.breathMax) {
          this.breathDir = -INITIAL_VALUES.breahtDir;
        }
      } else {
        this.breathAmt += this.breathInc;
        if (this.breathAmt > this.breathMax) {
          this.breathDir = INITIAL_VALUES.breahtDir;
        }
      }
      this.tick_count = INITIAL_VALUES.tick_count;
    }
    this.tick_count++;
  }

  attackingAnimation() {
    if (this.tick_count > 25) {
      this.animationType = 'standing';
    }
    const x = 0;
    const y = 0;
    this.context.canvas.width = this.context.canvas.width;
    this.context.drawImage(this.BodyParts.Attack, 5, 65 - this.breathAmt, 110, 110);
    this.context.drawImage(this.BodyParts.weapon, x - 6, y + 169 - this.breathAmt, 110, 55);
    this.context.drawImage(this.BodyParts.LeftLeg, x + 85, y + 200, 50, 50);
    this.context.drawImage(this.BodyParts.RightLeg, x + 120, y + 200, 50, 50);
    this.context.drawImage(this.BodyParts.LeftHand, x + 65, y + 167 - this.breathAmt, 50, 50);
    this.context.drawImage(this.BodyParts.LeftArm, x + 65, y + 143 - this.breathAmt, 50, 50);
    this.context.drawImage(this.BodyParts.Body, x + 65, y + 120, 130, 130);
    this.context.drawImage(this.BodyParts.RightHand, x + 130, y + 166 - this.breathAmt, 50, 50);
    this.context.drawImage(this.BodyParts.RightArm, x + 130, y + 142 - this.breathAmt, 50, 50);
    this.context.drawImage(this.BodyParts.Head, x + 60, y + 45 - this.breathAmt, 140, 140);
    this.context.drawImage(this.BodyParts.Face, 65, 65 - this.breathAmt, 110, 110);
    this.tick_count++;
  }

  dieAnimation() {
    if (this.tick_count > 70) {
      this.HP = INITIAL_VALUES.HP;
      $('.enemy_bar').LineProgressbar({
        percentage: this.HP,
        duration: 1000,
        fillBackgroundColor: 'brown',
        height: '30px',
        width: '100%',
        radius: '5px',
        backgroundColor: '#EEEEEE',
      });
      this.generateName();
      this.draw();
      $('#enemy_canvas').removeAttr('style');
      this.animationType = 'standing';
    }
    const x = 0;
    const y = 0;
    this.context.canvas.width = this.context.canvas.width;
    this.context.drawImage(this.BodyParts.weapon, x - 6, y + 169 - this.breathAmt, 110, 55);
    this.context.drawImage(this.BodyParts.LeftLeg, x + 85, y + 200, 50, 50);
    this.context.drawImage(this.BodyParts.RightLeg, x + 120, y + 200, 50, 50);
    this.context.drawImage(this.BodyParts.LeftHand, x + 65, y + 167 - this.breathAmt, 50, 50);
    this.context.drawImage(this.BodyParts.LeftArm, x + 65, y + 143 - this.breathAmt, 50, 50);
    this.context.drawImage(this.BodyParts.Body, x + 65, y + 120, 130, 130);
    this.context.drawImage(this.BodyParts.RightHand, x + 130, y + 166 - this.breathAmt, 50, 50);
    this.context.drawImage(this.BodyParts.RightArm, x + 130, y + 142 - this.breathAmt, 50, 50);
    this.context.drawImage(this.BodyParts.Head, x + 60, y + 45 - this.breathAmt, 140, 140);
    this.context.drawImage(this.BodyParts.Hurt, 65, 65 - this.breathAmt, 110, 110);
    this.tick_count++;
  }

  animate() {
    if (this.animationType === 'standing') {
      this.standingAnimation();
    } else if (this.animationType === 'attacking') {
      this.attackingAnimation();
    } else if (this.animationType === 'hurt') {
      this.hurtAnimation();
    } else if (this.animationType === 'die') {
      this.dieAnimation();
    }
  }
}

export default Monster;

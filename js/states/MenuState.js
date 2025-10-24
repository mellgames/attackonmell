
var Phaser = Phaser || {};
var AttackOnBall = AttackOnBall || {};

var f =

AttackOnBall.MenuState = function () {
  "use strict";
  Phaser.State.call(this);
};

AttackOnBall.MenuState.prototype = Object.create(Phaser.State.prototype);
AttackOnBall.MenuState.prototype.constructor = AttackOnBall.MenuState;

AttackOnBall.MenuState.prototype.init = function (bestScore) {
  "use strict";
  this.bestScore = bestScore || (window.localStorage && window.localStorage.getItem("bestScore")) || 0;
};

AttackOnBall.MenuState.prototype.preload = function () {
  "use strict";
  
};

AttackOnBall.MenuState.prototype.create = function () {
  "use strict";

  
  var bg = game.add.image(0, 0, 'bg');

    // this.bgMusic = game.add.audio(SOUNDS.BACKGROUND);
    // this.bgMusic.loop = true;
    // this.bgMusic.volume = 0.05;
    // this.bgMusic.play();

  
  var landIndex = game.rnd.integerInRange(0, 5);
  var land = game.add.image(0, HEIGHT - 204, 'land' + landIndex);
  
  
  var touchToPlay = game.add.image(WIDTH / 2, HEIGHT - 404, 'touchToPlay');
  touchToPlay.anchor.setTo(0.5, 0.5);
  game.add.tween(touchToPlay).to({alpha: 0}, 500, "Linear", true, 0, -1, true);

  
  var title = game.add.image(-400, 104, 'title');
  title.anchor.setTo(0.5, 0.5);
  game.add.tween(title).to({x: WIDTH / 2}, 500, Phaser.Easing.Bounce.Out, true);

  
  var textBest = game.add.sprite(0, 0, 'wordBest');
  textBest.anchor.set(0.5);
  textBest.scale.setTo(1.3, 1.3);
  textBest.tint = 0xFF0A63;
  var textColon = game.add.sprite(100, 10, 'colon');
  textColon.anchor.set(0.5);
  textColon.tint = 0xFF0A63;

  var timeIntegerText = game.add.bitmapText(textColon.right + 10, textColon.top - 10, 'numberScoreMain', '0', 48);
  timeIntegerText.tint = 0x000000;
  timeIntegerText.text = Math.floor(this.bestScore / 10) + "";
  var dot = game.add.image(timeIntegerText.right + 2, timeIntegerText.bottom - 10, 'dot');
  dot.tint = 0x000000;
  var timeDecimalText = game.add.bitmapText(dot.right, timeIntegerText.top, 'numberScoreMain', '00', 48);
  timeDecimalText.tint = 0x000000;
  timeDecimalText.text = this.bestScore % 10;

  this.timeTimer = game.time.events.loop(Phaser.Timer.SECOND * 0.1, this.updateScoreColor, {timeIntegerText: timeIntegerText, dot: dot, timeDecimalText: timeDecimalText});

  var bestText = game.add.sprite(WIDTH / 2 - 100, HEIGHT / 2 - 100);
  bestText.addChild(textBest);
  bestText.addChild(textColon);
  bestText.addChild(timeIntegerText);
  bestText.addChild(dot);
  bestText.addChild(timeDecimalText);

  


  
  var stickman = game.add.spine(WIDTH / 2, HEIGHT - 204 + 20, 'stickman');
  stickman.scale.setTo(1.5, 1.5);

  stickman.setAnimationByName(0, 'Idle', true);

  game.input.onDown.add(this.tapStart, {
    title: title,
    text: bestText,
    buttonGamecenter: this.buttonGamecenter,
    buttonShare: this.buttonShare,
    landIndex: landIndex
  });

};

AttackOnBall.MenuState.prototype.buttonDown = function(button, point) {
  var len = button.key.length;
  var mainKey = button.key.substring(0, len-1);
  button.loadTexture(mainKey + '1');
  button.animTween = game.add.tween(button.scale).to({x: 1.1, y: 1.1}, 100, "Linear", true);
}

AttackOnBall.MenuState.prototype.buttonUp = function(button, point) {
  var len = button.key.length;
  var mainKey = button.key.substring(0, len-1);
  button.animTween.stop();
  button.loadTexture(mainKey + '0');
  button.scale.setTo(1, 1);

  if(mainKey === "buttonGamecenter") {
    this.onGamecenter();
  } else if(mainKey === "buttonShare") {
    this.onShare();
  }
}

AttackOnBall.MenuState.prototype.tapStart = function(point) {

  var title = this.title;
  var text = this.text;
  var landIndex = this.landIndex;

  game.add.tween(title).to({x: -400}, 500, Phaser.Easing.Bounce.In, true);

  var tween = game.add.tween(text).to({alpha: 0}, 500, "Linear", true);
  tween.onComplete.add(function() {
    game.state.start("GameState", true, false, landIndex);
  });
}

AttackOnBall.MenuState.prototype.updateScoreColor = function() {
  var color = Math.random() * 0xffffff;
  this.timeIntegerText.tint = color;
  this.dot.tint = color;
  this.timeDecimalText.tint = color;
}

AttackOnBall.MenuState.prototype.onGamecenter = function() {
  console.log('onGamecenter');
}

AttackOnBall.MenuState.prototype.onShare = function() {
  console.log('onShare');
}




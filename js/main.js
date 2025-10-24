
var Phaser = Phaser || {};
var AttackOnBall = AttackOnBall || {};

var gameDiv = document.getElementById('game');
var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, 'game');

game.state.add("BootState", new AttackOnBall.BootState());
game.state.add("PreloadState", new AttackOnBall.PreloadState());
game.state.add("MenuState", new AttackOnBall.MenuState());
game.state.add("GameState", new AttackOnBall.GameState());
game.state.start("BootState");

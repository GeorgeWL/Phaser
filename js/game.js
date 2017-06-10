var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update })

function preload () {
  game.load.image('sky', 'assets/sky.png')
  game.load.image('ground', 'assets/platform.png')
  game.load.image('star', 'assets/star.png')
  game.load.sprite('dude', 'assets/dude.png')
}

function create () {
}
game.add.sprite('0', '0', 'star')
function update () {
}

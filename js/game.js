var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update
})
var Phaser
// defined in the library, called here to stop any bugs
var platforms
var ground
var ledge
var player
var cursors
var hitPlatform

function preload() {
  game.load.image('sky', '/assets/sky.png')
  game.load.image('ground', '/assets/platform.png')
  game.load.image('star', '/assets/star.png')
  game.load.spritesheet('dude', '/assets/dude.png', 32, 48)
}

function create() {
  // add arcade-style physics
  game.physics.startSystem(Phaser.Physics.ARCADE)
  // sky bg
  game.add.sprite(0, 0, 'sky')
  // create a group for the platforms
  platforms = game.add.group()
  // enables physics for all in the same group
  platforms.enableBody = true
  // sets a position 64 away from the top and calls it ground
  ground = platforms.create(0, game.world.height - 64, 'ground')
  // scales sprite to relative height
  ground.scale.setTo(2, 2)
  // keeps ground pieces locked in place
  ground.body.immovable = true
  // create ledges
  ledge = platforms.create(400, 400, 'ground')
  ledge.body.immovable = true
  ledge = platforms.create(-150, 250, 'ground')
  ledge.body.immovable = true
  // add player sprite called dude
  player = game.add.sprite(32, game.world.height - 150, 'dude')
  // give player physics
  game.physics.arcade.enable(player)
  // add bounce to player
  player.body.bounce.y = 0.2
  // add a weight to it
  player.body.gravity.y = 300
  // stop it from flying off the map
  player.body.collideWorldBounds = true
  // simple left and right animation for now
  player.animations.add('left', [0, 1, 2, 3], 10, true)
  player.animations.add('right', [5, 6, 7, 8], 10, true)
}

function update () {
  //  create collisions for player and stars
  hitPlatform = game.physics.arcade.collide(player, platforms)
  // add cursors
  cursors = game.input.keyboard.createCursorKeys()
  // reset velocity
  player.body.velocity.x = 0
  // set some moving
  if (cursors.left.isDown) {
    player.body.velocity.x = -150
    player.animations.play('left')
  } else if (cursors.right.isDown) {
    player.body.velocity.x = 150
    player.animations.play('right')
  } else {
    // don't move
    player.animations.stop()
    // back to init frame
    player.frame = 4
  }
  // if jump and body is touching the ground
  if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
    // jump (by gaining negative velocity)
    player.body.velocity.y = -350
  }
}

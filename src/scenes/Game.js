/* globals __DEV__ */
import Phaser from 'phaser'
import HealthBar from './Healthbar'

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'GameScene' })
    this.level = 1
  }
  init () {}
  preload () {
    let background = this.load.image('green', './assets/images/green.jpg')
    let waterButton = this.load.image('waterButton', './assets/images/button.png')
  }

  create () {
    // sprite
    // this.plant = new Plant({
    //   scene: this,
    //   x: 400,
    //   y: 300,
    //   asset: 'plant1'
    // })

    // plant and background
    this.bg = this.add.tileSprite(400, 300, 800, 600, 'background')
    let plant = this.add.image(400, 400, 'plant1')
    plant.setScale(0.3)
    this.add.text(220, 500, 'Plant Simulation Game', {
      font: '40px Bangers',
      fill: '#000000'
    })

    // healthbar
    this.hp = new HealthBar(this.scene.scene, 80, 80)
    this.hp.setValue(10)
    this.currentHP = this.add.text(80, 140, `HP: ${this.hp.value}`, {
      fill: "#000000"
    })


    // water button
    this.waterButton = this.add.image(650, 80, 'waterButton')
    this.waterButton.setScale(0.5)
    this.waterButton.setInteractive()
    this.waterButton.on('pointerdown', () => {

    })

  }

  increaseLevel () {

  }
}

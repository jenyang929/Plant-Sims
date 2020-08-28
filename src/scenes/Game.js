/* globals __DEV__ */
import Phaser from 'phaser'
import HealthBar from './Healthbar'

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'GameScene' })
    this.level = 1
  }
  init (){}
  preload () {
    let background = this.load.image('green', './assets/images/green.jpg')
    let waterButton = this.load.image('waterButton', './assets/images/button.png')
  }

  create () {
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
      this.hp.increase(20)
      this.hp.setValue(this.hp.value)
      this.changeHPText()
      if (this.hp.value >= 100) {
        this.increaseLevel()
      }
    })

  }
  changeHPText () {
    this.currentHP.setText(`HP: ${this.hp.value}`);

  }
  increaseLevel () {
    //increases level once HP is 100
    this.level++

    // when level increases, "plant is growing" pops up
    this.timedEvent = this.time.addEvent({
      delay: 1000,
      callback: () => {
        let nextLevel =  this.add.text(300, 200, "Your plant is growing!", {
          fill: "#000000"
        })
        this.destroyText = this.time.addEvent({
          delay: 4000,
          callback: () => {
            if (nextLevel) {
              nextLevel.destroy()
            }
          }
        })
      },
      callbackScope: this,
      loop: false,
    });

    // HP goes back down to 10 with an increased level
    // this.hp.value = 10
    // this.changeHPText()
  }
}

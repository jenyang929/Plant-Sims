/* globals __DEV__ */
import Phaser from 'phaser'
import HealthBar from './HealthBar'

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
    this.createBackground()
    this.createPlant('plant1')
    this.createHPBar()
    this.createWaterButton()
  }
  createBackground () {
    this.bg = this.add.tileSprite(400, 300, 800, 600, 'background')
    this.add.text(220, 500, 'Plant Simulation Game', {
      font: '40px Bangers',
      fill: '#000000'
    })
  }
  createPlant (plant) {
    // if there is no plant, create plant1
    // if there is already a plant, and we need to delete old plant, destroy and create
    if (!this.currentPlant) {
      this.currentPlant = this.add.image(400, 400, 'plant1')
      this.currentPlant.setScale(0.3)
    } else {
      this.currentPlant.destroy()
      this.currentPlant = this.add.image(400, 400, plant)
      this.currentPlant.setScale(0.3)
    }

  }
  createHPBar() {
    this.hp = new HealthBar(this.scene.scene, 80, 80)
    this.hp.setValue(10)
    this.currentHP = this.add.text(80, 140, `HP: ${this.hp.value}`, {
      fill: "#000000"
    })
  }
  createWaterButton() {
      // water button
      this.waterButton = this.add.image(650, 80, 'waterButton')
      this.waterButton.setScale(0.5)

      this.waterButton.setInteractive()
      this.waterButton.on('pointerdown', () => {
        if (this.hp.value === 100) {
          return;
        }

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
    console.log("Level:", this.level)
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
    this.restartHPAfterLevel()
  }
  //new plant grows - destroy old plant so new plant renders
  restartHPAfterLevel() {
    this.restartHP = this.time.addEvent({
      delay: 3000,
      callback: () => {

        this.hp.value = 0
        this.hp.setValue(this.hp.value)
        this.changeHPText()

        // change plant when level increases
        switch (this.level) {
          case 2:
            this.createPlant('plant2')
            break;
          case 3:
            this.createPlant("plant3")
            break;
          case 4:
            this.createPlant("plant4")
            break;
          case 5:
            this.createPlant("plant5")
            break;
          case 6:
            this.createPlant("plant6")
            break;
        }

        // if (this.level === 2) {
        //   this.createPlant('plant2')
        // } else if (this.level === 3) {
        //   this.createPlant('plant3')
        // } else if (this.level === 4) {
        //   this.createPlant('plant4')
        // } else if (this.level === 5) {
        //   this.createPlant('plant5')
        // } else if (this.level === 6) {
        //   this.createPlant('plant6')
        // }

      }
    })
  }

}

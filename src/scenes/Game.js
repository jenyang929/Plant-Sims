/* globals __DEV__ */
import Phaser from 'phaser'
import HealthBar from './HealthBar'
import Sun from './Sun'
import Water from './Water'

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'GameScene' })
    this.level = 1
    this.isDisabled = false
  }
  init (){}
  preload () {
    let background = this.load.image('green', './assets/images/green.jpg')
    let waterButton = this.load.image('waterButton', './assets/images/button.png')
    let sun = this.load.image('sun', './assets/images/sun.png')
  }

  create () {
    this.createBackground()
    this.createPlant()
    this.createHPBar()
    this.createWater()
    this.createSun()
    this.createDustWind()
  }
   // if moisture and brightness === 10, increase HP by 25 HP. Reset moisture and brightness level = 0
  checkMoistureAndBrightness() {
      if (this.sun.brightness === 5 && this.water.moisture === 5) {
        this.hp.increase(50)
        this.changeHPText()
        this.resetMoistureAndBrightnessText()
      }
      if (this.hp.value === 100 && !this.isDisabled) {
        this.isDisabled = true
        this.increaseLevel()
        this.resetMoistureAndBrightnessText()
      }
  }
  resetMoistureAndBrightnessText() {
    this.water.moisture = 0
    this.water.changeMoistureText()
    this.sun.brightness = 0
    this.sun.changeBrightnessText()
  }
  createBackground () {
    //background
    this.bg = this.add.tileSprite(400, 300, 800, 600, 'background')
    //title of game
    this.add.text(220, 500, 'Plant Simulation Game', {
      font: '40px Bangers',
      fill: '#000000'
    })
  }
  createPlant () {
      this.currentPlant = this.add.image(400, 400, 'plant1')
      this.currentPlant.setScale(0.3)
  }
  createHPBar() {
    this.hp = new HealthBar(this.scene.scene, 80, 80)
    this.hp.setValue(10)
    this.currentHP = this.add.text(80, 140, `HP: ${this.hp.value}`, {
      fill: "#000000"
    })
  }
  createWater() {
      this.water = new Water (this.scene.scene, 650, 80, 'waterButton')
      this.water.waterButton.on('pointerdown', () => {
        if (this.isDisabled) {
          return
        }
        this.water.increaseMoisture()
        this.water.changeMoistureText()
        this.checkMoistureAndBrightness()
      })

  }
  createSun() {
    this.sun = new Sun(this.scene.scene, 650, 200, 'sun')
    this.sun.sunButton.on('pointerdown', () => {
      if (this.isDisabled) {
        return
      }
      this.sun.increaseBrightness()
      this.sun.changeBrightnessText()
      this.checkMoistureAndBrightness()
    })
  }
  createDustWind() {
      this.dustWind = this.time.addEvent({
      delay: 10000,
      callback: () => {
        this.decreaseHP()
        let dustText = this.add.text(400, 300, 'DUST WIND', {
          fill: '#00000'
        })
        this.destroyDust = this.time.addEvent({
          delay: 2000,
          callback: () => {
            if (dustText) {
              dustText.destroy()
            }
          }
        })
      },
      loop: true
    })
  }
  decreaseHP() {
    this.hp.decrease(5)
    this.changeHPText()
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

        this.hp.setValue(0)
        this.changeHPText()

        // change plant when level increases
        switch (this.level) {
          case 2:
            this.updatePlant('plant2')
            break;
          case 3:
            this.updatePlant("plant3")
            break;
          case 4:
            this.updatePlant("plant4")
            break;
          case 5:
            this.updatePlant("plant5")
            break;
          case 6:
            this.updatePlant("plant6")
            break;
        }
        this.isDisabled = false
      }
    })
  }
  updatePlant(plant) {
    this.currentPlant.destroy()
    this.currentPlant = this.add.image(400, 400, plant)
    this.currentPlant.setScale(0.3)
  }
}

import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'BootScene' })
  }

  preload () {
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
    this.add.text(100, 100, 'loading fonts...')

    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')
    this.load.image('background', './assets/images/green.jpg')
    this.load.image('plant1', 'assets/images/plant1.png')
    this.load.image('plant2', 'assets/images/plant2.png')
    this.load.image('plant3', 'assets/images/plant3.png')
    this.load.image('plant4', 'assets/images/plant4.png')
    this.load.image('plant5', 'assets/images/plant5.png')
    this.load.image('plant6', 'assets/images/plant6.png')

    WebFont.load({
      google: {
        families: ['Bangers']
      },
      active: this.fontsLoaded
    })
  }

  update () {
    if (this.fontsReady) {
      this.scene.start('SplashScene')
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}

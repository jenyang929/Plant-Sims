import Phaser from 'phaser'

export default class Sun {
  constructor (scene, x, y, image) {
    this.x = x
    this.y = y
    this.brightness = 0
    this.scene = scene
    this.create()
  }
  preload() {
    // let sun = this.load.image('sun', './assets/images/sun.png')
  }
  create () {
    this.sun = this.add.image(this.x, this.y, 'sun')
  }
  increaseBrightness () {
    this.brightness++
    if (this.brightness >= 10) {
      return
    }
  }
}

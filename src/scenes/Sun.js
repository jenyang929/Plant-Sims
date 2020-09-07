import Phaser from 'phaser'

export default class Sun {
  constructor (scene, x, y, image) {
    this.x = x
    this.y = y
    this.image = image
    this.scene = scene
    this.brightness = 0
    this.create()
  }
  preload() {
    let sun = this.scene.load.image(this.image, './assets/images/sun.png')
  }
  create () {
    this.createSunButton()
    this.createBrightnessText()
  }
  createSunButton() {
    this.sunButton = this.scene.add.image(this.x, this.y, this.image)
    this.sunButton.setScale(0.5)
    this.sunButton.setInteractive()
    this.sunButton.on('pointerdown', () => {
      this.increaseBrightness()
      this.changeBrightnessText()
    })
  }
  createBrightnessText() {
    this.brightnessText = this.scene.add.text(80, 200, `brightness level: ${this.brightness}`, {
      fill: '#000000'
    })
  }
  changeBrightnessText() {
    this.brightnessText.setText(`brightness level: ${this.brightness}`)
  }
  increaseBrightness () {
    if (this.brightness >= 10) {
      return
    } else {
      this.brightness++
    }
  }
}

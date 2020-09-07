import Phaser from 'phaser'

export default class Water {
  constructor (scene, x, y, image) {
    this.x = x
    this.y = y
    this.scene = scene
    this.image = image
    this.moisture = 0
    this.create()
  }
  preload () {
    let water = this.load.image(this.image, './assets/images/button.png')
  }
  create() {
    this.createWaterButton()
    this.createMoistureText()
  }
  createWaterButton() {
    this.waterButton = this.scene.add.image(650, 80, this.image)
    this.waterButton.setScale(0.5)
    this.waterButton.setInteractive()
  }
  createMoistureText() {
    this.moistureText = this.scene.add.text(80, 230, `moisture level: ${this.moisture}`, {
      fill: '#000000'
    })
  }
  increaseMoisture() {
    if (this.moisture >= 5) {
      return
    } else {
      this.moisture++
    }
  }
  changeMoistureText() {
    this.moistureText.setText(`moisture level: ${this.moisture}`)
  }
}

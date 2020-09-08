import Phaser from 'phaser'

// create waterbutton, refactor water in game.js
// createmoisturetext && changemoisturetext


export default class Water {
  constructor (scene, x, y, image) {
    this.x = x
    this.y = y
    this.image = image
    this.scene = scene
    this.moisture = 0
    this.create()
  }
  preload() {}
  create() {
    this.createWaterButton()
    this.createMoistureText()
  }
  createWaterButton() {
    this.waterButton = this.scene.add.image(this.x, this.y, this.image)
    this.waterButton.setScale(0.5)
    this.waterButton.setInteractive()
  }
  createMoistureText() {
    this.moistureText = this.scene.add.text(80, 230, `moisture level: ${this.moisture}`, {
      fill: '#000000'
    })
  }
  changeMoistureText() {
    this.moistureText.setText(`moisture level: ${this.moisture}`)
  }
  increaseMoisture() {
    if (this.moisture >= 5) {
      return
    } else {
      this.moisture++
    }
  }
}

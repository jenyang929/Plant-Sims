
import Phaser from 'phaser'

export default class HealthBar {
  constructor (scene, x, y) {
    this.x = x;
    this.y = y;
    this.value = 0;
    this.scene = scene;
    this.create();
  }
  preload () {}
  create () {
    this.bar = this.makeBar(this.x, this.y, 0x2ecc71)
    this.setValue(this.bar, 100)
  }
  increase (amount) {
    this.value += amount
    if (this.value > 100) {
      this.value = 100
    }
  }

  makeBar (x, y, color) {
    // draw the bar
    let bar = this.scene.add.graphics()

    // color the bar
    bar.fillStyle(color, 1)

    // fill the bar with a rectangle
    bar.fillRect(0, 0, 200, 50)

    // position the bar
    bar.x = x
    bar.y = y

    // return the bar
    return bar
  }
  setValue (percentage) {
    // scale the bar
    this.bar.scaleX = percentage / 100
  }
  update () {}
}



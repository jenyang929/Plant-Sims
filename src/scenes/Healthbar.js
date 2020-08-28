
import Phaser from 'Phaser'

export default class Healthbar {
  constructor (scene, x, y) {
    this.x = x;
    this.y = y;
    this.value = 10;
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
  decrease (amount) {
    this.value -= amount
    if (this.value < 0) {
      this.value = 0;
    }
  }
  makeBar (x, y, color) {
    // draw the bar
    console.log(this.scene)
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

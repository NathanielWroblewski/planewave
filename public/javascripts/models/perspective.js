import Camera from './cam.js'
import FourByFour from './four_by_four.js'

class Perspective extends Camera {
  constructor (options = {}) {
    super(options)

    this.fov = options.fov // radians

    this.update()
  }

  update () {
    const aspect = this.width / this.height

    this.projection = FourByFour.perspective({
      fov: this.fov,
      aspect,
      near: Math.abs(this.near),
      far: Math.abs(this.far)
    })

    this.view = FourByFour.lookAt({
      position: this.position,
      direction: this.position.add(this.direction),
      up: this.up
    })

    this.combined = this.projection.multiply(this.view)

    this.invProjectionView = this.combined.invert()
  }
}

export default Orthographic

import Camera from './cam.js'
import FourByFour from './four_by_four.js'

class Orthographic extends Camera {
  constructor (options = {}) {
    super(options)

    this.zoom = options.zoom || 1
    this.near = 0

    this.update()
  }

  update () {
    const near = Math.abs(this.near)
    const far = Math.abs(this.far)
    const halfWidth = this.width / 2
    const halfHeight = this.height / 2

    this.projection = FourByFour.ortho({
      left:   this.zoom * -halfWidth,
      right:  this.zoom *  halfWidth,
      top:    this.zoom * -halfHeight,
      bottom: this.zoom *  halfHeight,
      near,
      far
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

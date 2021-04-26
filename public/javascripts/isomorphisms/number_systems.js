import Vector from '../models/vector.js'
import Quaternion from '../models/quaternion.js'

const numberSystem = {
  toPoint (quaternion) {
    const y0 = quaternion.r
    const normSquared = (2 / (1 - y0)) - 1
    const scale = Math.sqrt(normSquared / (1 - (y0 * y0)))

    return quaternion.vector.multiply(scale)
  },

  toQuaternion (point) {
    const x0Squared = point.magnitude
    const y0 = 1 - (2 / (1 + x0Squared))
    const scale = Math.sqrt((1 - (y0 * y0)) / x0Squared)

    return new Quaternion(Vector.from([y0, ...point.multiply(scale)]))
  }
}

export default numberSystem

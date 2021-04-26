// import Vector from './vector.js'
// import Vector4D from './vector4D.js'
// import numberSystems from '../isomorphisms/number_systems.js'

// class Camera {
//   constructor ({ position, clip, limits, spherical, context }) {
//     this.position = position || Vector.from([0, 0, 5])
//     this.clip = clip || Vector.from([100, -100]) // near, far clipping planes
//     this.limits = limits || Vector.from([
//       Math.abs(this.clip[0]) * Math.sqrt(3), // x limit of the projecting screen
//       Math.abs(this.clip[0]) // y limit of the projecting screen
//     ])
//     this.canvasLimits = Vector.from([
//       context.canvas.width / 2,
//       context.canvas.height / 2
//     ])
//     this.spherical = spherical || Vector.from([0, 0, 0]) // (r,θ,φ)
//     this.context = context
//   }

//   // The ratio of the real y to the projected y is:
//   // yproj / n = y / z => yproj = (n/z) y
//   project ([x, y, z]) {
//     const [near, far] = this.clip

//     if (z < near && z > far) {
//       return Vector.from([x * (near / z), y * (near / z) + 20, z])
//     }
//   }

//   snap (point) {
//     // Translate camera
//     const translated = point.subtract(this.position)

//     // Rotate camera
//     const θaxis = Vector.from([0, 1, 0])
//     const φaxis = Vector.from([-1, 0, 0])
//     const rotated = point.rotate(θaxis, this.spherical.θ).rotate(φaxis, this.spherical.φ)
//     const projected = this.project(rotated)

//     if (!projected) return null // behind camera

//     // transform world coordinates to canvas coordinates
//     return Vector.from([
//       ((projected.x / (this.limits.x * 2)) * this.canvasLimits.x * 2) + this.canvasLimits.x,
//       ((-projected.y / (this.limits.y * 2)) * this.canvasLimits.y * 2) + this.canvasLimits.y
//     ])
//   }
// }

// export default Camera

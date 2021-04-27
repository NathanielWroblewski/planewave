import Vector from './models/vector.js'
import FourByFour from './models/four_by_four.js'
import Camera from './models/orthographic.js'
import angles from './isomorphisms/angles.js'
import renderCircle from './views/circle.js'
import renderLine from './views/line.js'
import { seed, noise } from './utilities/noise.js'
import { remap, grid } from './utilities/index.js'
import { COLORS, GREYS } from './constants/colors.js'
import { GRID_WIDTH } from './constants/dimensions.js'

// Copyright (c) 2020 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

const canvas = document.querySelector('.canvas')
const context = canvas.getContext('2d')

const perspective = FourByFour
  .identity()
  .rotX(angles.toRadians(20))
  .rotY(angles.toRadians(40))

const from = Vector.from([-100, -100])
const to = Vector.from([100, 100])
const by = Vector.from([4, 4])

const particles = grid({ from, to, by }, ([x, z]) => (
  Vector.from([x, 0, z]).transform(perspective)
))

const camera = new Camera({
  position: Vector.from([0,0,0]),
  direction: Vector.zeroes(),
  up: Vector.from([0, 1, 0]),
  width: canvas.width,
  height: canvas.height,
  zoom: 0.5
})

seed(Math.random())

// Render loop

let time = 0

const step = () => {
  context.clearRect(0, 0, canvas.width, canvas.height)

  const neighbors = []

  // render in reverse order and paint the bottom plane first so that the top
  // particles will overlap the bottom lines where the grids overlap
  for (let index = particles.length - 1; index > -1; index--) {
    const particle = particles[index]
    const yOffset = 40

    // render bottom plane
    const bottomResolution = 0.005
    const bottomDelta = 3 * Math.sin(21 * noise(particle.x * bottomResolution, particle.y * bottomResolution, time))
    const bottomAdjusted = particle.add(Vector.from([0, -yOffset + bottomDelta, 0]))
    const bottomProjected = camera.project(bottomAdjusted)

    if (bottomProjected) {
      neighbors.push(bottomProjected)

      const colorIndex = Math.floor(remap(yOffset + bottomAdjusted.y - particle.y, [-3, 3], [0, GREYS.length]))
      const color = GREYS[colorIndex]
      const neighbor = neighbors[particles.length - 1 - index - GRID_WIDTH]

      if (neighbor) {
        renderLine(context, bottomProjected, neighbor, color)
      }

      // uncomment to render the complimentary/orthogonal grid lines
      // const next = neighbors[particles.length - 1 - index - 1]

      // if (next && index % GRID_WIDTH !== GRID_WIDTH - 1) {
      //   renderLine(context, bottomProjected, next, color)
      // }
    }

    // render top plane
    const topResolution = 0.01
    const topDelta = 12 * noise(particle.x * topResolution, particle.z * topResolution, time)
    const topAdjusted = particle.add(Vector.from([0, yOffset + topDelta, 0]))
    const topProjected = camera.project(topAdjusted)

    if (topProjected) {
      const colorIndex = Math.floor(remap(topAdjusted.y - particle.y - yOffset, [-10, 10], [0, COLORS.length]))
      const color = COLORS[colorIndex]

      renderCircle(context, topProjected, 0.5, color, color)
    }
  }

  time += 0.02
  window.requestAnimationFrame(step)
}

window.requestAnimationFrame(step)

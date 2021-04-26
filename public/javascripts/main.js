import Ziggurat from './models/ziggurat.js'
import Vector from './models/vector.js'
import FourByFour from './models/four_by_four.js'
import Camera from './models/orthographic.js'
import Particle from './models/particle.js'
import coordinates from './isomorphisms/coordinates.js'
import numberSystems from './isomorphisms/number_systems.js'
import renderCircle from './views/circle.js'
import renderLine from './views/line.js'
import { seed, noise } from './utilities/noise.js'
import { BLUE } from './constants/colors.js'
import {
  SPHERE_RADIUS, WIDTH, HEIGHT, HALF_WIDTH, HALF_HEIGHT,
  PARTICLE_RADIUS, RESOLUTIONS
} from './constants/dimensions.js'

// Copyright (c) 2020 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

const canvas = document.querySelector('.canvas')
const context = canvas.getContext('2d')

const GRID_WIDTH = 50
const GRID_HEIGHT = 50
const GRID_OFFSET = 4
const PARTICLE_COUNT = GRID_WIDTH * GRID_HEIGHT

const DEG45 = 45 * Math.PI/180

const toRad = degrees => degrees * Math.PI/180

const transform = FourByFour.identity().rotX(toRad(20)).rotY(toRad(40))

// Initialize
const particles = []

for (let z = -GRID_HEIGHT/2; z <= GRID_HEIGHT/2; z++) {
  for (let x = -GRID_WIDTH/2; x <= GRID_WIDTH/2; x++) {
    const particle = Vector.from([x * GRID_OFFSET, 0, z * GRID_OFFSET]).transform(transform)

    particles.push(particle)
  }
}


const camera = new Camera({
  position: Vector.from([0,0,0]),
  direction: Vector.zeroes(),
  up: Vector.from([0, 1, 0]),
  width: canvas.width,
  height: canvas.height,
  zoom: 0.5
})

seed(Math.random())

context.strokeStyle = BLUE
context.fillStyle = BLUE

// Render loop

let time = 0
const resolution = 0.01

const step = () => {
  context.clearRect(0, 0, WIDTH, HEIGHT)

  particles.forEach(particle => {
    const adjusted = particle.add(Vector.from([
      0,
       Math.sin(noise(particle.x * resolution, particle.z * resolution, time)) * 12,
      0,
    ]))

    const cartesian = camera.project(adjusted)

    if (cartesian) {
      renderCircle(context, cartesian, 0.5, BLUE, BLUE)
    }

    // color the peaks and the troughs
  })

  time += 0.02
  window.requestAnimationFrame(step)
}

window.requestAnimationFrame(step)

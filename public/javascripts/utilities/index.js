import Vector from '../models/vector.js'

// Copyright (c) 2020 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

export const remap = (value, [oldmin, oldmax], [newmin, newmax]) => {
  return newmin + (newmax - newmin) * (value - oldmin) / (oldmax - oldmin)
}

export const grid = ({ from, to, by }, fn) => {
  const results = []

  for (let row = from.x; row !== to.x + by.x; row += by.x) {
    for (let column = from.y; column !== to.y + by.y; column += by.y) {
      results.push(fn(Vector.from([row, column])))
    }
  }

  return results
}

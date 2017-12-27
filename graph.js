const linAlg = require('linear-algebra')()

Array.prototype.flatMap = function(lambda) { 
    return Array.prototype.concat.apply([], this.map(lambda));
}

function toIdentitySet(preferenceArray) { // [{a_id, b_id, winner}]
  const idArray = preferenceArray.flatMap(p => [p.a_id, p.b_id])
  return new Set(idArray)
}

function toMatrix(preferenceArray) { // [{a_id, b_id, winner}]
  const idSet = toIdentitySet(preferenceArray)
  const idMap = new Map(Array.from(idSet).sort().map((id, ix) => [id, ix]))
  const n = idMap.size
  const matrix = linAlg.Matrix.zero(n, n)

  // Calculate the off-diagonals
  preferenceArray.forEach(p => {
    let [winner, loser] = (p.winner == 0) ? [p.a_id, p.b_id] : [p.b_id, p.a_id]
    let [winner_ix, loser_ix] = [idMap.get(winner), idMap.get(loser)]
    matrix.data[loser_ix][winner_ix] += 1
  })

  // Add the diagonals (sums of columns)
  matrix.trans().data.map((col, ix) =>
    matrix.data[ix][ix] = col.reduce((sum, val) => sum + val, 0)
  )

  return matrix
}

exports.toIdentitySet = toIdentitySet
exports.toMatrix = toMatrix

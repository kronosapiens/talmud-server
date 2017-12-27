const linAlg = require('linear-algebra')()

Array.prototype.flatMap = function(lambda) { 
    return Array.prototype.concat.apply([], this.map(lambda));
}

function toIdentitySet(preferenceArray) { // [{a_id, b_id, winner}]
  const idArray = preferenceArray.flatMap(p => [p.a_id, p.b_id])
  return new Set(idArray)
}

function toMatrix(preferenceArray) { // [{a_id, b_id, winner}]
  const identitySet = toIdentitySet(preferenceArray)
  const identityMap = new Map(Array.from(identitySet).sort().map((id, ix) => [id, ix]))
  const n = identityMap.size
  const matrix = linAlg.Matrix.zero(n, n)

  preferenceArray.forEach(p => {
    let [winner, loser] = (p.winner == 0) ? [p.a_id, p.b_id] : [p.b_id, p.a_id]
    let [winner_ix, loser_ix] = [identityMap.get(winner), identityMap.get(loser)]
    matrix.data[loser_ix][winner_ix] += 1
  })
  return matrix
}

exports.toIdentitySet = toIdentitySet
exports.toMatrix = toMatrix
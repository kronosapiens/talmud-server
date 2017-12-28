const assert = require('assert')

describe('graphs.js', function() {
  const graph = require('../src/graph')
  const linAlg = require('linear-algebra')()

  describe('#toIdentitySet()', function() {
    it('should convert an array of preferences to a set of identities', function() {
      const preferences = [
        {'a_id': 0, 'b_id': 1},
        {'a_id': 1, 'b_id': 3},
      ]
      const identitySet = graph.toIdentitySet(preferences)
      assert.deepEqual(identitySet, new Set([0, 1, 3]))
    })
  })

  describe('#toMatrix()', function() {
    it('should convert an array of preferences to a preference graph', function() {
      const preferences = [
        {'a_id': 0, 'b_id': 1, 'winner': 0},
        {'a_id': 0, 'b_id': 3, 'winner': 1},
      ]
      const matrix = graph.toMatrix(preferences)
      assert.deepEqual(matrix, new linAlg.Matrix([[1, 0, 1], [1, 0, 0], [0, 0, 1]]))
    })
  })

  describe('#powerMethod()', function() {
    it('should find the principal eigenvector of the matrix', function() {
      const matrix = new linAlg.Matrix([[1, 0], [1, 0]])
      const eigenvector = graph.powerMethod(matrix)
      assert.deepEqual(eigenvector, new linAlg.Matrix([1, 0]))
    })
    it('should find the principal eigenvector of the matrix', function() {
      const matrix = new linAlg.Matrix([[1, 1], [1, 1]])
      const eigenvector = graph.powerMethod(matrix)
      assert.deepEqual(eigenvector, new linAlg.Matrix([.5, .5]))
    })
  })

})

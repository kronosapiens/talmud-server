const db = require('../src/db')

async function seedIdentities () {
  await db.saveIdentityP('Human')
  await db.saveIdentityP('Animal')

  await db.saveIdentityP('Gender') // Pivot on gender

  await db.saveIdentityP('Parent') // Pivot on gender
  await db.saveIdentityP('Sibling') // Pivot on gender
  await db.saveIdentityP('Child') // Pivot on gender

  await db.saveIdentityP('Progressive')
  await db.saveIdentityP('Conservative')

  await db.saveIdentityP('Patriot')
  await db.saveIdentityP('Radical')

  await db.saveIdentityP('Friend') // Pivot on profession

  await db.saveIdentityP('Friend')
  await db.saveIdentityP('Colleague')

  await db.saveIdentityP('Religion') // Pivot on religion

  await db.saveIdentityP('Ethnicity') // Pivot on ethnicity

  await db.saveIdentityP('Spiritual')
  await db.saveIdentityP('Athiest')

  await db.saveIdentityP('Materialist')
  await db.saveIdentityP('Idealist')
}

seedIdentities()

/* eslint-disable global-require */
import { mongoose } from '<%= modelPackageName %>'
import { db } from './config'
import chai from 'chai'

import app from './app'

export function setUpAndTearDown(initialData) {
  before(async () => {
    mongoose.connect(db.host)

    if (initialData) {
      for (const item of initialData) {
        const Model = mongoose.model(item.schemaName)
        await Model.ensureIndexes()
        await Model.create(item.entities)
      }
    }
  })

  after((done) => {
    mongoose.connection.db.dropDatabase()
    mongoose.connection.close(done)
  })
}

export const request = require('supertest').agent(app.listen())

chai.use(require('chai-things'))
export const expect = chai.expect

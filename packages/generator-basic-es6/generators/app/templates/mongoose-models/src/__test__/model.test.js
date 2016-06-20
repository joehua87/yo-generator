import mongoose from 'mongoose'
import { expect } from 'chai'
import * as createModelFunc from '../index'

const dbHost = process.env.DB_HOST || 'localhost/test'

describe('Models', () => {
  let connection
  it('connect to MongoDb', () => {
    connection = mongoose.createConnection(dbHost)
  })

  const createFns = Object.keys(createModelFunc).filter(name => name.match(/^create/))
  for (const createFn of createFns) {
    it(createFn, async() => { // eslint-disable-line
      const Model = createModelFunc[createFn](connection)
      expect(Model.modelName).to.equal(createFn.replace(/^create/, '').replace(/Model$/, ''))
      const items = await Model.find({}).lean()
      expect(items).to.deep.equal([])
    })
  }
})

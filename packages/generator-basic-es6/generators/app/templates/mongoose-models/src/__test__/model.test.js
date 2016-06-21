import { expect } from 'chai'
import * as all from '../index'

const { mongoose, ...models } = all
const dbHost = process.env.DB_HOST || 'localhost/test'

describe('Models', () => {
  it('connect to MongoDb', () => {
    mongoose.connect(dbHost)
  })

  const modelList = Object.keys(models).map((modelName) => models[modelName])
  for (const model of modelList) {
    it(model.schemaName, async() => { // eslint-disable-line
      const { Model } = model
      expect(Model.modelName).to.equal(model.schemaName)
      const items = await Model.find({}).lean()
      expect(items).to.deep.equal([])
    })
  }
})

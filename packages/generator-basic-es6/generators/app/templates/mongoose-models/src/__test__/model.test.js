import mongoose from 'mongoose'
import { expect } from 'chai'
import * as models from '../index'

describe('Models', () => {
  const createFns = Object.keys(models).filter(name => name.match(/^create/))
  for (const createFn of createFns) {
    it(createFn, () => {
      const Model = models[createFn](mongoose)
      expect(Model.modelName).to.equal(createFn.replace(/^create/, '').replace(/Model$/, ''))
    })
  }
})

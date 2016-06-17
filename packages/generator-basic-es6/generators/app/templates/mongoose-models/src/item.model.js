import { Schema } from 'mongoose'
import timePlugin from 'mongoose-time-plugin'

const schemaName = 'Item'
export const schema = new Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
}, { collection: schemaName })

schema.plugin(timePlugin)
schema.index({
  code: 1,
})

export default (mongoose) => mongoose.model(schemaName, schema)

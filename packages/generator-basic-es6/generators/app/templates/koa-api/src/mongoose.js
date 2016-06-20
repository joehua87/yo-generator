import mongoose from 'mongoose'
import { db } from './config'

export default mongoose.createConnection(db.host)

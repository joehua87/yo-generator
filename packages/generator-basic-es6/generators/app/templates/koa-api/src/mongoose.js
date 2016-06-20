import mongoose, { Schema } from 'mongoose'
import { db } from './config'

const connection = mongoose.createConnection(db.host)
connection.Schema = Schema

export default connection

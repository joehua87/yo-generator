import Promise from 'bluebird'
import m from 'mongoose'
m.Promise = Promise
export const mongoose = m
// Add export here

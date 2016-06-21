/* eslint-disable camelcase */

const websiteHost = process.env.DB_HOST || 'mongodb://localhost/default-db'

export const db = {
  host: websiteHost,
  username: '',
  password: ''
}

export const secret = 'your-secret'
export const env = process.env.NODE_ENV
export const port = process.env.PORT || 3100
export const sentryDns = process.env.SENTRY_DNS

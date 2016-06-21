import { request, setUpAndTearDown } from '../config-test'
import { expect } from 'chai'

const routes = [
]

describe('Api', () => {
  setUpAndTearDown()

  describe('Cannot routes without token', () => {
    routes.forEach(route => {
      it(`${route} route should work`, done => {
        request.get(`/${route}/query`)
          .expect(401)
          .end(done)
      })
    })
  })

  let token

  describe('Get token', () => {
    it('fail', (done) => {
      request.post('/login')
        .type('form')
        .send({ username: 'admin', password: 'wrong' })
        .expect(401)
        .end(done)
    })

    it('success', (done) => {
      request.post('/login')
        .type('form')
        .send({ username: 'admin', password: 'password' })
        .expect(200)
        .expect(response => {
          expect(response.body.token).to.be.a('string')
          token = response.body.token
        })
        .end(done)
    })
  })

  describe('Routes', () => {
    routes.forEach(route => {
      it(`${route} route should work`, done => {
        request.get(`/${route}/query`)
          .set('Authorization', `bearer ${token}`)
          .expect(200)
          .expect(response => {
            expect(response.body.count).to.equal(0)
            expect(response.body.entities).to.deep.equal([])
          })
          .end(done)
      })
    })
  })
})

require('dotenv').config()
const app = require('../server.js')
const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = chai.assert
// const agent = chai.request.agent(app)

const User = require('../models/user.js')
const Message = require('../models/message.js')

chai.config.includeStack = true

const expect = chai.expect
const should = chai.should
chai.use(chaiHttp)

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {}
  mongoose.modelSchemas = {}
  mongoose.connection.close()
  done()
})

let SAMPLE_OBJECT_ID = '1234567890'
let SAMPLE_OBJECT_ID_2 = '0987654321'

describe('Message API endpoints', () => {
    const user = {
        username: 'Logan',
        password: '000'
      };

    beforeEach((done) => {
        const message1 = new Message({
            title:"Some Title",
            body: 'Some body',
            author: user._id,
            _id: SAMPLE_OBJECT_ID
        })
        user.save().then(
            sampleMessage.save()
            .then(messages=> SAMPLE_OBJECT_ID=message._id)
        ).then(
            done()
        ).catch(err => {
            console.log(err)
        })
        
    })

    afterEach((done) => {
        User.deleteMany({ username: ['Logan']}).then(() =>{
            Message.deleteMany({ title: "Some Title"})
            .then(() =>{
                done()
            })
        })
        
    })

    it('should load all messages', (done) => {
        chai.request(app)
            .get('messages')
            .end((err, res) => {
                if (err) { done(err) }
                expect(res).to.have.status(200)
                expect(res.body.message).to.be.an("array")
                done()
        })
    })

    it('should get one specific message', (done) => {
        chai.request(app)
        .get(`/messages/${SAMPLE_OBJECT_ID_2}`)
        .end((err, res) => {
            if (err) { done(err) }
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body.title).to.equal("Some Title")
            expect(res.body.body).to.equal('Some body')
            expect(res.body.author).to.equal(SAMPLE_OBJECT_ID)
            done()
    })

    it('should post a new message', (done) => {
        chai.request(app)
        .post('/messages')
        .send({title: "Some Title", body: 'Some body', author: SAMPLE_OBJECT_ID})
        .end((err, res) => {
            if (err) { done(err) }
            expect(res).to.have.status(200)
            done()
            })
        })
    })

    it('should update a message', (done) => {
        chai.request(app)
        .put(`/messages/${SAMPLE_OBJECT_ID_2}`)
        .send({title: "Some Title", body: 'Some body', author: SAMPLE_OBJECT_ID})
        .end((err, res) => {
            if (err) { done(err) }
            expect(res).to.have.status(200)
            done()
        })
    })

    it('should delete a message', (done) => {
        chai.request(app)
        .delete(`/messages/${SAMPLE_OBJECT_ID_2}`)
        .end((err, res) => {
            if (err) { done(err) }
            expect(res).to.have.status(200)
            done()
        })
    })
})

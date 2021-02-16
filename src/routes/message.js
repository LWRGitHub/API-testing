const express = require('express')
const router = express.Router();

const User = require('../models/user')
const Message = require('../models/message')

/** Route to get all messages. */
router.get('/', (req, res) => {
    return Message.find()
})

/** Route to get one message by id. */
router.get('/:messageId', (req, res) => {
    return Message.findOne(req.params.id)
})

/** Route to add a new message. */
router.post('/', (req, res) => {
    let message = new Message(req.body)
    message.save()
    .then(message => {
        return User.findById(message.author)
    })
    .then(user => {
        // console.log(user)
        user.messages.unshift(message)
        return user.save()
    })
    .then(() => {
        return res.send(message)
    }).catch(err => {
        throw err.message
    })
})

/** Route to update an existing message. */
router.put('/:messageId', (req, res) => {
    return Message.findByIdAndUpdate(req.params.id)
})

/** Route to delete a message. */
router.delete('/:messageId', (req, res) => {
    Message.findByIdAndDelete(req.params.id)
    return User.findByIdAndDelete(req.params.id)

})

module.exports = router
const express = require('express')
const uuid = require('uuid')
const router = express.Router()
const members = require('../../Members')



// Gets all members:
router.get('/', (req, res) => {
    res.json(members)
})

// Get single member:
router.get('/:id', (req, res) => {
    const validMember = members.some(member => member.id === parseInt(req.params.id))
    if (validMember){
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({msg: `Member ID ${req.params.id} does not exist`})
    }
}) 

// Create Member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.name || !newMember.email) {
        return res.status(400).json({msg: 'Bad request, Name and email are required.'})
    }

    members.push(newMember)
    res.json(members)
})

// Update Member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if (found){
        const updateMember = req.body
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)){
                members.name = updateMember.name ? updateMember.name : member.name
                members.email = updateMember.email ? updateMember.email : member.email

                res.json({msg: 'Member updated', member})
            }
        })
    } else {
        res.status(400).json({msg: `Member ID ${req.params.id} does not exist`})
    }
}) 

module.exports = router;
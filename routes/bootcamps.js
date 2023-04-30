const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.send('showing all bootCamps')
})

router.get('/:id', (req, res) => {
    let id = req.params.id
    res.send('showing bootcamp' + id)
})

router.post('/', (req, res) => {
    res.send('posting a bootcamp')
})

router.put('/:id', (req, res) => {
    res.send(`updating bootcamp with id: ${req.params.id}`)
})

router.delete('/:id', (req, res) => {
    res.send(`deleting bootcamp with id: ${req.params.id}`)
})

module.exports = router

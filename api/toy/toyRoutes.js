const express = require('express')
const { getToys, getToy, addToy, updateToy, removeToy } = require('./toyController')

const router = express.Router()

router.get('/', getToys)
router.post('/', addToy)
router.put('/:id', updateToy)
router.get('/:id', getToy)
router.delete('/:id', removeToy)


module.exports = router
const express = require('express');
const router = express.Router();
const crypto = require('crypto')


// Store receipts as an array of receipt objects. In a real scenario, this would be replaced by a database.
const receipts = []

/* takes in JSON receipt as request body and returns its ID as JSON */
router.post('/process', function(req, res, next) {
    const receipt = req.body

    // Create a 32 character string, base 16
    let id = crypto.randomBytes(32).toString('hex')

    // Check if it's already been used as an id, and redo if so
    receipts.forEach(receipt => {
        if (receipt.id === id) {
            id = crypto.randomBytes(32).toString('hex')
        }
    })

    // Add receipt to receipts array (database in real scenario) with id as key
    receipts.push({id, receipt})

    // Return the id of the processed receipt
    res.json({
        id
    })
})


// returns number of points a receipt with id is worth and returns as JSON
router.get('/:id/points', function(req, res, next) {
    res.json({
        message: 'points'
    })
})

module.exports = router;
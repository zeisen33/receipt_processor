const express = require('express');
const router = express.Router();

/* GET receipts */
router.get('/', function(req, res, next) {
  res.json({
    message: "GET /receipts"
  });
});

module.exports = router;
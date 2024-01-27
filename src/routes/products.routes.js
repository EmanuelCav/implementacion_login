const { Router } = require('express');

const { upload } = require('../lib/images');

const { products, productGet, productCreate, productUpdate, productDelete } = require('../controller/products.ctrl');

const router = Router()

router.get('/api/products', products)
router.get('/api/products/:pid', productGet)

router.post('/api/products', upload.array("files", 10), productCreate)

router.put('/api/products/:pid', productUpdate)

router.delete('/api/products/:pid', productDelete)

module.exports = router


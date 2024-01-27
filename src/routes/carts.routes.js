const { Router } = require('express');

const { createCart, getCart, addProductCart, removeProductCart, quantityProductCart, removeAllProducts } = require('../controller/carts.ctrl');

const router = Router()

router.post('/api/carts', createCart)

router.get('/api/carts/:cid', getCart)

router.patch('/api/carts/:cid/products/:pid', addProductCart)

router.delete('/api/carts/:cid/products/:pid', removeProductCart)
router.delete('/api/carts/:cid', removeAllProducts)

router.put('/api/carts/:cid/products/:pid', quantityProductCart)

module.exports = router
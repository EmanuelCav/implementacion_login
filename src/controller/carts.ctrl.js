const Cart = require('../model/cart')
const ProductCart = require('../model/productCart')
const Product = require('../model/product')

const createCart = async (req, res) => {

    try {

        const newCart = await new Cart()

        const cartSaved = await newCart.save()

        return res.status(200).json({
            message: "Cart added successfully",
            cart: cartSaved
        })

    } catch (error) {
        return res.status(500).json(error.message)
    }

}

const getCart = async (req, res) => {

    const { cid } = req.params

    const cart = await Cart.findById(cid).populate({
        path: "products",
        populate: {
            path: "product"
        }
    })

    if (!cart) {
        return res.status(400).json({ message: "Cart does not exists" })
    }

    return res.status(200).json(cart)

}

const addProductCart = async (req, res) => {

    const { quantity } = req.body
    const { cid, pid } = req.params

    const cart = await Cart.findById(cid).populate({
        path: "products",
        populate: {
            path: "product"
        }
    })

    if (!cart) {
        return res.status(400).json({ message: "Cart does not exists" })
    }

    const product = await Product.findById(pid)

    if (!product) {
        return res.status(400).json({ message: "Product does not exists" })
    }

    const newProductCart = new ProductCart({
        quantity,
        cart: cid,
        product: pid
    })

    const productCartSaved = await newProductCart.save()

    const productAdded = await Cart.findByIdAndUpdate(cid, {
        $push: {
            products: productCartSaved._id
        }
    }, {
        new: true
    }).populate({
        path: "products",
        populate: {
            path: "product"
        }
    })

    return res.status(200).json({
        message: "Product added successfully",
        cart: productAdded
    })
}

const removeProductCart = async (req, res) => {

    const { cid, pid } = req.params

    const cart = await Cart.findById(cid)

    if (!cart) {
        return res.status(400).json({ message: "Cart does not exists" })
    }

    const product = await ProductCart.findById(pid)

    if (!product) {
        return res.status(400).json({ message: "Product does not exists" })
    }

    await Cart.findByIdAndUpdate(cid, {
        $pull: {
            products: product._id
        }
    }, {
        new: true
    })

    await ProductCart.findByIdAndDelete(pid)

    return res.status(200).json({
        message: "Product removed successfully"
    })

}

const quantityProductCart = async (req, res) => {

    const { cid, pid } = req.params
    const { quantity } = req.body

    const product = await ProductCart.findById(pid)

    if (!product) {
        return res.status(400).json({ message: "Product does not exists" })
    }

    await ProductCart.findByIdAndUpdate(pid, {
        quantity
    }, {
        new: true
    })

    const cart = await Cart.findById(cid).populate({
        path: "products",
        populate: {
            path: "product"
        }
    })

    if (!cart) {
        return res.status(400).json({ message: "Cart does not exists" })
    }

    return res.status(200).json({
        message: "Quantity updated successfully",
        cart
    })

}

const removeAllProducts = async (req, res) => {

    const { cid } = req.params

    const cart = await Cart.findById(cid)

    if (!cart) {
        return res.status(400).json({ message: "Cart does not exists" })
    }

    await ProductCart.deleteMany({
        cart: cid
    })

    await Cart.findByIdAndUpdate(cid, {
        $set: {
            products: []
        }
    }, {
        new: true
    }).populate({
        path: "products",
        populate: {
            path: "product"
        }
    })

    return res.status(200).json({
        message: "Products removed successfully"
    })

}

module.exports = {
    createCart,
    getCart,
    addProductCart,
    removeProductCart,
    quantityProductCart,
    removeAllProducts
}
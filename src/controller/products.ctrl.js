const Product = require('../model/product')

const products = async (req, res) => {

    const { limit } = req.query

    try {

        const products = await Product.find().limit(limit)

        return res.status(200).json(products)

    } catch (error) {
        return res.status(500).json(error.message)
    }

}

const productGet = async (req, res) => {

    const { pid } = req.params

    try {

        const product = await Product.findById(pid)

        if(!product) {
            return res.status(400).json({ message: "Product does not exists" })
        }

        return res.status(200).json(product)

    } catch (error) {
        return res.status(500).json(error.message)
    }

}

const productCreate = async (req, res) => {

    const { title, description, code, price, status, stock, category } = req.body

    try {

        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).json({ message: "There are empty fields" })
        }

        let routeImages = []

        console.log(req.files);

        if (req.files) {
            for (let i = 0; i < req.files.length; i++) {
                routeImages.push(req.files[i].path)
            }
        }

        const newProduct = new Product({
            title,
            description,
            code,
            price,
            status: status === undefined ? true : status,
            stock,
            category,
            thumbnails: req.files ? routeImages : []
        })

        const product = await newProduct.save()

        return res.status(200).json({
            message: "Product added successfully",
            products: product
        })

    } catch (error) {
        return res.status(500).json(error.message)
    }

}

const productUpdate = async (req, res) => {

    const { pid } = req.params

    try {

        const product = await Product.findById(pid)

        if(!product) {
            return res.status(400).json({ message: "Product does not exists" })
        }

        const productUdpated = await Product.findByIdAndUpdate(id, req.body, {
            new: true
        })

        return res.status(200).json({
            message: "Product updated succesfully",
            product: productUdpated
        })

    } catch (error) {
        return res.status(500).json(error.message)
    }

}

const productDelete = async (req, res) => {

    const { pid } = req.params

    try {

        const product = await Product.findById(pid)

        if(!product) {
            return res.status(400).json({ message: "Product does not exists" })
        }

        await Product.findByIdAndDelete(pid)

        return res.status(200).json({ message: "Product removed sucessfully" })

    } catch (error) {
        return res.status(500).json(error.message)
    }

}

module.exports = {
    products,
    productGet,
    productCreate,
    productUpdate,
    productDelete
}
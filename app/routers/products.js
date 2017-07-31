// /app/routers/products.js

const express = require('express')
const router = express.Router()

const productsService = require ('./../services/products')

/* router.get('/', (req, res) => {
    productsService.getAllProducts()
        .then(function (data) {
            res.render('products/index', {
                products: data
            })
        })
}) */

router.get('/', (req, res) => {
    return res.render('products/index')
}) 

router.get('/designer/:id', (req, res) => {
    const designerName = req.params.id;
    productsService.getAllDesigners()
        .then(function(designerData) {
            const designerInfo = designerData.filter((designer) => {
                return designer.name === designerName;
            })
            productsService.getAllProducts()
                .then(function(data) {
                    data = data.filter((product) => {
                        return product.designerName === designerName;
                    });
                    //console.log('designer info', designerInfo);
                    //console.log('product data', data);
                    return res.render('products/shop', {
                        products: data,
                        info: designerInfo
                    })
                })
        })
    
})


router.get('/products/:id/json', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    productsService.getProductById(req.params.id)
        .then((product) => {
            if (!product) {
                next()
            }
            
            return res.send({
                id: product.sku,
                price: product.price
            })
        })
})

router.get('/products/:designer/:id', (req, res) => {
    const designerName = req.params.designer;
    productsService.getAllDesigners()
        .then(function(designerData) {
            const designerInfo = designerData.filter((designer) => {
                return designer.name === designerName;
            })
            console.log('designer info 1', designerInfo);
            productsService.getProductById(req.params.id)
                .then((product) => {
                    console.log('designer info 2', designerInfo);
                    console.log('product data', product);
                    return res.render('products/details', {
                        product: product,
                        info: designerInfo
                    })
                })
        })
})



module.exports = router
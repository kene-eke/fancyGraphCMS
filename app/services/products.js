// /app/services/products.js

fetch = require('node-fetch')
const config = require('./../../config.json')
const Apollo = require('apollo-client')
const gql = require('graphql-tag')
const ApolloClient = Apollo.ApolloClient
const createNetworkInterface = Apollo.createNetworkInterface


const client = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: config.apiEndpoint
    })
})

module.exports = {
    getAllProducts: () => {
        return new Promise((resolve, reject) => {
            client.query({
                query: gql`
                   query {
                        allProducts {
                            name,
                            id,
                            sku,
                            price,
                            description,
                            image {
                                url
                            },
                            designerName
                        }
                    }
                `
            })
            .then((response) => {
                resolve(response.data.allProducts)
            })
        })
    },
    getAllDesigners: () => {
        return new Promise((resolve, reject) => {
            client.query({
                query: gql`
                   query {
                        allDesigners {
                            name,
                            title,
                            description
                        }
                    }
                `
            })
            .then((response) => {
                resolve(response.data.allDesigners)
            })
        })
    },
    getProductById: (id) => {
        return new Promise((resolve, reject) => {
            client.query({
                query: gql`
                    query {
                        Product(id: "${id}") {
                            name,
                            id,
                            image {
                                url
                            },
                            description,
                            price,
                            sku,
                            designerName
                        }
                    }
                `
            })
            .then((response) => {
                resolve(response.data.Product)
            })
        })
    }
}
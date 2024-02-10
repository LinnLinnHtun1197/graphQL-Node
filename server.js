const express = require('express');
const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');

const schema = buildSchema(`
    type Query {
        products: [Product]
        orders: [Order]
    }
    type Product {
        id: ID!
        description: String!
        reviews: [Review]
        price: Float!
    }
    type Review {
        rating: Int!
        comment: String
    }
    type Order {
        date: String!
        subtotal: Float!
        items: [OrderItem]
    }
    type OrderItem {
        product: Product!
        quantity: Int!
    }
`);

const root = {
    products: [
        {
            id: 'redshoe',
            description: 'Red shoe',
            price: 42.12,
        }
    ]
}

const app = express();

app.use('/graphql',graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(3000, () => {
    console.log('running graphQL server....')
});
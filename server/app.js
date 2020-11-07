const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const {MONGODB} = require('./config');
const cors = require('cors');

const app = express();

// allow cors
app.use(cors());

mongoose.connect(MONGODB);
mongoose.connection.once('open', () => {
    console.log('connected to database');
})

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});

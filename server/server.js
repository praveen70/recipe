const express = require('express');

const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');
require('dotenv').config({path: 'variables.env'});
const Recipe = require('./models/Recipe');
const User = require('./models/User');
const {typeDefs} = require('./schema');
const {resolvers} = require('./resolver');
const { graphiqlExpress, graphqlExpress} = require('apollo-server-express');
const { makeExecutableSchema} = require('graphql-tools');
var cors = require('cors')
const jwt = require('jsonwebtoken');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})


// const corsOptions = {
//     origin : 'http://localhost:3000/',
//     credentials: true,
// };
const app = express();
app.use(cors('*'));

app.use(async (req, res, next) =>{
    const token = req.headers['authorization'];
   if(token !== 'null'){
       try{
        const currentUser = await jwt.verify(token,  process.env.SECRET);
        req.currentUser= currentUser;
       }catch(error){
           console.log(error)
       }
   }
    next();
});
app.use('/graphiql', graphiqlExpress({ endpointURL:'/graphql'}))
 
//connext schema to graphql
app.use('/graphql', bodyParser(),
    graphqlExpress(({ currentUser }) => ({
    schema,
    context:{
        Recipe,
        User,
        currentUser
    }  
}))
);
//connects to database
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("DB connected"))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 4444;


app.listen(PORT, () =>{
    console.log(`Server listening on port ${PORT}`)
});
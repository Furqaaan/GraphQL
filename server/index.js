const express = require("express");
const app = express();
const cors = require("cors");

const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");

app.use(cors({
    origin: '*'
}));

app.listen(3000, () => {
    console.log("Server listening on 3000");
});

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

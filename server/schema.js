const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
} = require("graphql");
const { user } = require("./data");

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        phone: { type: GraphQLString },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: () => ({
        users: {
            type: new GraphQLList(UserType),
            resolve: (parent, args) => {
                return user;
            },
        },
        user: {
            type: UserType,
            args: {
                id: { type: GraphQLID },
            },
            resolve: (parent, args) => {
                return user.find((item) => item.id == args.id);
            },
        },
    }),
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});

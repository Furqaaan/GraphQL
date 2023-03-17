const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
} = require("graphql");

const { user } = require("./data");

// Queries

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

// Mutations

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: {
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve: (parent, { name }) => {
                user.push({ id: user.length, name });

                return { id: user.length, name };
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
});

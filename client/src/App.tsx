import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import User from "./components/User";

const client = new ApolloClient({
    uri: "http://localhost:3000/graphql",
    cache: new InMemoryCache(),
});

const App = () => {
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <User />
            </div>
        </ApolloProvider>
    );
};

export default App;

import { gql, useMutation, useQuery } from "@apollo/client";

const GET_ALL_USERS = gql`
    query getUsers {
        users {
            name
        }
    }
`;

const ADD_USER = gql`
    mutation addUser($name: String!) {
        addUser(name: $name) {
            name
        }
    }
`;

const User = () => {
    const { data } = useQuery(GET_ALL_USERS);

    const [add_client] = useMutation(ADD_USER, {
        variables: { name: "Furqan" },
        refetchQueries: [{ query: GET_ALL_USERS }],
    });

    return (
        <div>
            <button onClick={add_client}>ADD</button>
            {data?.users && data?.users.map((item) => item.name + " ")}
        </div>
    );
};

export default User;

// Container component
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  TypePolicies,
} from "@apollo/client";

const typePolicies: TypePolicies = {
  Query: {
    fields: {
      postPaginatedList: {
        keyArgs: false,
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
    },
  },
};

const client = new ApolloClient({
  uri: "https://pindai.stepzen.net/api/quiet-clam/__graphql",
  headers: {
    Authorization:
      "apikey pindai::stepzen.io+1000::34a1b3c1e71bb182dd052bb1aa403be66d745e4eb30d237e03174c43ed184556",
  },
  cache: new InMemoryCache({ typePolicies }),
});

export default client;

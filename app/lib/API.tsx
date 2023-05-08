import { GraphQLClient } from "graphql-request";

export function GraphQLClientConnector() {
    const endpoint = 'http://0.tcp.ap.ngrok.io:18905/graphql';
    const graphQLClient = new GraphQLClient(endpoint);

    return graphQLClient;
}
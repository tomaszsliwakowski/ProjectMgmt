import { projects, clients } from "../sampleData";
import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";

const schema: any = {};
export default schema;

const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    phone: {
      type: GraphQLString,
    },
  }),
});

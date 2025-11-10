import express from "express";
import { ApolloServer } from "apollo-server-express";
import connectDB from "./config/db.js";
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

connectDB();

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.split(" ")[1];
    let user = null;

    if (token) {
      try {
        user = jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        console.warn("Invalid token:", err.message);
      }
    }

    return { user };
  },
});

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  const PORT = 4000;
  app.listen(PORT, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
};

export default startServer;

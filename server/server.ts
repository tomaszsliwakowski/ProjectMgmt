import express from "express";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema/schema";
import { connectDB } from "./config/db";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());

//connect to DB
connectDB();

app.get("/", (req, res) => {
  res.send("Server on");
});
app.use(
  "/graphql",
  graphqlHTTP({ schema, graphiql: process.env.NODE_ENV === "development" })
);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});

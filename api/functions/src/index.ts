import * as functions from "firebase-functions";
import { gqlServer } from "./graphql";

const server = gqlServer();
export const app = functions.https.onRequest(server);

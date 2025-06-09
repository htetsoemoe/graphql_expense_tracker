import express from  'express'
import http from 'http'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './db/connectDB.js'

import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'

// mergedResolvers and mergedTypeDefs
import mergedResolvers from "./resolvers/index.js"
import mergedTypeDefs from "./typeDefs/index.js"

dotenv.config()
const app = express()
const httpServer = http.createServer(app)

const server = new ApolloServer({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolvers,
    // plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

// Ensure we wait for our server to start
// await server.start()

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
// app.use(
//     cors(
//         "/graphql",
//         cors({
//             origin: "*",
//             credentials: true,
//         })
//     ),
//     express.json(),
//     expressMiddleware(server, {
//         context: async ({ req }) => ({ token: req.headers.token }),
//     })
// )

const { url } = await startStandaloneServer(server)
console.log(`🚀 Server ready at ${url}`)

// Modified server startup
// await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve))
// await connectDB()
// console.log(`🚀 Server ready at http://localhost:4000/graphql`);
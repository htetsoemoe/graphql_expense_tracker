import express from 'express'
import http from 'http'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './db/connectDB.js'

import passport from 'passport'
import session from 'express-session'
import ConnectMongoDBSession from 'connect-mongodb-session'

import { buildContext } from 'graphql-passport'
import { configurePassword } from './password/password.config.js'

import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'

// mergedResolvers and mergedTypeDefs
import mergedResolvers from "./resolvers/index.js"
import mergedTypeDefs from "./typeDefs/index.js"

dotenv.config()
configurePassword()

const app = express()
const httpServer = http.createServer(app)

const MongoDBStore = ConnectMongoDBSession(session)
const store = new MongoDBStore({
    uri: process.env.MONGO_URL,
    collection: 'sessions',
})
store.on('error', err => console.log(err))

// session middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,// this option specifies whether to save the session to the store on every request
        saveUninitialized: false, // option specifies whether to save uninitialized sessions
        store: store,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
            httpOnly: true, // this option specifies whether the cookie should be accessible only through the HTTP protocol
        }
    })
)
app.use(passport.initialize())
app.use(passport.session())

const server = new ApolloServer({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

// Ensure we wait for our server to start
await server.start()

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
    "/graphql",
    cors(),
    express.json(),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
        context: async ({ req, res }) => buildContext({ req, res }),
    })
)

// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve))
await connectDB()
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
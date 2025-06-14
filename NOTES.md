# graphql package =>

-   It is the core GraphQL implementation in **JavaScript**.
-   It provides the functionality to define GraphQL schemas, parse and validate GraphQL queries, execute queries against a schema, and format responses.
-   graphql is not tied to any specific server or client framework; it's a standalone library that can be used in various JavaScript environments.

# @apollo/server =>

-   This package is part of the Apollo ecosystem and is used for building GraphQL servers in Node.js.
-   It provides tools and utilities to create and manage GraphQL schemas, handle incoming GraphQL requests, execute queries, and send responses.
-   @apollo/server is built on top of the popular express framework, making it easy to integrate GraphQL into existing Node.js web applications.
-   Overall, @apollo/server simplifies the process of creating and maintaining GraphQL servers in Node.js environments.

# What is GraphQL Schema?

-   A GraphQL schema is a fundamental concept in GraphQL.
-   It defines the structure of the data that clients can query and the operations they can perform. A schema in GraphQL typically consists of two main parts: typeDefs and resolvers.

# What are TypeDefs? (or Type Definitions)

-   Type definitions define the shape of the data available in the GraphQL API. They specify the types of objects that can be queried and the relationships between them.

# What are Resolvers?

-   Resolvers are functions that determine how to fetch the data associated with each field in the schema.

## Apollo Client

-   Apollo Client is a comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL. Use it to fetch, cache, and modify application data, all while automatically updating your UI.

# Features

-   Declarative data fetching: Write a query and receive data without manually tracking loading states.
-   Excellent developer experience: Enjoy helpful tooling for TypeScript, Chrome / Firefox devtools, and VS Code.
-   Designed for modern React: Take advantage of the latest React features, such as hooks.
-   Incrementally adoptable: Drop Apollo into any JavaScript app and incorporate it feature by feature.
-   Universally compatible: Use any build setup and any GraphQL API.
-   Community driven: Share knowledge with thousands of developers in the GraphQL community.

### Declarative Data Fetching

-   Apollo Client handles the request cycle from start to finish, including tracking loading and error states. There's no middleware or boilerplate code to set up before making your first request, and you don't need to worry about transforming or caching responses. All you have to do is describe the data your component needs and let Apollo Client do the heavy lifting.

```jsx
function ShowDogs() {
	//  The useQuery hook supports advanced features like an optimistic UI, refetching, and pagination.
	const { loading, error, data } = useQuery(GET_DOGS);
	if (error) return <Error />;
	if (loading) return <Fetching />;

	return <DogList dogs={data.dogs} />;
}
```

### Caching a graph is not an easy task, but they have spent years solving this problem.

```jsx
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
	cache: new InMemoryCache(),
});
```

# Installation

```bash
npm install @apollo/client graphql
```

-   **@apollo/client:** This single package contains virtually everything you need to set up Apollo Client. It includes the in-memory cache, local state management, error handling, and a React-based view layer.

-   **graphql:** This package provides logic for parsing GraphQL queries.


# Types in GraphQL

-   In GraphQL, types are used to define the structure of data that can be queried and manipulated. Types are defined using the type keyword followed by the name of the type and a set of fields.

-   Everything in GraphQL is strongly typed and based on types. Some common types:

	| Type | Description |
	|----------|----------|
	| Int   | Represents a signed 32‐bit integer.   |
	| Float   | Represents a signed double-precision floating-point value.   |
	| String   | Represents a UTF‐8 character sequence.   |
	| Boolean   | Represents true or false.   |
	| ID   | Represents a unique identifier, often used to refetch an object or as the key for a cache. IDs are serialized as strings to prevent clients from accidentally sending invalid IDs to the server.   |
	| []   | Array of types (e.g, [User])   |
	| {}   | Object of fields (e.g, { name: String })   |

   You can define custom types, like User, Post, etc.

   # Operation Types
   | Operation | Purpose |
   |----------|----------|
   | Query   | Used to fetch data from the server.   |
   | Mutation   | Used to modify data on the server.   |
   | Subscription   | Used to establish a long-lived connection to the server and receive real-time updates.   |

	   -   Scalar Types: These are the basic building blocks of GraphQL types. They represent the simplest units of data and include types like Int, Float, String, Boolean, and ID.

	   -   Object Types: These are more complex types that can contain other fields. They are used to define the structure of objects that can be queried.

	   -   Input Types: These are similar to object types but are used for input arguments in mutations.

	   -   Enum Types: These are special types that represent a set of predefined values. They are used to restrict the values that a field can take.

	   -   Union Types: These are used to represent a set of possible types. They are used to express that a field can have one of several types.

	   -   Interface Types: These are used to define a common set of fields that can be implemented by different types.

	   -   List Types: These are used to represent a list of values. They are used to express that a field can have multiple values of the same type.

	   -   Non-Null Types: These are used to indicate that a field cannot be null. They are used to express that a field must have a value.

	   -   Custom Types: These are user-defined types that can be used to represent complex data structures.

	   -   Query Types: These are used to define the root query type in a GraphQL schema. They are used to define the fields that can be queried.

	   -   Mutation Types: These are used to define the root mutation type in a GraphQL schema. They are used to define the fields that can be mutated.

	   -   Subscription Types: These are used to define the root subscription type in a GraphQL schema. They are used to define the fields that can be subscribed to.

	   -   Directive Types: These are used to define directives that can be applied to fields, types, or arguments.

	   -   Schema Types: These are used to define the schema type in a GraphQL schema. They are used to define the types that can be queried or mutated.

	   -   Schema Definition Language (SDL): This is a language used to define the schema of a GraphQL API. It is used to define the types, fields, and relationships between types.

	   -   GraphQL Query Language (GQL): This is a language used to query and manipulate data in a GraphQL API. It is used to define the structure of queries and mutations.

	   -   GraphQL Schema Definition Language (SDL): This is a language used to define the schema of a GraphQL API. It is used to define the types, fields, and relationships between types.

# Benefits of GraphQL
	- Precise data fetching: GraphQL allows you to specify exactly what data you need, reducing the amount of data transferred over the network.

	- Fewer network requests: GraphQL allows you to fetch multiple resources in a single request, reducing the number of network requests.

	- Strongly typing and validation: GraphQL uses a strongly typed schema, which helps catch errors early and provides a clear contract between the client and the server.

	- Easier evolution of APIs: GraphQL allows for easy evolution of APIs, as new fields can be added to existing types without breaking existing clients.

	- Built-in documentation from schema: GraphQL provides built-in documentation from the schema, making it easier to understand the API.

# Potential Drawbacks of GraphQL
	- Increased complexity: GraphQL can be more complex than traditional REST APIs, especially for smaller projects.

	- Cache invalidation: GraphQL does not have built-in cache invalidation, which can lead to stale data.

	- Performance: GraphQL can be slower than REST APIs due to the need to fetch multiple resources in a single request. Performance issues with deeply nested queries if not optimized.

	- Learning curve: GraphQL has a steeper learning curve than REST APIs, especially for developers who are not familiar with the concept of a strongly typed schema.

# What is context in GraphQL?
	The context is an object that is shared across all resolvers during a single GraphQL request. It’s often used to:
		Share common data like the authenticated user
		Access services like databases or REST APIs
		Pass custom headers or tokens
		Log requests or manage request-scoped data

# Example in Apollo Server
	const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => {
		// Extract the token from headers
		const token = req.headers.authorization || '';

		// Verify token and get user
		const user = getUserFromToken(token);

		return { user, db };
	}
	});

Then in a resolver:

	const resolvers = {
		Query: {
			me: (parent, args, context) => {
			// Access context.user and context.db
			return context.user;
			}
		}
	};


# Parameters of resolvers in GraphQL
	- parent: Refers to the return value of the previous resolver in the resolver chain (mainly used in nested resolvers).
			  For top-level resolvers (like Query or Mutation), it's usually undefined or {}.

	- args: An object that contains the arguments passed by the client in the query or mutation.

	- context: A custom object that's shared across all resolvers during a single request.
			   You can put in things like:
					Authenticated user info
					Database connection
					Global services/utilities

	- info: Contains information about the execution of the operation:
					Field name
					Return type
					Path
					AST (Abstract Syntax Tree)

			It's rarely needed unless you're doing advanced tasks like:
					Logging requested fields
					Building custom directives
					Query optimization (e.g., selecting only requested fields)


	# Summary of GraphQL Resolver Parameters:

	| Parameter | Description                   | Common Use                             |
	| --------- | ----------------------------- | -------------------------------------- |
	| `parent`  | Result from previous resolver | Nested field resolvers                 |
	| `args`    | Arguments passed to the field | Access query/mutation inputs           |
	| `context` | Shared data per request       | Auth, DB access, services              |
	| `info`    | Query execution details       | Advanced logic, logging, introspection |

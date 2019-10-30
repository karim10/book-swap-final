const { buildSchema } = require('graphql');

module.exports = buildSchema(`
        type Book {
            _id: ID!
            googleApiId: String!
        }

        type User {
          _id: ID!
          email: String!
          password: String!
          ownedBooks: [Book!]!
        }

        type AuthData {
            userId: ID!
            token: String!
            tokenExpiration: Int!
            ownedBooks: [Book!]!
        }

        input UserInput {
          email: String!
          password: String!
        }

        input BookInput {
            googleApiId: String!
        }

        type RootQuery {
            books: [Book!]!
            users: [User!]
            login(email: String!, password: String!): AuthData!
            getBooksCurrentUser: [Book!]!
        }
 
        type RootMutation {
            addBookToCurrentUser(bookId: ID!): User
            createUser(userInput: UserInput!): AuthData!
            addBook(bookInput: BookInput!): Book
        }

        schema {
            query: RootQuery,
            mutation: RootMutation
        }
    `);

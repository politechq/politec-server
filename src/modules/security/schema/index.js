import { gql } from 'apollo-server-express'

const schema = gql`
  extend type Query {
    currentUser: User
    role(id: Int!): Role
    roles(offset: Int, limit: Int): [Role!]
    totalRoles: Total!
    totalUsers: Total!
    user(id: Int!): User
    users(offset: Int, limit: Int): [User!]
    usersByName(search: String!, limit: Int): [User!]
  }

  extend type Mutation {
    addRefreshToken(
      userId: String!
      refreshToken: String!
      fingerprint: String!
    ): Void!
    addRole(name: String!, code: String!): Role!
    addUser(email: String!, firstName: String!, lastName: String!): User!
    deleteUser(id: Int!): User!
    signIn(email: String!, password: String!, fingerprint: String!): Token!
    signUp(
      email: String!
      password: String!
      firstName: String!
      lastName: String!
      fingerprint: String!
    ): Token!
    updateToken(fingerprint: String!): Token!
  }

  extend type Subscription {
    userAdded: UserAdded!
    userDeleted: UserDeleted!
  }

  type User {
    id: Int!
    email: EmailAddress!
    password: String!
    firstName: String!
    lastName: String!
    createdAt: Timestamp!
    avatar: String!
    roles: [Role!]
    chats: [Chat!]
  }

  type Role {
    id: Int!
    name: String!
    code: String!
    createdAt: Timestamp!
    createdBy: Int
    users: [User!]
  }

  type RefreshToken {
    userId: Int!
    refreshToken: String!
    fingerprint: String!
    expiresIn: Timestamp!
  }

  type Token {
    token: String!
    refreshToken: String!
  }

  type UserAdded {
    user: User!
  }

  type UserDeleted {
    user: User!
  }
`

export default schema

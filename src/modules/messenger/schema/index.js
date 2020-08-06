import { gql } from 'apollo-server-express'

const schema = gql`
  extend type Query {
    chats(offset: Int, limit: Int): [Chat!]!
    currentUserChats(offset: Int, limit: Int): [Chat!]!
    messages(chatId: Int!, offset: Int, limit: Int): [Message!]!
  }

  extend type Mutation {
    addMessage(to: Int!, text: String!): Message!
  }

  type Chat {
    id: Int!
    createdAt: Timestamp!
    messages: [Message!]
    users: [User!]
  }

  type Message {
    id: Int!
    user: User!
    chat: Chat!
    text: String!
    createdAt: Timestamp!
  }
`

export default schema

import { gql } from 'apollo-server-express'

const schema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }

  scalar EmailAddress

  scalar Timestamp

  scalar Void

  type Total {
    count: Int!
  }
`

export default schema

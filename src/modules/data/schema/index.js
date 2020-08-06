import { gql } from 'apollo-server-express'

const schema = gql`
  extend type Query {
    dataTables(offset: Int, limit: Int): [DataTable!]
    dataTable(code: String!): DataTable!
    totalDataTables: Total!
  }

  extend type Mutation {
    addDataTable(
      name: String!
      code: String!
      attributes: [AttributeInput]!
    ): DataTable!
  }

  type DataTable {
    name: String!
    code: String!
    createdAt: Timestamp!
    createdBy: Int!
    editedAt: Timestamp!
    editedBy: Int!
    attributes: [Attribute!]!
  }

  type Attribute {
    id: String!
    title: String!
    type: String!
    required: Boolean!
    defaultValue: String
    options: AttributeOptions
  }

  input AttributeInput {
    id: String!
    title: String!
    type: String!
    required: Boolean!
    defaultValue: String
    options: AttributeOptionsInput
  }

  enum Currency {
    usd
    eur
    rub
  }

  type AttributeOptions {
    multiline: Boolean
    currency: Currency
  }

  input AttributeOptionsInput {
    multiline: Boolean
    currency: Currency
  }
`

export default schema

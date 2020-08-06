import { combineResolvers } from 'graphql-resolvers'
import isAuthenticated from 'resolvers/is-authenticated'

const addDataTable = combineResolvers(
  isAuthenticated,
  async (
    parent,
    { name, code, attributes },
    { currentUser, models: { DataTable } },
  ) => {
    const userId = currentUser.id
    console.log('userId', userId)
    console.log('attributes', attributes)
    const dataTable = await DataTable.create({
      name,
      code,
      createdBy: userId,
      editedBy: userId,
      attributes,
    })

    return dataTable
  },
)

export default addDataTable

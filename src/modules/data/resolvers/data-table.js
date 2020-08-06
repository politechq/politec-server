import { combineResolvers } from 'graphql-resolvers'
import isAuthenticated from 'resolvers/is-authenticated'

const dataTable = combineResolvers(
  isAuthenticated,
  async (parent, { code }, { models: { DataTable } }) => {
    const selectedDataTable = await DataTable.findOne({
      where: {
        code,
      },
    })
    return selectedDataTable
  },
)

export default dataTable

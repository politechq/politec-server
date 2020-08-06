import resolvers from './resolvers'
import schema from './schema'

import DataTable from './models/data-table'

const security = {
  name: 'data',
  models: {
    DataTable,
  },
  resolvers,
  schema,
}

export default security

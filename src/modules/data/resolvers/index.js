import addDataTable from './add-data-table'
import dataTables from './data-tables'
import dataTable from './data-table'
import totalDataTables from './total-data-tables'

export default {
  Query: {
    dataTable,
    dataTables,
    totalDataTables,
  },
  Mutation: {
    addDataTable,
  },
}

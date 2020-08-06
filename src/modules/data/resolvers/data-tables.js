import { combineResolvers } from 'graphql-resolvers'
import isAuthenticated from 'resolvers/is-authenticated'

import {
  andThen,
  applySpec,
  applyTo,
  call,
  converge,
  identity,
  nthArg,
  pick,
  pipe,
  prop,
} from 'ramda'
import { dotPath } from 'ramda-extension'
import { context } from 'helpers'

const dataTables = combineResolvers(
  isAuthenticated,
  /*
   * pipe(
   *   converge(applyTo, [
   *     pipe(
   *       nthArg(1),
   *       pick(['limit', 'offset']),
   *     ),
   *     pipe(
   *       context,
   *       dotPath('models.DataTable.findAll'),
   *     ),
   *   ]),
   *   andThen(identity),
   * ),
   */
  async (parent, { offset, limit }, { models: { DataTable } }) => {
    const dataTable = await DataTable.findAll({
      offset,
      limit,
    })
    return dataTable
  },
)

export default dataTables

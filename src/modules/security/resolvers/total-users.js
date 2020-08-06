import { combineResolvers } from 'graphql-resolvers'
import isAuthenticated from 'resolvers/is-authenticated'

import { andThen, identity, invoker, pipe } from 'ramda'
import { dotPath } from 'ramda-extension'
import { context } from 'helpers'

const totalUsers = combineResolvers(
  isAuthenticated,
  pipe(
    context,
    dotPath('models.User'),
    invoker(0, 'findAndCountAll'),
    andThen(identity),
  ),
)

export default totalUsers

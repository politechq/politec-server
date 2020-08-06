import { AuthenticationError } from 'apollo-server'
import { skip } from 'graphql-resolvers'

import { always, ifElse, isNil, nthArg, pipe, prop } from 'ramda'

const isAuthenticated = pipe(
  nthArg(2),
  prop('currentUser'),
  ifElse(
    isNil,
    () => new AuthenticationError('Not authenticated as user'),
    always(skip),
  ),
)

export default isAuthenticated

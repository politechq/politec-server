import { Op } from 'sequelize'

import {
  always,
  andThen,
  curry,
  identity,
  ifElse,
  isEmpty,
  pipe,
  reduce,
} from 'ramda'

import { combineResolvers } from 'graphql-resolvers'
import isAuthenticated from 'resolvers/is-authenticated'

const usersByName = combineResolvers(
  isAuthenticated,
  async (parent, { search, limit }, { models: { User } }) => {
    const getUsers = curry(substring =>
      User.findAll({
        where: {
          [Op.or]: reduce(
            (result, field) => ({
              ...result,
              [field]: { [Op.iLike]: `%${substring}%` },
            }),
            {},
            ['firstName', 'lastName'],
          ),
        },
        limit,
      }),
    )
    return pipe(
      ifElse(
        isEmpty,
        always([]),
        pipe(
          getUsers,
          andThen(identity),
        ),
      ),
    )(search)
  },
)

export default usersByName

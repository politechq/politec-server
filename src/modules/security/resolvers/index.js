import addRole from './add-role'
import addUser from './add-user'
import currentUser from './current-user'
import deleteUser from './delete-user'
import role from './role'
import roles from './roles'
import signIn from './sign-in'
import signUp from './sign-up'
import totalRoles from './total-roles'
import totalUsers from './total-users'
import updateToken from './update-token'
import user from './user'
import users from './users'
import usersByName from './users-by-name'

import pubsub, { EVENTS } from '../subscription'

export default {
  Query: {
    currentUser,
    totalRoles,
    totalUsers,
    role,
    roles,
    user,
    users,
    usersByName,
  },
  Mutation: {
    addRole,
    addUser,
    deleteUser,
    signIn,
    signUp,
    updateToken,
  },
  Subscription: {
    userAdded: {
      subscribe: () => pubsub.asyncIterator(EVENTS.USER_ADDED),
    },
    userDeleted: {
      subscribe: () => pubsub.asyncIterator(EVENTS.USER_DELETED),
    },
  },
}
